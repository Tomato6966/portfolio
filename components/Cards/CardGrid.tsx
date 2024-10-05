'use client';
import { useEffect } from "react";

import Modal from "../Modal";
import ProjectCard from "./Card";
import { useCardGrid } from "./CardGridContext";

export default function CardGrid() {
    const {
        modalContent,
        setModalContent,
        projects,
    } = useCardGrid();

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash.startsWith("#modal_")) {
                const index = parseInt(hash.split("_")[1], 10);
                if ((!isNaN(index) || index === 0) && projects[index]) {
                    document.getElementById("projects")?.scrollIntoView({ behavior: 'smooth' });
                    setModalContent(projects[index]);
                }
            }
        };
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, [projects, setModalContent]);

    const closeModal = () => {
        setModalContent(null);
        window.location.hash = "#projects";
    }

    return (
        <>

            <div className="snap-start h-screen overflow-y-scroll cardgrid" id="projects">
                <div className="bg-transparent h-[10dvh]"></div>
                <div className="p-0 py-16 h-dvh relative">
                    {
                        projects?.length && projects.map((project, index) => <ProjectCard index={index} project={project} key={project.title + String(index)} />)
                    }
                    {
                        modalContent && <Modal project={modalContent} onClose={() => closeModal()} />
                    }
                </div>
                <div className="bg-transparent h-[10dvh]"></div>
            </div>

        </>
    );
}
