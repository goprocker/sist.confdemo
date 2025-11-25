// backend/routes/payments.js
const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret'
});

// Mock payments storage (replace with DB in production)
const payments = [];

// Create Razorpay Order
router.post('/create-order', async (req, res) => {
    try {
        const { amount, currency = 'INR', registrationId } = req.body;

        const options = {
            amount: amount * 100, // Amount in paise
            currency,
            receipt: `receipt_${registrationId}_${Date.now()}`,
            notes: {
                registrationId: registrationId.toString()
            }
        };

        const order = await razorpay.orders.create(options);

        // Store initial payment record
        const payment = {
            id: payments.length + 1,
            registrationId,
            razorpayOrderId: order.id,
            amount,
            currency,
            status: 'created',
            createdAt: new Date(),
        };
        payments.push(payment);

        res.json({
            orderId: order.id,
            currency: order.currency,
            amount: order.amount,
            keyId: process.env.RAZORPAY_KEY_ID
        });
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ error: err.message });
    }
});

// Verify Payment Signature
router.post('/verify', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'dummy_secret')
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            // Update payment status to paid
            const payment = payments.find(p => p.razorpayOrderId === razorpay_order_id);
            if (payment) {
                payment.status = 'paid';
                payment.razorpayPaymentId = razorpay_payment_id;
                payment.razorpaySignature = razorpay_signature;
                payment.paidAt = new Date();
            }

            res.json({ status: 'success', message: 'Payment verified successfully' });
        } else {
            res.status(400).json({ status: 'failure', message: 'Invalid signature' });
        }
    } catch (err) {
        console.error('Error verifying payment:', err);
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

module.exports = router;


