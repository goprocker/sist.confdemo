"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
    targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const TimeUnit = ({ value, label }: { value: number; label: string }) => (
        <div className="flex flex-col items-center">
            <div className="w-20 h-32 sm:w-24 sm:h-40 border border-white/30 rounded-2xl flex items-center justify-center bg-primary-50/5 backdrop-blur-sm mb-2">
                <span className="text-4xl sm:text-5xl font-bold text-primary-900 font-mono">
                    {value.toString().padStart(2, "0")}
                </span>
            </div>
            <span className="text-lg font-bold text-primary-900 uppercase tracking-wider">{label}</span>
        </div>
    );

    return (
        <div className="flex flex-col items-center gap-8 my-12">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-900 uppercase tracking-wide text-center">
                Last Day to Register is 1st December 2025
            </h3>
            <div className="flex gap-4 sm:gap-6">
                <TimeUnit value={timeLeft.days} label="Days" />
                <TimeUnit value={timeLeft.hours} label="Hours" />
                <TimeUnit value={timeLeft.minutes} label="Min" />
                <TimeUnit value={timeLeft.seconds} label="Sec" />
            </div>
        </div>
    );
}




