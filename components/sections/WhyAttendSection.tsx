"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Users, Lightbulb, TrendingUp, Code2 } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { MouseEvent } from "react";

const reasons = [
    {
        icon: Users,
        title: "Network with Experts",
        description: "Connect with industry leaders and like-minded professionals from over 30 countries."
    },
    {
        icon: Lightbulb,
        title: "Discover Research",
        description: "Get exclusive access to groundbreaking research papers and case studies before anyone else."
    },
    {
        icon: TrendingUp,
        title: "Industry Insights",
        description: "Learn actionable strategies and trends that are shaping the future of technology."
    },
    {
        icon: Code2,
        title: "Hands-on Workshops",
        description: "Participate in interactive sessions to master new tools, frameworks, and methodologies."
    }
];

function SpotlightCard({ reason, index }: { reason: typeof reasons[0], index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <FadeIn delay={index * 0.1} className="h-full">
            <div
                className="group relative border border-purple-200 bg-white px-8 py-10 rounded-2xl h-full overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                onMouseMove={handleMouseMove}
            >
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(147, 51, 234, 0.15),
                transparent 80%
              )
            `,
                    }}
                />
                <div className="relative">
                    <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <reason.icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{reason.title}</h3>
                    <p className="text-gray-700 leading-relaxed">
                        {reason.description}
                    </p>
                </div>
            </div>
        </FadeIn>
    );
}

export default function WhyAttendSection() {
    return (
        <section className="py-32 bg-gradient-to-b from-gray-50 to-amber-50">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Attend Conf2025?</h2>
                        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                            Experience a conference designed to inspire, educate, and connect.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {reasons.map((reason, index) => (
                        <SpotlightCard key={reason.title} reason={reason} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
