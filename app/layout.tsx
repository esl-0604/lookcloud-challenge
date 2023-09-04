import "./global.css";
import type { Metadata } from "next";
import type { AppProps } from "next/app";
import AuthSession from "./authsession";

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
                    <div className="relative w-[100%] h-[100%] max-w-[480px] ">
                        <AuthSession>{children}</AuthSession>
                    </div>
                </div>
            </body>
        </html>
    );
}
