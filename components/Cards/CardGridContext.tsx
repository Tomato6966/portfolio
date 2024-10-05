'use client';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { Project } from "../../Types/Project";
import { getProjects } from "../Utils/Cards";

interface CardGridContextType {
    modalContent: Project | null;
    setModalContent: React.Dispatch<React.SetStateAction<Project | null>>;
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    hoveredCardIndex: number | null;
    setHoveredCardIndex: React.Dispatch<React.SetStateAction<number | null>>;
    columns: number;
    setColumns: React.Dispatch<React.SetStateAction<number>>;
    additionalMargin: number;
    setAdditionalMargin: React.Dispatch<React.SetStateAction<number>>;
    cardWidth: number;
    setCardWidth: React.Dispatch<React.SetStateAction<number>>;
    cardSpaceGap: number;
}

const CardGridContext = createContext<CardGridContextType | undefined>(undefined);

export default function CardGridProvider({ children }: { children: ReactNode }) {
    const [modalContent, setModalContent] = useState<Project | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
    const [columns, setColumns] = useState<number>(3);
    const [additionalMargin, setAdditionalMargin] = useState<number>(0);
    const [cardWidth, setCardWidth] = useState<number>(500);
    const cardSpaceGap = 50;

    useEffect(() => {
        getProjects().then(setProjects);
        // Function to calculate the number of columns based on window width
        const calculateColumns = () => {
            const width = window.innerWidth;
            if (width < 600) {
                setColumns(1);
                setCardWidth(width - 20);
                setAdditionalMargin(10);
            } else {
                let cWidth = 500;
                const newCols = Math.floor(width / (cWidth + cardSpaceGap));
                let newAdd = (width - (cWidth * newCols) - (cardSpaceGap * (newCols - 1))) / 2;
                setCardWidth(cWidth);
                setColumns(newCols);
                setAdditionalMargin(newAdd > 0 ? newAdd : 0);
            }
        };

        calculateColumns();

        window.addEventListener("resize", calculateColumns);

        return () => {
            window.removeEventListener("resize", calculateColumns);
        };
    }, [cardSpaceGap]);


    return (
        <CardGridContext.Provider
            value={{
                cardSpaceGap,
                modalContent,
                setModalContent,
                projects,
                setProjects,
                hoveredCardIndex,
                setHoveredCardIndex,
                columns,
                setColumns,
                additionalMargin,
                setAdditionalMargin,
                cardWidth,
                setCardWidth
            }}
        >
            {children}
        </CardGridContext.Provider>
    );
};

export const useCardGrid = () => {
    const context = useContext(CardGridContext);
    if (!context) {
        throw new Error('useCardGrid must be used within a CardGridProvider');
    }
    return context;
};
