'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface PaymentFormProps {
    clientSecret: string;
    amount: number;
    currency: string;
    onSuccess: () => void;
    onError: (error: string) => void;
}

function PaymentForm({ clientSecret, amount, currency, onSuccess, onError }: PaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setErrorMessage('');

        try {
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/payment-success`,
                },
                redirect: 'if_required',
            });

            if (error) {
                setErrorMessage(error.message || 'Payment failed');
                onError(error.message || 'Payment failed');
                setIsProcessing(false);
            } else {
                onSuccess();
            }
        } catch (err) {
            setErrorMessage('An unexpected error occurred');
            onError('An unexpected error occurred');
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Display */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-primary-500/10 to-primary-500/10 rounded-lg p-6 border border-primary-500/20"
            >
                <div className="flex items-center justify-between">
                    <span className="text-primary-400 text-sm">Total Amount</span>
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-400 bg-clip-text text-transparent"
                    >
                        {currency.toUpperCase()} {amount.toFixed(2)}
                    </motion.div>
                </div>
            </motion.div>

            {/* Secure Badge */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 text-sm text-primary-400"
            >
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <svg
                        className="w-5 h-5 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </motion.div>
                <span>Secured by Stripe â€¢ PCI DSS Compliant</span>
            </motion.div>

            {/* Payment Element */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="payment-element-wrapper"
            >
                <PaymentElement
                    options={{
                        layout: 'tabs',
                    }}
                />
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
                {errorMessage && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                            opacity: 1,
                            x: [0, -5, 5, -5, 5, 0],
                        }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ x: { duration: 0.5 } }}
                        className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm"
                    >
                        {errorMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
                type="submit"
                disabled={!stripe || isProcessing}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                    w-full py-4 rounded-lg font-semibold text-primary-50
                    bg-gradient-to-r from-primary-600 to-primary-600
                    hover:from-primary-700 hover:to-primary-700
                    disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed
                    transition-all duration-200 shadow-lg hover:shadow-xl
                    disabled:shadow-none
                `}
            >
                <AnimatePresence mode="wait">
                    {isProcessing ? (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center gap-2"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            <span>Processing...</span>
                        </motion.div>
                    ) : (
                        <motion.span
                            key="pay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            Pay {currency.toUpperCase()} {amount.toFixed(2)}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        </form>
    );
}

interface SecurePaymentFormProps {
    registrationId: number;
    amount: number;
    currency?: string;
    onSuccess: () => void;
    onError: (error: string) => void;
}

export default function SecurePaymentForm({
    registrationId,
    amount,
    currency = 'usd',
    onSuccess,
    onError,
}: SecurePaymentFormProps) {
    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Create payment intent
        const createPaymentIntent = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await fetch('/api/payments/create-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        registrationId,
                        amount,
                        currency,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to create payment intent');
                }

                const data = await response.json();
                setClientSecret(data.clientSecret);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to initialize payment');
                onError(err instanceof Error ? err.message : 'Failed to initialize payment');
            } finally {
                setLoading(false);
            }
        };

        createPaymentIntent();
    }, [registrationId, amount, currency, onError]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"
                />
                <p className="text-primary-400">Initializing secure payment...</p>
            </div>
        );
    }

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-red-400 text-center"
            >
                <svg
                    className="w-12 h-12 mx-auto mb-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                    />
                </svg>
                <p className="font-semibold mb-1">Payment Initialization Failed</p>
                <p className="text-sm">{error}</p>
            </motion.div>
        );
    }

    if (!clientSecret) {
        return null;
    }

    return (
        <Elements
            stripe={stripePromise}
            options={{
                clientSecret,
                appearance: {
                    theme: 'night',
                    variables: {
                        colorPrimary: '#6366f1',
                        colorBackground: '#1f2937',
                        colorText: '#f9fafb',
                        colorDanger: '#ef4444',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        borderRadius: '8px',
                    },
                },
            }}
        >
            <PaymentForm
                clientSecret={clientSecret}
                amount={amount}
                currency={currency}
                onSuccess={onSuccess}
                onError={onError}
            />
        </Elements>
    );
}




