'use client';
import { useEffect, useState } from "react";

const texts = ["Discord Bot Developer", "Web Developer", "Freelancer", "Typescript, SQL, Nodejs", "Dev for your needs"];

export default function TypingText() {
    const [displayText, setDisplayText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const currentText = texts[textIndex];
        let timer: NodeJS.Timeout;
        let delTimer: NodeJS.Timeout;
        if (deleting) {
            timer = setTimeout(() => {
                setDisplayText(currentText.slice(0, charIndex - 1));
                setCharIndex((prev) => prev - 1);
            }, 100);
            if (charIndex === 0) {
                setDeleting(false);
                setTextIndex((prev) => (prev + 1) % texts.length);
            }
        } else {
            timer = setTimeout(() => {
                setDisplayText(currentText.slice(0, charIndex + 1));
                setCharIndex((prev) => prev + 1);
            }, 150);
            if (charIndex === currentText.length) {
                setTimeout(() => setDeleting(true), 2000);
            }
        }

        return () => clearTimeout(timer);
    }, [charIndex, deleting, textIndex]);

    return (
        <div className="text-xl md:text-3xl font-semibold text-center mt-6 text-purple-600">
            <p>{displayText || "‎ "}</p>
        </div>
    );
}
