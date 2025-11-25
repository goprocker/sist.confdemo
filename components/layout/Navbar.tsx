"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Home", href: "/" },
    {
        label: "About",
        href: "/about",
        children: [
            { label: "About the Conference", href: "/about" },
            { label: "Organizing Committee", href: "/about#committee" },
            { label: "Partner Institutions", href: "/about#partners" },
        ]
    },
    {
        label: "Tracks",
        href: "/tracks",
        children: [
            { label: "AI & Data", href: "/tracks#ai" },
            { label: "Cybersecurity", href: "/tracks#cyber" },
            { label: "Cloud & IoT", href: "/tracks#cloud" },
        ]
    },
    {
        label: "Speakers",
        href: "/speakers",
        children: [
            { label: "Keynotes", href: "/speakers#keynotes" },
            { label: "Invited Talks", href: "/speakers#invited" },
        ]
    },
    {
        label: "Schedule",
        href: "/schedule",
        children: [
            { label: "Day 1", href: "/schedule#day1" },
            { label: "Day 2", href: "/schedule#day2" },
            { label: "Workshops", href: "/schedule#workshops" },
        ]
    },
    {
        label: "Registration",
        href: "/registration",
    },
    {
        label: "Venue",
        href: "/venue",
        children: [
            { label: "Venue Info", href: "/venue" },
            { label: "Hotels", href: "/venue#hotels" },
            { label: "Travel Guide", href: "/venue#travel" },
        ]
    },
    {
        label: "Sponsors",
        href: "/sponsors",
    },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-7xl rounded-full border border-primary-400/30 bg-gradient-to-r from-primary-100/95 via-primary-50/95 to-primary-100/95 backdrop-blur-md shadow-lg",
                    scrolled ? "py-3" : "py-4"
                )}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-primary-900 relative z-50">
                        Conf<span className="text-primary-600">2025</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {navItems.map((item, index) => (
                            <div
                                key={item.label}
                                className="relative group"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-1 text-sm font-medium text-primary-700 hover:text-primary-600 transition-colors py-2"
                                >
                                    {item.label}
                                    {item.children && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />}
                                </Link>

                                {/* Dropdown */}
                                <AnimatePresence>
                                    {item.children && hoveredIndex === index && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 w-56 bg-primary-50 border border-primary-200 rounded-xl shadow-xl overflow-hidden p-2"
                                        >
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    className="block px-4 py-2 text-sm text-primary-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                        <Link
                            href="/registration"
                            className="px-5 py-2 bg-gradient-to-r from-primary-600 to-primary-900 hover:from-primary-500 hover:to-primary-600 text-primary-50 text-sm font-semibold rounded-full transition-all shadow-md hover:shadow-lg"
                        >
                            Register
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-primary-900 relative z-[110]"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-gradient-to-b from-primary-50 to-primary-50 z-[100] lg:hidden px-6 overflow-y-auto"
                    >
                        <div className="flex justify-end py-8">
                            <button
                                className="p-2 text-primary-900"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <X size={28} />
                            </button>
                        </div>
                        <nav className="flex flex-col space-y-2">
                            {navItems.map((item, index) => (
                                <div key={item.label} className="border-b border-white/5 pb-2">
                                    <div
                                        className="flex justify-between items-center py-3"
                                        onClick={() => {
                                            if (item.children) {
                                                setMobileExpandedIndex(mobileExpandedIndex === index ? null : index);
                                            } else {
                                                setMobileMenuOpen(false);
                                            }
                                        }}
                                    >
                                        <Link
                                            href={item.href}
                                            className="text-lg font-medium text-primary-900"
                                            onClick={(e) => {
                                                if (item.children) e.preventDefault();
                                            }}
                                        >
                                            {item.label}
                                        </Link>
                                        {item.children && (
                                            <ChevronRight
                                                size={20}
                                                className={cn(
                                                    "text-primary-500 transition-transform duration-300",
                                                    mobileExpandedIndex === index ? "rotate-90" : ""
                                                )}
                                            />
                                        )}
                                    </div>

                                    {/* Mobile Submenu */}
                                    <AnimatePresence>
                                        {item.children && mobileExpandedIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden pl-4"
                                            >
                                                <div className="flex flex-col space-y-3 py-2">
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.label}
                                                            href={child.href}
                                                            className="text-primary-700 hover:text-primary-600"
                                                            onClick={() => setMobileMenuOpen(false)}
                                                        >
                                                            {child.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}


