'use client';
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

import { Project } from "../../Types/Project";
import AnimatedLinkButton from "../Button";
import { useCardGrid } from "./CardGridContext";

type IProjectCardProps = {
    project: Project,
    index: number;
}

export default function ProjectCard({
    project,
    index,
}: IProjectCardProps) {
    const {
        hoveredCardIndex,
        setHoveredCardIndex,
        columns,
        setModalContent,
        additionalMargin,
        cardWidth,
        cardSpaceGap
      } = useCardGrid();

    const linkMatch = project?.title.match(/https?:\/\/[^\s()]+/g);
    const link = linkMatch ? linkMatch[0] : "";
    const displayTitle = link ? project?.title.replace(link + (project?.title.endsWith(')') ? ')' : ''), "").trim().replace("]()", "").replace("[", "") : project?.title;

    const marginLeft = `${additionalMargin + ((index % columns) * (cardWidth + cardSpaceGap))}px`;

    const tiltStyle = {
        width: `${cardWidth}px`,
        scale: hoveredCardIndex === index ? 1.15 : 1,
        marginLeft,
        marginTop: `${Math.floor(index / columns) * 400}px`
    }
    return (
        <Tilt
            glareEnable={true}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            perspective={1000}
            glareReverse
            glareColor="black"
            glareBorderRadius="20px"
            gyroscope
            transitionSpeed={500}
            key={index}
            className={`absolute ${hoveredCardIndex === index ? 'z-50' : 'z-10'}`}
            style={tiltStyle}
        >
            <motion.div
                id={`card-${index}`}
                className={`relative bg-gray-900 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform duration-300`}
                onClick={() => setModalContent(project)}
                onMouseEnter={() => setHoveredCardIndex(index)}
                onMouseLeave={() => setHoveredCardIndex(null)}
            >
                <img
                    src={project.thumbnail}
                    alt="Project Thumbnail"
                    className="w-full h-48 object-cover"
                />
                <div className="p-4 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">{displayTitle}</h3>
                    {link && (
                        <AnimatedLinkButton
                            label="Learn More"
                            href={link}
                            target="_blank"
                            secondary
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        />
                    )}
                </div>
                <p className="text-sm text-gray-400 p-4 pt-2 italic overflow-hidden max-h-[100px]">{project.description.split("\n").filter(v => v.trim().length > 20).slice(0, 2)}</p>
            </motion.div>
        </Tilt>
    );
}
