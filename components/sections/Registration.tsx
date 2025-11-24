"use client";

import { Check } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const plans = [
    {
        name: "Student",
        price: "$199",
        features: ["Access to all sessions", "Conference kit", "Certificate of participation"],
        recommended: false
    },
    {
        name: "Professional",
        price: "$499",
        features: ["Access to all sessions", "Conference kit", "Networking dinner", "Workshop access"],
        recommended: true
    },
    {
        name: "VIP",
        price: "$799",
        features: ["All Professional benefits", "VIP Lounge access", "Priority seating", "Meet & Greet with speakers"],
        recommended: false
    }
];

export default function Registration() {
    return (
        <div className="bg-gray-950 min-h-screen pt-32">
            <section id="registration" className="py-24">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">Registration</h2>
                            <p className="text-xl text-gray-400">Secure your spot today.</p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {plans.map((plan, index) => (
                            <FadeIn key={plan.name} delay={index * 0.2} className="h-full">
                                <div
                                    className={`relative p-8 rounded-2xl border h-full flex flex-col ${plan.recommended
                                        ? 'border-blue-500 shadow-2xl shadow-blue-900/20 bg-gray-900 scale-105 z-10'
                                        : 'border-white/10 bg-gray-900/50 hover:bg-gray-900 transition-colors'
                                        }`}
                                >
                                    {plan.recommended && (
                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg shadow-blue-600/50">
                                            Recommended
                                        </div>
                                    )}
                                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                    <div className="text-4xl font-bold text-blue-400 mb-6">{plan.price}</div>
                                    <ul className="space-y-4 mb-8 flex-grow">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-3 text-gray-300">
                                                <Check size={18} className="text-blue-500 flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.recommended
                                            ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/25'
                                            : 'bg-white/10 text-white hover:bg-white/20'
                                            }`}
                                    >
                                        Register Now
                                    </button>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
