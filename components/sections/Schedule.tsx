"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import FadeIn from "@/components/animations/FadeIn";

const days = ["Day 1", "Day 2", "Day 3"];
const scheduleData = {
    "Day 1": [
        { time: "09:00 AM", title: "Registration & Breakfast", type: "General" },
        { time: "10:00 AM", title: "Opening Keynote", type: "Keynote" },
        { time: "11:30 AM", title: "Panel Discussion: AI Ethics", type: "Panel" },
    ],
    "Day 2": [
        { time: "09:00 AM", title: "Workshop: React Server Components", type: "Workshop" },
        { time: "11:00 AM", title: "Paper Presentation: Track A", type: "Session" },
    ],
    "Day 3": [
        { time: "09:00 AM", title: "Closing Ceremony", type: "General" },
        { time: "10:00 AM", title: "Networking Lunch", type: "Networking" },
    ]
};

export default function Schedule() {
    const [activeDay, setActiveDay] = useState("Day 1");

    return (
        <div className="bg-white min-h-screen pt-32">
            <section id="schedule" className="py-24">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-secondary-900 mb-4">Event Schedule</h2>
                            <p className="text-xl text-gray-600">Don't miss a moment of the action.</p>
                        </div>
                    </FadeIn>

                    <div id="day1" className="scroll-mt-32"></div>
                    <div id="day2" className="scroll-mt-32"></div>
                    <div id="workshops" className="scroll-mt-32"></div>

                    <FadeIn delay={0.2}>
                        <div className="flex justify-center mb-12">
                            <div className="bg-gray-100 p-1 rounded-full shadow-inner border border-gray-200 inline-flex">
                                {days.map((day) => (
                                    <button
                                        key={day}
                                        onClick={() => setActiveDay(day)}
                                        className={cn(
                                            "px-6 py-2 rounded-full text-sm font-medium transition-all",
                                            activeDay === day
                                                ? "bg-secondary-900 text-white shadow-lg"
                                                : "text-gray-500 hover:text-secondary-900 hover:bg-white"
                                        )}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    <div className="max-w-3xl mx-auto">
                        {/* @ts-ignore */}
                        {scheduleData[activeDay].map((item: any, index: number) => (
                            <FadeIn key={`${activeDay}-${index}`} delay={index * 0.1} direction="left">
                                <div
                                    className="bg-secondary-900 p-6 rounded-xl shadow-lg border border-secondary-800 mb-4 flex flex-col md:flex-row md:items-center gap-4 hover:border-secondary-500/50 transition-colors"
                                >
                                    <div className="md:w-32 font-bold text-secondary-400">{item.time}</div>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-bold text-white">{item.title}</h4>
                                        <span className="inline-block px-2 py-1 bg-white/10 text-gray-300 text-xs rounded mt-2 border border-white/10">
                                            {item.type}
                                        </span>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    <FadeIn delay={0.4}>
                        <div className="mt-12 text-center">
                            <button className="text-secondary-600 font-medium hover:text-secondary-800 hover:underline transition-colors">Download Full Schedule (PDF)</button>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}






