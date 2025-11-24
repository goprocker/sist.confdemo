"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
}

export default function TextReveal({ children, className = "", delay = 0 }: TextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
            <motion.span
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{
                    duration: 0.8,
                    delay: delay,
                    ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for premium feel
                }}
                className="inline-block"
            >
                {children}
            </motion.span>
        </span>
    );
}
