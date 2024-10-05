'use client';

import { useState } from "react";

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Toggle menu visibility
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <header className="relative">
            {/* Page Title on the left */}
            <h1 className="text-2xl font-bold text-white absolute top-0 left-0 p-4 border border-pink-300/30 bg-gradient-to-t from-blue-900/70 to-purple-900/40" style={{
                zIndex: 100,
                borderRadius: "0 0 10px 0"
            }}>
                <a href="top" className="text-white hover:text-blue-400 transition">
                    Chrissy8283 - Portfolio
                </a>
            </h1>

            {/* Hamburger Icon for Mobile */}
            <button
                className="absolute top-0 right-0 p-4 z-50 md:hidden" // Hide on larger screens
                onClick={toggleMenu}
            >
                <span className="block w-8 h-0.5 bg-pink-300 mb-1"></span>
                <span className="block w-8 h-0.5 bg-purple-300 mb-1"></span>
                <span className="block w-8 h-0.5 bg-purple-500"></span>
            </button>

            {/* Navigation Links */}
            <nav className={`flex flex-col md:flex-row space-y-4 md:space-x-6 absolute top-16 md:top-0 right-0 p-4 border border-pink-300/30 bg-gradient-to-t from-blue-900/90 to-purple-900/90 md:from-blue-900/70 md:to-purple-900/40 md:space-y-0 transition-all duration-300 ${isMenuOpen ? 'block' : 'hidden md:block'}`} style={{
                zIndex: 100,
                borderRadius: "0 0 0 10px"
            }}>
                <a href="#projects" className="text-white hover:text-blue-400 transition">
                    Projects
                </a>
                <a href="#about" className="text-white hover:text-blue-400 transition">
                    About
                </a>
                <a href="#services" className="text-white hover:text-blue-400 transition">
                    Services
                </a>
                <a href="#github" className="text-white hover:text-blue-400 transition">
                    Github-Projects
                </a>
            </nav>
        </header>
    );
}
