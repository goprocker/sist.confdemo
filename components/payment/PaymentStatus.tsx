'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from '@/lib/hooks/useWindowSize';

type PaymentStatus = 'processing' | 'succeeded' | 'failed' | 'requires_action';

interface PaymentStatusProps {
    status: PaymentStatus;
    amount?: number;
    currency?: string;
    last4?: string;
    brand?: string;
    confirmationCode?: string;
    errorMessage?: string;
}

export default function PaymentStatus({
    status,
    amount,
    currency = 'USD',
    last4,
    brand,
    confirmationCode,
    errorMessage,
}: PaymentStatusProps) {
    const { width, height } = useWindowSize();

    const statusConfig = {
        processing: {
            color: 'blue',
            icon: (
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full"
                />
            ),
            title: 'Processing Payment',
            description: 'Please wait while we process your payment...',
        },
        succeeded: {
            color: 'green',
            icon: (
                <motion.svg
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-16 h-16 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                    />
                </motion.svg>
            ),
            title: 'Payment Successful!',
            description: 'Your payment has been processed successfully.',
        },
        failed: {
            color: 'red',
            icon: (
                <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                    />
                </motion.svg>
            ),
            title: 'Payment Failed',
            description: errorMessage || 'We could not process your payment.',
        },
        requires_action: {
            color: 'yellow',
            icon: (
                <motion.svg
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-16 h-16 text-white0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                    />
                </motion.svg>
            ),
            title: 'Action Required',
            description: 'Additional authentication is required to complete this payment.',
        },
    };

    const config = statusConfig[status];

    return (
        <div className="relative">
            {/* Confetti for success */}
            {status === 'succeeded' && (
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={500}
                    gravity={0.3}
                />
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-2xl"
            >
                {/* Icon */}
                <div className="flex justify-center mb-6">{config.icon}</div>

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`text-2xl font-bold text-center mb-3 text-${config.color}-400`}
                >
                    {config.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400 text-center mb-6"
                >
                    {config.description}
                </motion.p>

                {/* Transaction Details */}
                {status === 'succeeded' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-3 bg-white/50 rounded-lg p-6 border border-gray-700"
                    >
                        {amount !== undefined && (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Amount Paid</span>
                                <span className="font-semibold text-green-400">
                                    {currency.toUpperCase()} {amount.toFixed(2)}
                                </span>
                            </div>
                        )}

                        {last4 && brand && (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Payment Method</span>
                                <span className="font-semibold text-white">
                                    {brand.charAt(0).toUpperCase() + brand.slice(1)} â€¢â€¢â€¢â€¢ {last4}
                                </span>
                            </div>
                        )}

                        {confirmationCode && (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400">Confirmation Code</span>
                                <motion.span
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    className="font-mono font-semibold text-gray-400 bg-white0/10 px-3 py-1 rounded"
                                >
                                    {confirmationCode}
                                </motion.span>
                            </div>
                        )}

                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Transaction Date</span>
                            <span className="text-gray-300">
                                {new Date().toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </span>
                        </div>
                    </motion.div>
                )}

                {/* Error Details */}
                {status === 'failed' && errorMessage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-sm text-red-300"
                    >
                        {errorMessage}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}






