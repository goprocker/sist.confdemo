"use client";

import { motion } from "framer-motion";
import speakersData from "@/data/speakers.json";
import FadeIn from "@/components/animations/FadeIn";

export default function SpeakersCarousel() {
    return (
        <div className="bg-primary-900 min-h-screen pt-20">
            <section id="speakers" className="py-24 overflow-hidden">
                <div className="container mx-auto px-6 mb-12">
                    <FadeIn>
                        <h2 className="text-4xl font-bold text-primary-50 mb-4">Keynote Speakers</h2>
                        <p className="text-xl text-primary-400">Hear from the visionaries shaping the future.</p>
                    </FadeIn>
                </div>

                <div id="keynotes" className="scroll-mt-32"></div>

                <div className="relative w-full">
                    <div className="flex overflow-x-auto pb-12 px-6 gap-8 snap-x snap-mandatory scrollbar-hide">
                        {speakersData.map((speaker, index) => (
                            <motion.div
                                key={speaker.id}
                                className="min-w-[300px] md:min-w-[350px] bg-primary-900 rounded-2xl shadow-xl border border-white/10 snap-center group"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="h-64 bg-primary-800 rounded-t-2xl relative overflow-hidden">
                                    {/* Placeholder for Speaker Image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-primary-600 font-bold text-lg group-hover:scale-105 transition-transform duration-500">
                                        {speaker.name} Photo
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                                </div>
                                <div className="p-6 relative">
                                    <h3 className="text-xl font-bold text-primary-50 mb-1">{speaker.name}</h3>
                                    <p className="text-blue-400 font-medium mb-2">{speaker.designation}</p>
                                    <p className="text-primary-500 text-sm">{speaker.institution}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <div id="invited" className="scroll-mt-32"></div>

            <section className="py-24 bg-primary-900">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <h2 className="text-3xl font-bold text-primary-50 mb-12">Invited Talks</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Placeholder for Invited Talks */}
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex gap-6 items-start p-6 rounded-xl border border-white/5 hover:bg-primary-50/5 transition-colors">
                                    <div className="w-16 h-16 rounded-full bg-primary-800 flex-shrink-0"></div>
                                    <div>
                                        <h4 className="text-lg font-bold text-primary-50 mb-1">Invited Speaker {i}</h4>
                                        <p className="text-blue-400 text-sm mb-2">Topic of the Talk Goes Here</p>
                                        <p className="text-primary-500 text-sm">Institution Name</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}




