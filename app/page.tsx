import "./globals.css";

import Image from "next/image";
import { Fragment, ReactNode } from "react";

import CardGrid from "../components/Cards/CardGrid";
import CardGridProvider from "../components/Cards/CardGridContext";
import GitHubRepoGrid from "../components/GithubRepoGrid";
import Hero from "../components/Hero";
import { getProjects } from "../components/Utils/Cards";
import { getAllHeroImages } from "../components/Utils/Hero";

export default async function Home() {
    const images = await getAllHeroImages();
    const projects = await getProjects();

    return (
        <>
            <Hero images={images}/>

            <Section
                id="about"
                datas={
                    [
                        {
                            key: "aboutme",
                            title: "About Me",
                            imageSrc: "/portfolio/carousel/Chrissy.jpg",
                            renderComp: (<p>
                                👋 Hello World! <br />
                                I'm chrissy, 21 Years old and from Austria. <br />
                                In my current Job i'm doing web-development (fullstack), Cloud & K8S Management as well LLM (GenAI) Integration (into Applications)
                                Due to my high variaty of knowledge, I'm capable of providing Solutions to all needs within a fraction of time
                                Tho i'm only 21, I have almost 7 Years of experience in Javascript/Typescript and over 9 Years of Experience in the IT-Sector.
                                In my public appearance, I love to make Discord Bots, that's why i have a huge Portfolio of Opensource Projects
                                <a href="#github" className="p-1 border bg-blue-500/30 border-blue-800 rounded-md">(See the Github Section)</a>
                                with simple-to-understand SourceCodes thousands of People use!<br /><br />
                                <b>My favourite Tech-Stack: </b> <br />
                                Nodejs/Bunjs + nextjs/remix.run + Typescript + prisma.io/drizzle <br />
                            </p>)
                        },
                        {
                            key: "milratodevelopment",
                            title: "Milrato Development",
                            imageSrc: "/portfolio/carousel/MilratoWinter.png",
                            renderComp: (<p>
                                You might also know be as
                                <code className="p-1 border bg-blue-500/30 border-blue-800 rounded-md">Tomato6966</code>
                                , Founder & Main Dev of Milrato Development (Milrato BotShop)
                                This Project was my biggest ever, I founded a Discord Bot Shop Service, with automated managed hosting for everyone
                                In 2019 I started making custom Discord Bots for Gaming Clans/Teams.
                                Because the demand was high, i founded in 2020 Milrato Development
                                A server where people, could create Bots with my famous <b className="p-1 border bg-blue-500/30 border-blue-800 rounded-md">Discord Bot Maker</b>
                                We offered hosting for several different templates (administration, security, music, multipurpose, etc.)
                                In 2023 I stepped back as Owner, CEO und Dev, because I started my irl Career and Family
                                Because the Project was that famous (30k People), I was getting love & hate, that's one of the many Reasons why i re-started as Chrissy8283 under the radar.
                            </p>)
                        }
                    ]
                }
            />

            <CardGridProvider initProjects={projects}>
                <CardGrid/>
            </CardGridProvider>

            {/* GitHub Repositories Section */}
            <div className="snap-start h-dvh">
                <GitHubRepoGrid />
            </div>


            <Section
                id="services"
                datas={
                    [
                        {
                            key: "Services",
                            title: "Services",
                            imageSrc: "/portfolio/carousel/Chrissy.jpg",
                            renderComp: (<p>
                                I offer multiple services
                            </p>)
                        }
                    ]
                }
            />
        </>
    );
}

function Section({
    datas,
    id,
}: {
    id: string;
    datas: {
        key: string;
        title: string;
        imageSrc: string;
        renderComp: ReactNode;
    }[]
}) {
    return (
        <>
            <div id={id} className="snap-start h-dvh min-h-dvh text-blue-300 overflow-auto">
                <div className={`grid grid-cols-1 lg:grid-cols-2 items-center justify-center p-4 lg:p-40 gap-6 lg:gap-12 pt-[10dvh] pb-[10dvh]`}>
                    {datas.map(({ key, title, imageSrc, renderComp }, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <Fragment key={key}>
                                {isEven ? (
                                    <>
                                        <div className={`relative w-full h-[30rem]`}>
                                            <Image
                                                src={imageSrc}
                                                alt={title}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-3xl"
                                            />
                                        </div>
                                        <div className={`mt-2 md:mt-2 flex flex-wrap text-left  items-start h-[30rem]`}>
                                            <h2 className="text-3xl md:text-4xl font-bold w-full">{title}</h2>
                                            <div className="text-lg text-slate-500">{renderComp}</div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className={`mt-40 md:mt-4 flex flex-wrap text-left h-[30rem]`}>
                                            <h2 className="text-3xl md:text-4xl font-bold w-full">{title}</h2>
                                            <div className="text-lg text-slate-500">{renderComp}</div>
                                        </div>
                                        <div className={`mt-32 md:mt-2 relative w-full h-[30rem]`}>
                                            <Image
                                                src={imageSrc}
                                                alt={title}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-3xl"
                                            />
                                        </div>
                                    </>
                                )}
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
