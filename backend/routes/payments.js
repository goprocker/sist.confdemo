// backend/routes/payments.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');

// Mock payments storage
const payments = [];

// Create payment intent
router.post('/create-intent', async (req, res) => {
    try {
        const { amount, currency = 'usd', registrationId } = req.body;

        // Create Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Convert to cents
            currency,
            metadata: { registrationId: registrationId.toString() },
        });

        const payment = {
            id: payments.length + 1,
            registrationId,
            stripePaymentIntentId: paymentIntent.id,
            amount,
            currency,
            status: 'pending',
            createdAt: new Date(),
        };

        payments.push(payment);

        res.json({
            clientSecret: paymentIntent.client_secret,
            paymentId: payment.id,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get payment status
router.get('/:id/status', (req, res) => {
    const payment = payments.find(p => p.id === parseInt(req.params.id));
    if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
    }
    res.json({ payment });
});

// Stripe webhook endpoint
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];

    try {
        // Verify webhook signature (in production)
        // const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

        // Handle payment events
        res.json({ received: true });
    } catch (err) {
        res.status(400).json({ error: 'Webhook error' });
    }
});

module.exports = router;
