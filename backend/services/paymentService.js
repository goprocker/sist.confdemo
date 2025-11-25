// backend/services/paymentService.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');
const { v4: uuidv4 } = require('uuid');
const { Payment, Registration } = require('../models');
const { AppError } = require('../middleware/errorHandler');

class PaymentService {
    /**
     * Create a payment intent with idempotency
     */
    static async createPaymentIntent(registrationId, amount, currency = 'usd') {
        // Validate registration exists
        const registration = await Registration.findByPk(registrationId, {
            include: ['conference', 'user'],
        });

        if (!registration) {
            throw new AppError('Registration not found', 404);
        }

        // Validate amount matches registration
        if (parseFloat(amount) !== parseFloat(registration.amount)) {
            throw new AppError('Payment amount does not match registration fee', 400);
        }

        // Check if payment already exists for this registration
        const existingPayment = await Payment.findOne({
            where: {
                registrationId,
                status: ['succeeded', 'processing'],
            },
        });

        if (existingPayment) {
            throw new AppError('Payment already exists for this registration', 409);
        }

        // Generate idempotency key
        const idempotencyKey = uuidv4();

        try {
            // Create Stripe payment intent
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(amount * 100), // Convert to cents
                currency: currency.toLowerCase(),
                metadata: {
                    registrationId: registrationId.toString(),
                    conferenceId: registration.conferenceId.toString(),
                    userId: registration.userId.toString(),
                },
                // Enable 3D Secure when required
                automatic_payment_methods: {
                    enabled: true,
                },
            }, {
                idempotencyKey,
            });

            // Create payment record
            const payment = await Payment.create({
                registrationId,
                stripePaymentIntentId: paymentIntent.id,
                amount,
                currency: currency.toLowerCase(),
                status: 'pending',
                idempotencyKey,
                metadata: {
                    conferenceTitle: registration.conference.title,
                    userName: registration.user.name,
                },
            });

            return {
                payment,
                clientSecret: paymentIntent.client_secret,
            };
        } catch (error) {
            if (error.type === 'StripeCardError') {
                throw new AppError(error.message, 400);
            }
            throw error;
        }
    }

    /**
     * Handle Stripe webhook events
     */
    static async handleWebhookEvent(event) {
        const paymentIntent = event.data.object;

        // Find payment by Stripe payment intent ID
        const payment = await Payment.findOne({
            where: { stripePaymentIntentId: paymentIntent.id },
            include: ['registration'],
        });

        if (!payment) {
            console.error(`Payment not found for intent: ${paymentIntent.id}`);
            return;
        }

        switch (event.type) {
            case 'payment_intent.succeeded':
                await this.handlePaymentSuccess(payment, paymentIntent);
                break;

            case 'payment_intent.payment_failed':
                await this.handlePaymentFailure(payment, paymentIntent);
                break;

            case 'payment_intent.processing':
                await payment.update({ status: 'processing' });
                break;

            case 'payment_intent.requires_action':
                await payment.update({ status: 'requires_action' });
                break;

            case 'payment_intent.canceled':
                await payment.update({ status: 'cancelled' });
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
    }

    /**
     * Handle successful payment
     */
    static async handlePaymentSuccess(payment, paymentIntent) {
        const paymentMethod = paymentIntent.charges?.data[0]?.payment_method_details;

        await payment.update({
            status: 'succeeded',
            paidAt: new Date(),
            paymentMethod: paymentMethod?.type || null,
            last4: paymentMethod?.card?.last4 || null,
            brand: paymentMethod?.card?.brand || null,
        });

        // Update registration status
        await payment.registration.update({
            status: 'confirmed',
            paymentStatus: 'paid',
            confirmationCode: payment.registration.generateConfirmationCode(),
        });

        // TODO: Send confirmation email
        console.log(`Payment succeeded for registration ${payment.registrationId}`);
    }

    /**
     * Handle failed payment
     */
    static async handlePaymentFailure(payment, paymentIntent) {
        const errorMessage = paymentIntent.last_payment_error?.message || 'Payment failed';

        await payment.update({
            status: 'failed',
            errorMessage,
        });

        await payment.registration.update({
            paymentStatus: 'failed',
        });

        // TODO: Send failure notification email
        console.log(`Payment failed for registration ${payment.registrationId}: ${errorMessage}`);
    }

    /**
     * Get payment status
     */
    static async getPaymentStatus(paymentId) {
        const payment = await Payment.findByPk(paymentId, {
            include: ['registration'],
        });

        if (!payment) {
            throw new AppError('Payment not found', 404);
        }

        return payment;
    }

    /**
     * Refund payment
     */
    static async refundPayment(paymentId, amount = null) {
        const payment = await Payment.findByPk(paymentId);

        if (!payment) {
            throw new AppError('Payment not found', 404);
        }

        if (payment.status !== 'succeeded') {
            throw new AppError('Can only refund succeeded payments', 400);
        }

        try {
            const refund = await stripe.refunds.create({
                payment_intent: payment.stripePaymentIntentId,
                amount: amount ? Math.round(amount * 100) : undefined,
            });

            const refundedAmount = amount || payment.amount;

            await payment.update({
                status: refund.amount === payment.amount * 100 ? 'refunded' : 'succeeded',
                refundedAmount: parseFloat(payment.refundedAmount) + parseFloat(refundedAmount),
                refundedAt: new Date(),
            });

            return payment;
        } catch (error) {
            if (error.type === 'StripeInvalidRequestError') {
                throw new AppError(error.message, 400);
            }
            throw error;
        }
    }
}

module.exports = PaymentService;




