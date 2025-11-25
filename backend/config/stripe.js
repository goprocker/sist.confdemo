// backend/config/stripe.js
require('dotenv').config();

const stripeConfig = {
    secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_dummy',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',

    // Payment intent default configuration
    paymentDefaults: {
        currency: 'usd',
        captureMethod: 'automatic',
        confirmationMethod: 'automatic',
    },

    // Payment methods to enable
    paymentMethods: ['card'],

    // 3D Secure settings
    requiresAuthentication: process.env.NODE_ENV === 'production',
};

module.exports = stripeConfig;




