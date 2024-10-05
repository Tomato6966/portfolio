import React from "react";

interface ButtonProps {
    label: string;
    href: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
    target: string;
    secondary?: boolean;
    tertiary?: boolean;
}

const AnimatedLinkButton: React.FC<ButtonProps> = ({ label, href, onClick, target, secondary = false, tertiary = false }) => {
    const baseStyles = "inline-block relative px-6 py-3 rounded-lg font-semibold text-center transition-transform duration-300 focus:outline-none";

    const primaryStyles = "border border-blue-600 text-blue-600 bg-blue-600 bg-opacity-15 hover:bg-opacity-95 hover:text-white active:bg-blue-700";
    const secondaryStyles = "border border-purple-600 text-purple-600 bg-purple-600 bg-opacity-15 hover:bg-opacity-95 hover:text-white active:bg-purple-700";
    const tertiaryStyles = "border border-orange-600 text-orange-600 bg-orange-600 bg-opacity-15 hover:bg-opacity-95 hover:text-white active:bg-orange-700";
    const glowStyles = `absolute inset-0 bg-gradient-to-br ${secondary ? `from-purple-500 to-purple-600` : tertiary ? `from-orange-500 to-orange-600` : `from-blue-500 to-blue-600`} opacity-25 rounded-lg blur-lg transition-all duration-300 group-hover:opacity-100`

    return (
        <a
            href={href}
            target={target}
            onClick={onClick}
            className={`${baseStyles} ${secondary ? secondaryStyles : tertiary ? tertiaryStyles : primaryStyles} group`} // group class for hover animations
        >
            <div className="relative z-10 block transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-105 group-active:translate-y-1 group-active:scale-95">
                {label}
            </div>
            <div className={glowStyles}></div>
        </a>
    );
};

export default AnimatedLinkButton;
