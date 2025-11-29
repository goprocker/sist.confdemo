import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 text-primary-900 py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-2xl font-bold text-primary-900 mb-4 block">
                            Conf2025
                        </Link>
                        <p className="text-primary-700 max-w-sm">
                            The premier conference for technology, innovation, and research. Join us for an unforgettable experience.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-gray-600 hover:text-secondary-600 transition-colors">About</Link></li>
                            <li><Link href="/tracks" className="text-gray-600 hover:text-secondary-600 transition-colors">Tracks</Link></li>
                            <li><Link href="/schedule" className="text-gray-600 hover:text-secondary-600 transition-colors">Schedule</Link></li>
                            <li><Link href="/registration" className="text-gray-600 hover:text-secondary-600 transition-colors">Register</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <p className="text-primary-700 mb-2">contact@conf2025.com</p>
                        <p className="text-primary-700 mb-4">+1 (555) 123-4567</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-600 hover:text-secondary-600 transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-600 hover:text-secondary-600 transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-600 hover:text-secondary-600 transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="text-gray-600 hover:text-secondary-600 transition-colors"><Instagram size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-12 pt-8 text-center text-primary-600 text-sm">
                    &copy; {new Date().getFullYear()} Conf2025. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

