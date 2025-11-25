"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Tracks", href: "/tracks" },
    { name: "Speakers", href: "/speakers" },
    { name: "Schedule", href: "/schedule" },
    { name: "Registration", href: "/registration" },
    { name: "Venue", href: "/venue" },
    { name: "Sponsors", href: "/sponsors" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled || isOpen ? "bg-primary-50/90 backdrop-blur-md shadow-md py-4" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-primary relative z-50">
                    Conf<span className={cn("transition-colors", scrolled || isOpen ? "text-black" : "text-primary-50")}>2025</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                scrolled ? "text-primary-700" : "text-gray-200",
                                pathname === item.href && "text-primary font-bold"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className={cn(
                        "md:hidden p-2 relative z-50 transition-colors",
                        scrolled || isOpen ? "text-primary-900" : "text-primary-50"
                    )}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-0 left-0 right-0 bg-primary-50 shadow-xl md:hidden pt-24 pb-8 px-6 min-h-screen flex flex-col"
                    >
                        <nav className="flex flex-col space-y-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "text-2xl font-bold transition-colors",
                                        pathname === item.href ? "text-primary" : "text-primary-800 hover:text-primary"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}


