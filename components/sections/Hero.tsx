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
        <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-white text-gray-900 pt-32">
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

                </div>




            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <FadeIn direction="down" delay={0.2}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200/10 backdrop-blur-md border border-gray-400/30 text-sm font-medium mb-8 text-gray-900 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-gray-200 animate-pulse"></span>
                        July 15-17, 2026 • Sathyabama Institute Of Science & Technology, Chennai
                    </div>
                </FadeIn>

                <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight flex flex-col items-center">
                    <TextReveal delay={0.3}>Innovate.</TextReveal>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-600 via-secondary-500 to-secondary-600">
                        <TextReveal delay={0.5}>Transform.</TextReveal>
                    </span>
                    <TextReveal delay={0.7}>Lead.</TextReveal>
                </h1>

                <FadeIn delay={0.9}>
                    <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
                        The premier global conference where technology meets imagination.
                        Join 2000+ innovators for 3 days of breakthrough discoveries.
                    </p>
                </FadeIn>

                <FadeIn delay={1.1}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/registration" className="group relative px-8 py-4 bg-gradient-to-r from-secondary-500 to-secondary-700 hover:from-secondary-600 hover:to-secondary-800 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 hover:shadow-[0_10px_40px_-10px_rgba(14,165,233,0.6)] flex items-center gap-2">
                            Register Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/about" className="px-8 py-4 bg-white/80 hover:bg-white backdrop-blur-sm border border-gray-300 text-gray-900 rounded-full font-bold text-lg transition-all hover:border-gray-400 hover:shadow-lg">
                            Learn More
                        </Link>
                    </div>
                    <CountdownTimer targetDate={new Date("2026/07/15")} />
                </FadeIn>
            </div>

        </section>
    );
}


