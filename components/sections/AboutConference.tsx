"use client";

import { motion } from "framer-motion";
import ScaleIn from "@/components/animations/ScaleIn";
import FadeIn from "@/components/animations/FadeIn";

export default function AboutConference() {
    return (
        <div className="bg-primary-900 min-h-screen pt-32">
            {/* Main About Section */}
            <section id="about" className="py-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <ScaleIn className="md:w-1/2">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 blur-lg"></div>
                                <div className="relative h-[400px] w-full rounded-2xl overflow-hidden bg-primary-900 border border-white/10">
                                    {/* Placeholder for About Image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-primary-500 font-medium">
                                        About Image Placeholder
                                    </div>
                                </div>
                            </div>
                        </ScaleIn>

                        <motion.div
                            className="md:w-1/2"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl font-bold mb-6 text-primary-50">About the Conference</h2>
                            <p className="text-lg text-primary-400 mb-6 leading-relaxed">
                                Conf2025 brings together the brightest minds in technology to discuss the future of digital transformation.
                                Our mission is to foster collaboration, inspire innovation, and drive meaningful change in the industry.
                            </p>
                            <p className="text-lg text-primary-400 mb-8 leading-relaxed">
                                With over 50 speakers and 2000+ attendees expected, this year's event promises to be our biggest yet.
                                Explore cutting-edge research, attend hands-on workshops, and network with peers from around the globe.
                            </p>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-3xl font-bold text-blue-500 mb-2">50+</h4>
                                    <p className="text-primary-400">Speakers</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-blue-500 mb-2">2000+</h4>
                                    <p className="text-primary-400">Attendees</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-blue-500 mb-2">30+</h4>
                                    <p className="text-primary-400">Sessions</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-bold text-blue-500 mb-2">3</h4>
                                    <p className="text-primary-400">Days</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Organizing Committee Section */}
            <section id="committee" className="py-24 bg-primary-900">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <h2 className="text-3xl font-bold text-primary-50 mb-12 text-center">Organizing Committee</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-primary-900 border border-white/10 p-8 rounded-2xl text-center hover:border-blue-500/50 transition-colors">
                                    <div className="w-24 h-24 bg-primary-800 rounded-full mx-auto mb-6 flex items-center justify-center text-primary-500">
                                        Photo
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-50 mb-2">Committee Member {i}</h3>
                                    <p className="text-blue-400">Role Title</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Partner Institutions Section */}
            <section id="partners" className="py-24">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <h2 className="text-3xl font-bold text-primary-50 mb-12 text-center">Partner Institutions</h2>
                        <div className="flex flex-wrap justify-center gap-12 opacity-70">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-40 h-20 bg-primary-50/5 rounded-lg flex items-center justify-center text-primary-500 font-bold border border-white/10">
                                    Partner {i}
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}


