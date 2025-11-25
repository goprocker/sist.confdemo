"use client";

import FadeIn from "@/components/animations/FadeIn";

export default function Sponsors() {
    return (
        <div className="bg-primary-900 min-h-screen pt-32">
            <section className="py-24">
                <div className="container mx-auto px-6 text-center">
                    <FadeIn>
                        <h2 className="text-3xl font-bold text-primary-50 mb-12">Our Sponsors</h2>
                    </FadeIn>

                    <div className="mb-12">
                        <FadeIn delay={0.2}>
                            <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-8">Gold Sponsors</h3>
                        </FadeIn>
                        <div className="flex flex-wrap justify-center gap-12 items-center">
                            {[1, 2, 3].map((i) => (
                                <FadeIn key={i} delay={0.3 + i * 0.1} direction="up">
                                    <div className="w-40 h-16 bg-primary-50/5 border border-white/10 rounded flex items-center justify-center text-primary-400 font-bold hover:bg-primary-50/10 hover:border-blue-500/30 transition-all cursor-pointer shadow-lg">
                                        LOGO {i}
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>

                    <div>
                        <FadeIn delay={0.4}>
                            <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-8">Silver Sponsors</h3>
                        </FadeIn>
                        <div className="flex flex-wrap justify-center gap-10 items-center">
                            {[4, 5, 6, 7, 8].map((i) => (
                                <FadeIn key={i} delay={0.5 + i * 0.1} direction="up">
                                    <div className="w-32 h-12 bg-primary-50/5 border border-white/10 rounded flex items-center justify-center text-primary-500 font-bold text-sm hover:bg-primary-50/10 hover:border-blue-500/30 transition-all cursor-pointer">
                                        LOGO {i}
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>

                    <FadeIn delay={0.6}>
                        <div className="mt-20 p-8 bg-primary-900 rounded-2xl border border-white/10 max-w-3xl mx-auto">
                            <h3 className="text-xl font-bold text-primary-50 mb-4">Interested in Sponsoring?</h3>
                            <p className="text-primary-400 mb-6">
                                Connect with thousands of industry leaders and showcase your brand.
                            </p>
                            <button className="px-8 py-3 bg-primary-600 hover:bg-primary-500 text-primary-50 font-semibold rounded-full transition-colors">
                                Download Prospectus
                            </button>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}




