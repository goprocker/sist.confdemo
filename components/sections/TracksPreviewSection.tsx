"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cpu, Shield, Cloud, Database, Globe, Lock } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const tracks = [
    { id: 1, title: "AI & Machine Learning", category: "Technology", icon: Cpu, description: "Deep dive into neural networks, LLMs, and the future of generative AI." },
    { id: 2, title: "Cybersecurity", category: "Security", icon: Shield, description: "Protecting digital assets in an era of evolving threats and zero-trust architectures." },
    { id: 3, title: "Cloud Computing", category: "Technology", icon: Cloud, description: "Scalable infrastructure, serverless computing, and multi-cloud strategies." },
    { id: 4, title: "Big Data Analytics", category: "Data", icon: Database, description: "Turning massive datasets into actionable insights for business growth." },
    { id: 5, title: "Web 3.0 & Blockchain", category: "Technology", icon: Globe, description: "Decentralized applications, smart contracts, and the future of the internet." },
    { id: 6, title: "Privacy & Ethics", category: "Security", icon: Lock, description: "Navigating the complex landscape of data privacy and ethical AI development." },
];

const filters = ["All", "Technology", "Security", "Data"];

export default function TracksPreviewSection() {
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredTracks = activeFilter === "All"
        ? tracks
        : tracks.filter(track => track.category === activeFilter);

    return (
        <section id="tracks" className="py-32 bg-gradient-to-b from-white to-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <FadeIn>
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Tracks</h2>
                        <p className="text-xl text-gray-700 max-w-xl">
                            Dive deep into specific areas of interest with our curated tracks.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="flex flex-wrap gap-2">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === filter
                                        ? "bg-gray-200 text-white"
                                        : "bg-white text-gray-700 hover:bg-white hover:text-gray-600 border border-gray-200"
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </FadeIn>
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredTracks.map((track) => (
                            <motion.div
                                key={track.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="relative bg-white backdrop-blur-md border border-gray-200 p-8 rounded-2xl transition-all duration-300 group cursor-pointer overflow-hidden hover:shadow-lg hover:shadow-secondary-600/30 hover:border-secondary-400 hover:-translate-y-2"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-secondary-100/30 to-secondary-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-600 group-hover:bg-secondary-100 group-hover:text-secondary-700 transition-colors shadow-sm group-hover:shadow-secondary-500/25">
                                            <track.icon size={24} />
                                        </div>
                                        <span className="text-xs font-medium text-gray-600 uppercase tracking-wider border border-gray-300 px-2 py-1 rounded bg-white">
                                            {track.category}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">{track.title}</h3>
                                    <p className="text-gray-700 mb-6 text-sm leading-relaxed group-hover:text-gray-800 transition-colors">
                                        {track.description}
                                    </p>
                                    <div className="flex items-center text-gray-600 text-sm font-medium group-hover:translate-x-2 transition-transform">
                                        View details <ArrowRight size={16} className="ml-1" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <FadeIn delay={0.4}>
                    <div className="mt-16 text-center">
                        <a href="#" className="inline-flex items-center text-gray-700 hover:text-gray-600 transition-colors border-b border-transparent hover:border-gray-600 pb-1">
                            View all 20+ tracks <ArrowRight size={16} className="ml-2" />
                        </a>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}






