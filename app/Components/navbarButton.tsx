"use client";

import Trophy from "../../public/trophyicon.svg";
import Lookbook from "../../public/lookbookicon.svg";
import Chat from "../../public/chaticon.svg";
import { ReactElement, ReactNode } from "react";

interface NavBarButtonProps {
    type: string;
    activate: boolean;
}

export default function NavBarButton({ type, activate }: NavBarButtonProps) {
    const color: string = activate ? "#3E3AFF" : "#9B9BA1";
    const Icon: ReactElement =
        type === "challenge" ? (
            <>
                <Trophy color={color} />
                <span
                    className={`text-[12px] font-bold ${
                        activate ? "text-activate" : "text-deactivate"
                    }`}
                >
                    {"챌린지"}
                </span>
            </>
        ) : type === "lookbook" ? (
            <>
                <Lookbook color={color} />
                <span
                    className={`text-[12px] font-bold ${
                        activate ? "text-activate" : "text-deactivate"
                    }`}
                >
                    {"룩북"}
                </span>
            </>
        ) : type === "feedback" ? (
            <>
                <Chat color={color} />
                <span
                    className={`text-[12px] font-bold ${
                        activate ? "text-activate" : "text-deactivate"
                    }`}
                >
                    {"피드백"}
                </span>
            </>
        ) : (
            <Trophy />
        );
    return (
        <div className="flex flex-col justify-around items-center h-[100%]">
            {Icon}
        </div>
    );
}
