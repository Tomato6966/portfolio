'use client';
import { AnimatePresence, motion } from "framer-motion"; // Import framer-motion for animation
import Image from "next/image";
import { useEffect, useState } from "react";

import AnimatedLinkButton from "./Button";
import TypingText from "./TypingText";

export default function Hero({ images }: { images: string[] }) {
    const [currentImage, setCurrentImage] = useState(Math.floor(Math.random() * images.length));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [images]);

    return (
        <div className="snap-start h-full flex items-center justify-center bg-gray-900" id="top">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <AnimatePresence>
                    {images.length > 0 && (
                        <motion.div
                            key={currentImage}
                            initial={{ opacity: 0, x: 100 }}  // Start with image out of view
                            animate={{ opacity: 1, x: 0 }}    // Animate to fully visible and centered
                            exit={{ opacity: 0, x: -100 }}     // Slide out left when exiting
                            transition={{ duration: 1 }}       // Transition duration of 1 second
                            className="absolute top-0 left-0 w-full h-full"
                        >
                            <Image
                                src={images[currentImage]}
                                alt="Carousel"
                                layout="fill"
                                className="w-full h-full object-cover opacity-60"
                                priority
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="absolute top-0 left-0 w-full h-full bg-black/70"></div>

            <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 md:px-8">
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-blue-600/50 mb-4 vivid-text border-text">
                    @Chrissy8283
                </h1>
                <TypingText />

                <div className="h-full flex flex-wrap gap-8 justify-center items-center">
                    <div className="mt-8 w-full space-x-4">
                        <AnimatedLinkButton href="https://github.com/Tomato6966" label="Github" target="_blank" />
                        <AnimatedLinkButton href="https://discord.gg/AsgD3gtPnb" label="Discord" target="_blank" secondary />
                    </div>

                    <div className="mt-8 w-full space-x-4">
                        <AnimatedLinkButton href="#projects" label="Projects" target="" tertiary />
                        <AnimatedLinkButton href="#github" label="Github-Repository Projects" target="" tertiary />
                    </div>
                </div>
            </div>
        </div>
    );
}
