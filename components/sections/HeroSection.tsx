"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Users, Mic, MapPin } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const quickLinks = [
    {
        title: "Explore Tracks",
        icon: Calendar,
        href: "/tracks",
        color: "bg-white0",
        desc: "Discover our diverse sessions"
    },
    {
        title: "Meet Speakers",
        icon: Mic,
        href: "/speakers",
        color: "bg-purple-500",
        desc: "World-class experts"
    },
    {
        title: "View Schedule",
        icon: Users,
        href: "/schedule",
        color: "bg-pink-500",
        desc: "Plan your conference"
    },
    {
        title: "Venue Details",
        icon: MapPin,
        href: "/venue",
        color: "bg-indigo-500",
        desc: "Get directions & info"
    }
];

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white text-white pt-20">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-950 to-black opacity-90"></div>
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gray-200 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
                    <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] bg-pink-600 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
                </div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-center">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <FadeIn direction="down">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-8 hover:bg-white/20 transition-colors cursor-default">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            July 15-17, 2026 • Sathyabama Institute Of Science & Technology, Chennai
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight">
                            Innovate. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                                Transform.
                            </span>{" "}
                            Lead.
                        </h1>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                            The premier global conference where technology meets imagination.
                            Join 2000+ innovators for 3 days of breakthrough discoveries.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                            <Link href="/registration" className="group relative px-8 py-4 bg-gray-200 hover:bg-white0 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 overflow-hidden">
                                <span className="relative z-10 flex items-center gap-2">Register Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></span>
                            </Link>
                            <Link href="/about" className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-white rounded-full font-bold text-lg transition-all hover:border-white/30">
                                Learn More
                            </Link>
                        </div>
                    </FadeIn>
                </div>

                {/* Quick Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto w-full">
                    {quickLinks.map((link, index) => (
                        <FadeIn key={link.title} delay={0.4 + index * 0.1} direction="up" className="h-full">
                            <Link href={link.href} className="block h-full group">
                                <div className="h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:border-white/20 hover:-translate-y-1">
                                    <div className={`w-12 h-12 ${link.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                        <link.icon size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-1 group-hover:text-blue-300 transition-colors">{link.title}</h3>
                                    <p className="text-sm text-gray-400">{link.desc}</p>
                                </div>
                            </Link>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}


