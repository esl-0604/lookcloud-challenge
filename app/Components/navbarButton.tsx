"use client";

import Trophy from "../../public/trophyicon.svg";
import Lookbook from "../../public/lookbookicon.svg";
import Chat from "../../public/chaticon.svg";
import { usePathname } from "next/navigation";

interface NavBarButtonProps {
    type: string;
}

export default function NavBarButton({ type }: NavBarButtonProps) {
    const Icon =
        type === "challenge" ? (
            <Trophy />
        ) : type === "lookbook" ? (
            <Lookbook />
        ) : type === "feedback" ? (
            <Chat />
        ) : (
            <Trophy />
        );
    const path = usePathname();
    console.log(path);

    return (
        <div className="flex flex-col justify-around items-center h-[100%] bg-red-500">
            {Icon}
            <span>{type}</span>
        </div>
    );
}
