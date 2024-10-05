import NavBar from "../components/Navbar";

export const metadata = {
    title: 'Chrissy8283',
    description: 'Portfolio of Chrissy8283',
    openGraph: {
        title: 'Chrissy8283',
        description: 'Portfolio of Chrissy8283',
    },
    link: [
        {
            rel: 'f',
            href: 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap',
        },
    ],
    icons: {
        icon: '/favicon.ico',
    },
};


export default function RootLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <html lang="en">
            <body className="backdrop-blur-lg h-dvh overflow-hidden bg-black">
                <NavBar />
                <div className="relative h-dvh overflow-y-scroll snap-y snap-mandatory bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                    {children}
                </div>
            </body>
        </html>
    )
}
