"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

export default function NewsletterSection() {
    return (
        <section className="py-32 bg-gradient-to-b from-purple-50 to-amber-50 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <FadeIn>
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="max-w-4xl mx-auto bg-gradient-to-br from-yellow-100 to-purple-100 border border-purple-300 rounded-3xl p-12 text-center shadow-xl"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Stay Updated</h2>
                        <p className="text-lg text-purple-800 mb-10 max-w-2xl mx-auto">
                            Join our newsletter to receive the latest updates on speakers, schedule changes, and early bird registration deadlines.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-4 rounded-full bg-white border border-purple-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25"
                            >
                                Subscribe <Send size={18} />
                            </button>
                        </form>

                        <p className="text-sm text-purple-700/60 mt-6">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </motion.div>
                </FadeIn>
            </div>
        </section>
    );
}
