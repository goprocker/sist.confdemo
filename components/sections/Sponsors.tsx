"use client";

import FadeIn from "@/components/animations/FadeIn";

export default function Sponsors() {
    return (
        <div className="bg-white min-h-screen pt-32">
            <section className="py-24">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn>
                        <h2 className="text-3xl font-bold text-secondary-900 mb-12">Our Sponsors</h2>
                    </FadeIn>

                    <div className="mb-12">
                        <FadeIn delay={0.2}>
                            <h3 className="text-sm font-bold text-secondary-600 uppercase tracking-wider mb-8">Gold Sponsors</h3>
                        </FadeIn>
                        <div className="flex flex-wrap justify-center gap-12 items-center">
                            {[1, 2, 3].map((i) => (
                                <FadeIn key={i} delay={0.3 + i * 0.1} direction="up">
                                    <div className="w-40 h-16 bg-secondary-900 border border-secondary-800 rounded flex items-center justify-center text-gray-100 font-bold hover:border-secondary-500/50 transition-all cursor-pointer shadow-lg hover:shadow-xl">
                                        LOGO {i}
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>

                    <div>
                        <FadeIn delay={0.4}>
                            <h3 className="text-sm font-bold text-secondary-600 uppercase tracking-wider mb-8">Silver Sponsors</h3>
                        </FadeIn>
                        <div className="flex flex-wrap justify-center gap-10 items-center">
                            {[4, 5, 6, 7, 8].map((i) => (
                                <FadeIn key={i} delay={0.5 + i * 0.1} direction="up">
                                    <div className="w-32 h-12 bg-secondary-900 border border-secondary-800 rounded flex items-center justify-center text-gray-100 font-bold text-sm hover:border-secondary-500/50 transition-all cursor-pointer">
                                        LOGO {i}
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>

                    <FadeIn delay={0.6}>
                        <div className="mt-20 p-8 bg-secondary-900 rounded-2xl border border-secondary-800 max-w-3xl mx-auto shadow-2xl">
                            <h3 className="text-xl font-bold text-white mb-4">Interested in Sponsoring?</h3>
                            <p className="text-gray-200 mb-6">
                                Connect with thousands of industry leaders and showcase your brand.
                            </p>
                            <button className="px-8 py-3 bg-white text-secondary-900 font-semibold rounded-full hover:bg-gray-200 transition-colors">
                                Download Prospectus
                            </button>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}






