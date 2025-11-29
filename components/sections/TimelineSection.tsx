"use client";

import FadeIn from "@/components/animations/FadeIn";

const schedule = [
    {
        day: "Day 1",
        date: "July 15, 2026",
        title: "The Future of AI",
        highlights: ["Opening Keynote by Dr. Elena Rodriguez", "Panel: Ethics in Generative AI", "Networking Mixer"]
    },
    {
        day: "Day 2",
        date: "July 16, 2026",
        title: "Building Scalable Systems",
        highlights: ["Workshop: Rust for Web Dev", "Cloud Native Architecture", "Gala Dinner"]
    },
    {
        day: "Day 3",
        date: "July 17, 2026",
        title: "Innovation & Startups",
        highlights: ["Startup Pitch Competition", "Closing Keynote", "Awards Ceremony"]
    }
];

export default function TimelineSection() {
    return (
        <section id="schedule" className="py-32 bg-white">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold text-secondary-900 mb-6">Conference Schedule</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Three days of packed content, learning, and networking.
                        </p>
                    </div>
                </FadeIn>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 md:transform md:-translate-x-1/2 ml-8 md:ml-0" />

                    <div className="space-y-16">
                        {schedule.map((item, index) => (
                            <FadeIn key={item.day} delay={index * 0.2}>
                                <div className={`flex flex-col md:flex-row gap-8 md:gap-0 items-start relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                    {/* Content */}
                                    <div className="w-full md:w-1/2 pl-20 md:pl-0 md:px-12">
                                        <div className={`bg-secondary-900 border border-secondary-700 p-8 rounded-2xl hover:border-secondary-500/50 transition-colors shadow-lg hover:shadow-xl ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                            <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}>
                                                <span className="md:hidden text-white font-bold text-xl mb-2 block">{item.day}</span>
                                                <span className="text-secondary-400 font-bold tracking-wider uppercase text-sm mb-2">{item.date}</span>
                                                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                                <ul className={`space-y-2 text-secondary-200 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                                    {item.highlights.map((highlight, i) => (
                                                        <li key={i} className="flex items-center gap-2 justify-start md:justify-inherit">
                                                            {index % 2 !== 0 && <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-secondary-400" />}
                                                            <span>{highlight}</span>
                                                            {(index % 2 === 0 || true) && <span className="md:hidden w-1.5 h-1.5 rounded-full bg-secondary-400" />}
                                                            {index % 2 === 0 && <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-secondary-400" />}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Center Dot */}
                                    <div className="absolute left-8 md:left-1/2 top-8 w-4 h-4 rounded-full bg-secondary-600 border-4 border-white transform -translate-x-1/2 z-10 shadow-md" />

                                    {/* Day Label */}
                                    <div className={`hidden md:block absolute left-1/2 top-7 transform ${index % 2 === 0 ? 'md:-translate-x-[calc(100%+2rem)]' : 'md:translate-x-8'} text-xl font-bold text-secondary-900 z-10`}>
                                        {item.day}
                                    </div>

                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}






