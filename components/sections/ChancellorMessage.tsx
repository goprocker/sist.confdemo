"use client";

import FadeIn from "@/components/animations/FadeIn";

export default function ChancellorMessage() {
    return (
        <section className="relative py-12 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <div className="text-center mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-2 tracking-tight">
                            Message From Chancellor
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-secondary-400 to-secondary-600 mx-auto rounded-full"></div>
                    </div>
                </FadeIn>
                <div className="max-w-fit mx-auto">
                    <div className="bg-gradient-to-br from-secondary-400 via-secondary-500 to-secondary-600 rounded-2xl shadow-xl overflow-hidden">
                        <div className="flex flex-col md:flex-row items-stretch gap-6 p-6 md:p-8">
                            {/* Chancellor Image - Left */}
                            <div className="flex items-center justify-center flex-shrink-0">
                                <div className="relative w-full max-w-[320px]">
                                    {/* Decorative background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-xl transform -rotate-2 z-0"></div>
                                    {/* Image container */}
                                    <div className="relative w-full rounded-xl overflow-hidden shadow-lg border-4 border-white/30 z-10">
                                        <img
                                            src="/chancellor-new-image.jpeg"
                                            alt="Dr. MARIAZEENA JOHNSON"
                                            className="w-full h-auto block"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Message Text - Right */}
                            <FadeIn direction="right" delay={0.3}>
                                <div className="flex flex-col max-w-[600px]">
                                    <div className="space-y-4 text-white leading-relaxed text-justify">
                                        <p className="text-lg md:text-xl font-medium leading-relaxed">
                                            Welcome to an extraordinary journey of innovation and excellence! As we embark on this remarkable conference, I am filled with immense pride and excitement for what lies ahead.
                                        </p>
                                        <p className="text-base md:text-lg leading-relaxed">
                                            Our institution has always been a beacon of knowledge, creativity, and transformative learning. This event represents the culmination of countless hours of dedication, passion, and collaborative effort.
                                        </p>
                                        <p className="text-base md:text-lg leading-relaxed">
                                            I encourage each participant to embrace every opportunity—engage deeply with the workshops, connect with fellow innovators, and let your ideas flourish.
                                        </p>
                                        <p className="text-base md:text-lg leading-relaxed">
                                            May this conference be a catalyst for groundbreaking discoveries, meaningful collaborations, and lifelong friendships. Together, let us shape a future driven by innovation, compassion, and excellence.
                                        </p>
                                        <div className="pt-4 border-t border-white/30 mt-3">
                                            <p className="text-xl font-bold text-white">
                                                Best wishes for an inspiring experience!
                                            </p>
                                            <p className="text-lg font-semibold text-white/95 mt-2">
                                                — Dr. MARIAZEENA JOHNSON
                                            </p>
                                            <p className="text-base text-white/80">
                                                Chancellor
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
