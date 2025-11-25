"use client";

import FadeIn from "@/components/animations/FadeIn";

export default function Venue() {
    return (
        <div className="bg-primary-900 min-h-screen pt-32">
            <section id="venue" className="py-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/2">
                            <FadeIn direction="right">
                                <h2 className="text-4xl font-bold text-primary-50 mb-6">The Venue</h2>
                                <p className="text-lg text-primary-400 mb-6 leading-relaxed">
                                    The conference will be held at the prestigious Sathyabama Institute of Science and Technology in Chennai.
                                    Located on the IT Highway, it offers state-of-the-art facilities and a vibrant academic atmosphere.
                                </p>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="font-bold text-blue-400 w-24">Address:</div>
                                        <div className="text-primary-300">Jeppiaar Nagar, Rajiv Gandhi Salai, Chennai - 600 119</div>
                                    </div>

                                    <div id="hotels" className="scroll-mt-32"></div>
                                    <div className="flex items-start gap-4">
                                        <div className="font-bold text-blue-400 w-24">Hotels:</div>
                                        <div className="text-primary-300">
                                            <p className="mb-2">Nearby accommodations:</p>
                                            <ul className="list-disc list-inside text-primary-400 space-y-1">
                                                <li>Fairfield by Marriott (1.5 miles)</li>
                                                <li>Novotel Chennai OMR (2.0 miles)</li>
                                                <li>ibis Chennai OMR (2.0 miles)</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div id="travel" className="scroll-mt-32"></div>
                                    <div className="flex items-start gap-4">
                                        <div className="font-bold text-blue-400 w-24">Travel:</div>
                                        <div className="text-primary-300">
                                            <p className="mb-2">Easy access via OMR IT Expressway.</p>
                                            <p className="text-sm text-primary-500">Chennai Airport: 45 mins by car</p>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                        <div className="md:w-1/2 w-full">
                            <FadeIn direction="left" delay={0.2}>
                                <div className="h-[400px] bg-primary-900 rounded-2xl overflow-hidden relative shadow-2xl border border-white/10">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.040704935981!2d80.22363731482056!3d12.840646221212731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525b7925c546c9%3A0x91a0110906237c26!2sSathyabama%20Institute%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}




