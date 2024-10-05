'use client';

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

import AnimatedLinkButton from "./Button";

interface Repository {
    id: number;
    name: string;
    full_name: string; // Vollständiger Name des Repositories (z.B. "username/repo")
    html_url: string;
    stargazers_count: number;
    description: string | null;
    owner: {
        avatar_url: string;
        login: string; // Benutzername des Besitzers
    };
    thumbnail?: string;
}

const GITHUB_USERNAME = "Tomato6966"; // Ersetze dies mit dem gewünschten GitHub-Benutzernamen

const fetchRepoThumbnail = (owner: string, repo: string): string => {
    // Verwende HEAD für das neueste Commit
    const commitHash = 'HEAD';
    return `https://opengraph.githubassets.com/${commitHash}/${owner}/${repo}`;
};

export default function GitHubRepoGrid() {
    const [repos, setRepos] = useState<Repository[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchRepositories = async () => {
            let allRepos: Repository[] = [];
            let page = 1;

            while (allRepos.length < 100) { // Ändere die Anzahl nach Bedarf
                try {
                    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}`);
                    const data: Repository[] = await response.json();

                    if (data.length === 0) break; // Stoppe, wenn keine Daten mehr zurückgegeben werden

                    const reposWithThumbnails = data.map(repo => {
                        const thumbnail = fetchRepoThumbnail(repo.owner.login, repo.name); // Generiere Thumbnail-URL
                        return { ...repo, thumbnail }; // Füge das Thumbnail zum Repository hinzu
                    });

                    allRepos = [...allRepos, ...reposWithThumbnails];
                    page++;
                } catch (error) {
                    console.error("Fehler beim Abrufen der Repositories:", error);
                    break;
                }
            }

            setRepos(allRepos.sort((a, b) => b.stargazers_count - a.stargazers_count));
            setLoading(false);
        };

        fetchRepositories();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Ladeanzeige, während die Repos geladen werden
    }

    return (
        <>
            <div className="bg-transparent h-[10dvh]"></div>

            <h2 className="text-4xl font-bold text-center p-8 text-blue-300">{repos?.length} GitHub Repositories ({repos.reduce((a,b) => a+b.stargazers_count, 0)} total Stars)</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 md:gap-6 lg:gap-8 md:p-16 lg:p-24 text-blue-300 snap-start h-screen overflow-y-scroll" id="github">
                {repos.map((repo) => (
                    <Tilt
                        glareEnable={true}
                        tiltMaxAngleX={10}
                        tiltMaxAngleY={10}
                        perspective={1000}
                        glareReverse
                        glareColor="white"
                        glareBorderRadius="10px"
                        gyroscope
                        transitionSpeed={500}
                        key={repo.id}
                    >
                        <div className="relative overflow-hidden border rounded-lg shadow-lg">
                            {repo.thumbnail ? (
                                <Image
                                    src={repo.thumbnail}
                                    alt={repo.name}
                                    width={400} // Set the width of the image
                                    height={225} // Set the height of the image (16:9 aspect ratio)
                                    className="w-full h-40 object-cover"
                                />
                            ) : (
                                <Image
                                    src={repo.owner.avatar_url} // Use owner avatar if thumbnail is not available
                                    alt={`${repo.owner.login}'s avatar`}
                                    width={400}
                                    height={225}
                                    className="w-full h-40 object-cover"
                                />
                            )}
                            <div className="p-4 grid grid-rows-3">
                                <h3 className="text-xl font-semibold">{repo.name}</h3>
                                <p className="mt-2 text-gray-600 truncate">{repo.description || "...."}</p>
                                <div className="mt-2 flex items-center justify-between">
                                    <p className="text-gray-500 w-4/12 text-center py-3 bg-yellow-300/20 border border-yellow-300 rounded-lg">⭐ {repo.stargazers_count}</p>
                                    <AnimatedLinkButton href={repo.html_url} target="_blank" label="Check out" secondary />
                                </div>
                            </div>
                        </div>
                    </Tilt>
                ))}
            </div>
            <div className="bg-transparent h-[10dvh]"></div>
        </>
    );
}
