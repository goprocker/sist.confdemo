"use client";

import { motion } from "framer-motion";
import FadeIn from "@/components/animations/FadeIn";

export default function AboutSection() {
    return (
        <section id="about" className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <FadeIn direction="right">
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
                                Shaping the Future of <br />
                                <span className="text-black">Global Innovation</span>
                            </h2>
                            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                                <p>
                                    Conf2025 is more than just a conference; it's a convergence of the brightest minds in technology, science, and business. We bring together visionaries to challenge the status quo and define the next generation of digital transformation.
                                </p>
                                <p>
                                    Over three immersive days, you'll engage with cutting-edge research, participate in hands-on workshops, and build lasting connections with peers who share your passion for progress.
                                </p>
                            </div>

                            <div className="mt-10 space-y-4">
                                {[
                                    "Global networking opportunities with 2000+ attendees",
                                    "Access to 50+ exclusive sessions and workshops",
                                    "Direct interaction with industry leaders and pioneers"
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + index * 0.1 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-primary-600" />
                                        <span className="text-primary-800">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </FadeIn>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <FadeIn direction="left" delay={0.2}>
                            <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-200 backdrop-blur-sm p-8 flex items-center justify-center group">
                                <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,transparent,black)]" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-100 via-transparent to-transparent" />

                                {/* Abstract Graphic */}
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="w-[200px] h-[200px] border border-primary-400/40 rounded-full absolute"
                                    />
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                        className="w-[300px] h-[300px] border border-primary-400/30 rounded-full absolute"
                                    />
                                    <div className="text-center z-10">
                                        <span className="text-6xl font-bold text-primary-900 block mb-2">25+</span>
                                        <span className="text-primary-600 uppercase tracking-widest text-sm">Years of Excellence</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}


