"use client";

import { motion } from "framer-motion";
import tracksData from "@/data/tracks.json";
import * as Icons from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

export default function Tracks() {
    return (
        <div className="bg-white min-h-screen pt-32">
            <section id="tracks" className="py-24">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-secondary-900 mb-4">Conference Tracks</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Explore our diverse range of tracks covering the most critical topics in technology today.
                            </p>
                        </div>
                    </FadeIn>

                    {/* Anchor IDs for specific tracks - mapping simplified for demo */}
                    <div id="ai" className="scroll-mt-32"></div>
                    <div id="cyber" className="scroll-mt-32"></div>
                    <div id="cloud" className="scroll-mt-32"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tracksData.map((track, index) => {
                            // Dynamically get icon
                            const IconComponent = (Icons as any)[track.icon] || Icons.HelpCircle;

                            return (
                                <motion.div
                                    key={track.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    whileHover={{ y: -10, transition: { duration: 0.2 } }}
                                    className="bg-secondary-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-secondary-500/20 transition-all border border-secondary-800 group"
                                >
                                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-secondary-400 mb-6 group-hover:bg-white group-hover:text-secondary-900 transition-colors">
                                        <IconComponent size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{track.title}</h3>
                                    <p className="text-gray-400 mb-6 leading-relaxed">{track.description}</p>
                                    <a href="#" className="text-secondary-400 font-medium hover:text-secondary-300 inline-flex items-center gap-1 transition-colors">
                                        Learn more <Icons.ArrowRight size={16} />
                                    </a>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="mt-16 text-center">
                        <button className="px-8 py-3 bg-transparent border border-secondary-600 text-secondary-600 rounded-full font-semibold hover:bg-secondary-900 hover:text-white transition-all hover:shadow-lg">
                            Download Call for Papers PDF
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}






