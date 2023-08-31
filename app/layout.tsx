import NavBar from "./Components/navbar";
import "./global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lookcloud",
    description: "Find your Style",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <body>
                <div className="flex justify-center items-center w-screen h-screen">
                    <div className="w-[100%] h-[100%] max-w-[480px] ">
                        {children}
                        <NavBar />
                    </div>
                </div>
            </body>
        </html>
    );
}
