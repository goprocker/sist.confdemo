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
        <div className="bg-white min-h-screen pt-32 relative overflow-hidden">
            <section id="registration" className="py-24 relative z-10">
                <div className="container mx-auto px-6">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-bold text-secondary-900 mb-6 tracking-tight">Registration</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Secure your spot at the most anticipated tech conference of the year. Choose the plan that suits you best.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, index) => (
                            <FadeIn key={plan.name} delay={index * 0.2} className="h-full">
                                <div
                                    className={`relative p-8 rounded-3xl border h-full flex flex-col transition-all duration-300 ${plan.recommended
                                        ? 'bg-secondary-900 border-secondary-500 shadow-2xl shadow-secondary-900/20 scale-105 z-10'
                                        : 'bg-secondary-900 border-secondary-700 hover:border-secondary-500 shadow-lg'
                                        }`}
                                >
                                    {plan.recommended && (
                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <div className="bg-gradient-to-r from-secondary-600 to-secondary-400 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-secondary-900/50 uppercase tracking-wider">
                                                Most Popular
                                            </div>
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-bold text-white">{plan.price}</span>
                                            <span className={`${plan.recommended ? 'text-secondary-300' : 'text-secondary-400'}`}>/ticket</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-4 mb-8 flex-grow">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className={`flex items-start gap-3 ${plan.recommended ? 'text-secondary-100' : 'text-secondary-300'}`}>
                                                <div className={`mt-1 p-1 rounded-full ${plan.recommended ? 'bg-secondary-500/20 text-secondary-400' : 'bg-secondary-800 text-secondary-400'}`}>
                                                    <Check size={14} strokeWidth={3} />
                                                </div>
                                                <span className="text-sm leading-relaxed">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${plan.recommended
                                            ? 'bg-white text-secondary-900 hover:bg-secondary-50 shadow-lg shadow-white/10 hover:shadow-white/20 transform hover:-translate-y-1'
                                            : 'bg-secondary-800 text-white hover:bg-secondary-700 border border-secondary-600 hover:border-secondary-500'
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
