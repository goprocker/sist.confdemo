"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const testimonials = [
    {
        id: 1,
        quote: "The most inspiring tech conference I've attended in years. The quality of speakers and the depth of discussions were unmatched.",
        author: "Sarah Jenkins",
        role: "Senior Developer, Google",
        image: "/images/avatar1.jpg"
    },
    {
        id: 2,
        quote: "A perfect blend of academic research and industry application. I walked away with actionable insights for my team.",
        author: "Dr. Alan Grant",
        role: "Research Lead, OpenAI",
        image: "/images/avatar2.jpg"
    },
    {
        id: 3,
        quote: "The networking opportunities were fantastic. I met potential partners and collaborators from all over the world.",
        author: "Maria Garcia",
        role: "CTO, TechStart",
        image: "/images/avatar3.jpg"
    }
];

export default function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-32 bg-gray-900">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold text-white mb-6">What Attendees Say</h2>
                    </div>
                </FadeIn>

                <div className="max-w-4xl mx-auto relative">
                    <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 text-blue-900/20">
                        <Quote size={120} />
                    </div>

                    <div className="relative bg-gray-800/30 border border-white/5 rounded-3xl p-12 backdrop-blur-sm">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="text-center"
                            >
                                <p className="text-2xl md:text-3xl text-gray-300 italic mb-10 leading-relaxed">
                                    "{testimonials[currentIndex].quote}"
                                </p>
                                <div>
                                    <h4 className="text-xl font-bold text-white">{testimonials[currentIndex].author}</h4>
                                    <p className="text-blue-400">{testimonials[currentIndex].role}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex justify-center gap-4 mt-12">
                            <button
                                onClick={prev}
                                className="p-3 rounded-full bg-gray-700 text-white hover:bg-blue-600 transition-colors"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={next}
                                className="p-3 rounded-full bg-gray-700 text-white hover:bg-blue-600 transition-colors"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
