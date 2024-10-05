'use client';
import Modal from "../Modal";
import ProjectCard from "./Card";
import { useCardGrid } from "./CardGridContext";

export default function CardGrid() {
    const {
        modalContent,
        setModalContent,
        projects,
    } = useCardGrid();

    return (
        <>

            <div className="snap-start h-screen overflow-y-scroll cardgrid" id="projects">
                <div className="bg-transparent h-[10dvh]"></div>
                <div className="p-0 py-16 h-dvh relative">
                    {
                        projects?.length && projects.map((project, index) => <ProjectCard index={index} project={project} key={project.title + String(index)} />)
                    }
                    {
                        modalContent && <Modal project={modalContent} onClose={() => setModalContent(null)} />
                    }
                </div>
                <div className="bg-transparent h-[10dvh]"></div>
            </div>

        </>
    );
}
