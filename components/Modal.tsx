'use client';
import { motion } from "framer-motion";
import { useCallback, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { Project } from "../Types/Project";
import AnimatedLinkButton from "./Button";

type IModalProps = { project?: Project; onClose?: () => void };

const MarkdownImageOrVideo = ({ src, alt }: { src?: string; alt?: string }) => {
    const isVideo = src?.endsWith('.mp4') || src?.endsWith('.webm') || src?.endsWith('.ogg');

    if (isVideo) {
        return (
            <video controls className="rounded-3xl w-full">
                <source src={"/portfolio" + src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        );
    }

    return <img src={"/portfolio" + src} alt={alt} className="rounded-3xl" />;
};

export default function Modal({
    project = { description: "N/A", markdown: "N/A", thumbnail: "/", title: "Unkown Project" },
    onClose = () => {}
}:IModalProps) {
    const linkMatch = project?.title.match(/https?:\/\/[^\s()]+/g);
    const link = linkMatch ? linkMatch[0] : "";

    const displayTitle = link ? project?.title.replace(link + (project?.title.endsWith(')') ? ')' : ''), "").trim().replace("]()", "").replace("[", "") : project?.title;

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => e.currentTarget === e.target && onClose();

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (["escape", "esc"].includes(e.key.toLowerCase())) onClose();
    }, [onClose]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={handleOutsideClick}
        >
            <div className="relative bg-gray-800 p-6 z-10 rounded-lg max-w-xl w-full text-white max-h-[80dvh] overflow-auto">
                <motion.img
                    src={project.thumbnail}
                    className="absolute top-0 -z-10 left-0 w-full h-full object-cover opacity-10"
                    alt="Modal Background"
                />
                <div className="flex justify-between items-center">
                <h3 className="text-3xl font-bold text-white">{displayTitle}</h3>
                    {link && (
                        <AnimatedLinkButton
                            label="Learn More"
                            href={link}
                            target="_blank"
                            secondary
                        />
                    )}
                </div>
                <ReactMarkdown
                    remarkPlugins={[[remarkGfm]]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                        // Override the default image renderer
                        img: ({ node, ...props }) => <MarkdownImageOrVideo {...props} />,
                    }}
                    className="mt-4"
                >
                    {project.description.trim()}
                </ReactMarkdown>
                <button
                    className="mt-4 text-red-400 hover:text-red-600"
                    onClick={onClose}
                >
                    X (Close)
                </button>
            </div>
        </div>
    );
}
