"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";
import Image from "next/image";

const speakers = [
    {
        id: 1,
        name: "Dr. Elena Rodriguez",
        role: "Chief AI Scientist",
        org: "DeepMind",
        image: "/images/speaker1.jpg" // Placeholder
    },
    {
        id: 2,
        name: "James Chen",
        role: "VP of Engineering",
        org: "Tesla",
        image: "/images/speaker2.jpg" // Placeholder
    },
    {
        id: 3,
        name: "Sarah Johnson",
        role: "Director of Research",
        org: "MIT Media Lab",
        image: "/images/speaker3.jpg" // Placeholder
    },
    {
        id: 4,
        name: "Michael Chang",
        role: "Founder & CEO",
        org: "TechFlow",
        image: "/images/speaker4.jpg" // Placeholder
    }
];

export default function SpeakersPreviewSection() {
    return (
        <section id="speakers" className="py-32 bg-gradient-to-b from-white to-white">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Keynote Speakers</h2>
                            <p className="text-xl text-gray-700 max-w-xl">
                                Hear from the visionaries shaping the future of technology.
                            </p>
                        </div>
                        <button className="hidden md:block px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-200 hover:text-white hover:border-gray-600 transition-colors font-medium">
                            View All Speakers
                        </button>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {speakers.map((speaker, index) => (
                        <FadeIn key={speaker.id} delay={index * 0.1}>
                            <div className="group relative overflow-hidden rounded-2xl bg-gray-50 aspect-[3/4]">
                                {/* Placeholder Image Background */}
                                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400 text-lg font-bold">
                                    {speaker.name} Photo
                                </div>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-xl font-bold text-white mb-1">{speaker.name}</h3>
                                    <p className="text-gray-600 text-sm font-medium mb-1">{speaker.role}</p>
                                    <p className="text-gray-400 text-xs uppercase tracking-wider">{speaker.org}</p>

                                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                        <span className="text-sm text-white border-b border-white pb-0.5">View full bio</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <button className="px-8 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-200 hover:text-white hover:border-gray-600 transition-colors font-medium">
                        View All Speakers
                    </button>
                </div>
            </div>
        </section>
    );
}






