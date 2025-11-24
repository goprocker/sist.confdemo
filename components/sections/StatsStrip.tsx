"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
    { label: "Attendees", value: 2000, suffix: "+" },
    { label: "Sessions", value: 50, suffix: "+" },
    { label: "Countries", value: 30, suffix: "+" },
    { label: "Speakers", value: 45, suffix: "+" },
];

function Counter({ from, to, duration }: { from: number; to: number; duration: number }) {
    const [count, setCount] = useState(from);
    const nodeRef = useRef(null);
    const inView = useInView(nodeRef, { once: true, margin: "-50px" });

    useEffect(() => {
        if (inView) {
            let startTime: number;
            let animationFrame: number;

            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

                setCount(Math.floor(progress * (to - from) + from));

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(animate);
                }
            };

            animationFrame = requestAnimationFrame(animate);

            return () => cancelAnimationFrame(animationFrame);
        }
    }, [inView, from, to, duration]);

    return <span ref={nodeRef}>{count}</span>;
}

export default function StatsStrip() {
    return (
        <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-purple-500/50">
                    {stats.map((stat, index) => (
                        <div key={stat.label} className="px-4">
                            <div className="text-4xl md:text-6xl font-bold mb-2 flex justify-center items-baseline">
                                <Counter from={0} to={stat.value} duration={2} />
                                <span className="text-2xl md:text-4xl ml-1 opacity-80">{stat.suffix}</span>
                            </div>
                            <div className="text-purple-100 font-medium uppercase tracking-wider text-sm md:text-base">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
