"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScaleInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export default function ScaleIn({ children, className = "", delay = 0 }: ScaleInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20%" });

    return (
        <motion.div
            ref={ref}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{
                duration: 0.8,
                delay: delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
