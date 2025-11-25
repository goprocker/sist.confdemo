"use client";

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

const themes = [
    { name: "purple", color: "#9333ea" },
    { name: "blue", color: "#2563EB" },
    { name: "red", color: "#DC2626" },
    { name: "green", color: "#16A34A" },
    { name: "yellow", color: "#CA8A04" },
];

export default function ThemeSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState("purple");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "purple";
        setCurrentTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    const handleThemeChange = (theme: string) => {
        setCurrentTheme(theme);
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div className={`absolute bottom-full right-0 mb-4 bg-primary-50 dark:bg-primary-800 rounded-lg shadow-xl p-2 transition-all duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                <div className="flex flex-col gap-2">
                    {themes.map((theme) => (
                        <button
                            key={theme.name}
                            onClick={() => handleThemeChange(theme.name)}
                            className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${currentTheme === theme.name ? "border-white shadow-lg scale-110" : "border-transparent"}`}
                            style={{ backgroundColor: theme.color }}
                            title={`Switch to ${theme.name} theme`}
                        />
                    ))}
                </div>
            </div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-primary-900 text-primary-50 p-3 rounded-full shadow-lg hover:bg-primary-800 transition-colors"
                aria-label="Toggle theme switcher"
            >
                <Palette size={24} />
            </button>
        </div>
    );
}




