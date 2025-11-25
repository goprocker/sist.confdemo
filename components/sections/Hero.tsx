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
        <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-primary-50/50 via-primary-50 to-primary-100 text-primary-900 pt-32">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/sist.jpg"
                        alt="Sathyabama Institute of Science and Technology"
                        fill
                        className="object-cover opacity-100"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-100/20 via-primary-100/15 to-primary-100/30"></div>
                </div>

                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-200/15 via-primary-200/25 to-transparent z-10"></div>

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
                        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-gradient-to-br from-primary-400 to-primary-500 rounded-full mix-blend-multiply filter blur-[100px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.5, 0.6, 0.5],
                            x: [0, -40, 0],
                            y: [0, 40, 0]
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mix-blend-multiply filter blur-[100px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.15, 1],
                            opacity: [0.4, 0.6, 0.4],
                            x: [0, 30, 0],
                            y: [0, -20, 0]
                        }}
                        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                        className="absolute top-[30%] right-[20%] w-[40vw] h-[40vw] bg-gradient-to-br from-primary-400 to-primary-400 rounded-full mix-blend-multiply filter blur-[100px]"
                    />
                </div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] z-10"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <FadeIn direction="down" delay={0.2}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600/10 backdrop-blur-md border border-primary-400/30 text-sm font-medium mb-8 text-primary-900 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse"></span>
                        November 15-17, 2025 â€¢ San Francisco, CA
                    </div>
                </FadeIn>

                <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight flex flex-col items-center">
                    <TextReveal delay={0.3}>Innovate.</TextReveal>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-600 to-primary-600">
                        <TextReveal delay={0.5}>Transform.</TextReveal>
                    </span>
                    <TextReveal delay={0.7}>Lead.</TextReveal>
                </h1>

                <FadeIn delay={0.9}>
                    <p className="text-lg md:text-xl text-primary-50 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
                        The premier global conference where technology meets imagination.
                        Join 2000+ innovators for 3 days of breakthrough discoveries.
                    </p>
                </FadeIn>

                <FadeIn delay={1.1}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/registration" className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-900 text-primary-50 rounded-full font-bold text-lg transition-all transform hover:scale-105 hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.6)] flex items-center gap-2">
                            Register Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/about" className="px-8 py-4 bg-primary-50/80 hover:bg-primary-50 backdrop-blur-sm border border-primary-300 text-primary-900 rounded-full font-bold text-lg transition-all hover:border-primary-400 hover:shadow-lg">
                            Learn More
                        </Link>
                    </div>
                    <CountdownTimer targetDate={new Date("2025-12-01T00:00:00")} />
                </FadeIn>
            </div>

        </section>
    );
}




