"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const faqs = [
    {
        question: "When and where is Conf2025 taking place?",
        answer: "Conf2025 will be held from November 15-17, 2025, at the Grand Convention Center in San Francisco, CA. Virtual attendance options are also available."
    },
    {
        question: "How can I register for the conference?",
        answer: "You can register directly through our website. Early bird registration is open until August 30th. We offer special rates for students and groups."
    },
    {
        question: "Is there a call for papers?",
        answer: "Yes, the call for papers is currently open. You can submit your abstracts via the 'Submission' page. The deadline for submission is July 15th."
    },
    {
        question: "Are there accommodation options nearby?",
        answer: "We have partnered with several hotels near the venue to provide discounted rates for attendees. Please visit the 'Venue' page for more details and booking links."
    },
    {
        question: "Can I get a refund if I can't attend?",
        answer: "Cancellations made 30 days prior to the event are eligible for a full refund. Please check our Terms & Conditions for the detailed cancellation policy."
    }
];

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-32 bg-gray-950">
            <div className="container mx-auto px-6 max-w-3xl">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                        <p className="text-xl text-gray-400">
                            Everything you need to know about Conf2025.
                        </p>
                    </div>
                </FadeIn>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FadeIn key={index} delay={index * 0.1}>
                            <div className="border border-white/10 rounded-2xl bg-gray-900 overflow-hidden">
                                <button
                                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                    className="w-full flex justify-between items-center p-6 text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className="text-lg font-medium text-white">{faq.question}</span>
                                    <span className="text-blue-500">
                                        {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                    </span>
                                </button>
                                <AnimatePresence>
                                    {activeIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
