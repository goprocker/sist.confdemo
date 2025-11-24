"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import TextReveal from "@/components/animations/TextReveal";
import CountdownTimer from "@/components/ui/CountdownTimer";

export default function Hero() {
    return (
        <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-100 text-gray-900 pt-32">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/sathyabama_image.jpg"
                        alt="Sathyabama Institute of Science and Technology"
                        fill
                        className="object-cover opacity-10"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-cyan-100/30 to-blue-100/40"></div>
                </div>

                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-200/40 via-purple-100/20 to-transparent z-10"></div>

                {/* Animated Orbs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-60 z-10">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.7, 0.5],
                            x: [0, 50, 0],
                            y: [0, -30, 0]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-[100px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.5, 0.6, 0.5],
                            x: [0, -40, 0],
                            y: [0, 40, 0]
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-[100px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.4, 0.6, 0.4],
                            x: [0, 30, 0],
                            y: [0, -20, 0]
                        }}
                        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                        className="absolute top-[30%] right-[20%] w-[40vw] h-[40vw] bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full mix-blend-multiply filter blur-[100px]"
                    />
                </div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] z-10"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <FadeIn direction="down" delay={0.2}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 backdrop-blur-md border border-blue-400/30 text-sm font-medium mb-8 text-blue-700 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                        November 15-17, 2025 • San Francisco, CA
                    </div>
                </FadeIn>

                <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight flex flex-col items-center">
                    <TextReveal delay={0.3}>Innovate.</TextReveal>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                        <TextReveal delay={0.5}>Transform.</TextReveal>
                    </span>
                    <TextReveal delay={0.7}>Lead.</TextReveal>
                </h1>

                <FadeIn delay={0.9}>
                    <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
                        The premier global conference where technology meets imagination.
                        Join 2000+ innovators for 3 days of breakthrough discoveries.
                    </p>
                </FadeIn>

                <FadeIn delay={1.1}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/registration" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 hover:shadow-[0_10px_40px_-10px_rgba(37,99,235,0.6)] flex items-center gap-2">
                            Register Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/about" className="px-8 py-4 bg-white/80 hover:bg-white backdrop-blur-sm border border-gray-300 text-gray-900 rounded-full font-bold text-lg transition-all hover:border-gray-400 hover:shadow-lg">
                            Learn More
                        </Link>
                    </div>
                    <CountdownTimer targetDate={new Date("2025-12-01T00:00:00")} />
                </FadeIn>
            </div>

            {/* Scroll Hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
            >
                <span className="text-sm uppercase tracking-widest font-semibold">Scroll to explore</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown size={20} />
                </motion.div>
            </motion.div>
        </section>
    );
}
