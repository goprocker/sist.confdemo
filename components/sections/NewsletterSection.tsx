"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

export default function NewsletterSection() {
    return (
        <section className="py-32 bg-white relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <FadeIn>
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="max-w-4xl mx-auto bg-secondary-900 border border-secondary-700 rounded-3xl p-12 text-center shadow-2xl"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stay Updated</h2>
                        <p className="text-lg text-secondary-200 mb-10 max-w-2xl mx-auto">
                            Join our newsletter to receive the latest updates on speakers, schedule changes, and early bird registration deadlines.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                id="newsletter-email"
                                name="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-4 rounded-full bg-secondary-800 border border-secondary-600 text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all"
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-white hover:bg-secondary-100 text-secondary-900 font-bold rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg shadow-white/10"
                            >
                                Subscribe <Send size={18} />
                            </button>
                        </form>

                        <p className="text-sm text-gray-600 mt-6">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </motion.div>
                </FadeIn>
            </div>
        </section>
    );
}






