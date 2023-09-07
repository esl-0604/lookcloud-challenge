"use client";

import Link from "next/link";
import HeaderLogo from "../../public/svg/headerlogo.svg";
import Profile from "../../public/svg/profile.svg";
import { useRouter, usePathname } from "next/navigation";
import Backward from "../../public/svg/backward.svg";

export default function ChallengeHeader() {
    const router = useRouter();
    const path = usePathname();
    console.log(path);
    const GoBackward = () => {
        router.back();
    };
    return (
        <div className="flex flex-row relative justify-between items-center w-[100%] h-[56px] px-[16px]">
            <HeaderLogo width={"126"} height={"32"} color={"white"} />
            <Link href={"/challenge/profile"} className="cursor-pointer">
                <Profile width={"40"} height={"40"} />
            </Link>
            {path === "/challenge" ? null : (
                <div
                    className="absolute top-[74px] right-[15px]"
                    onClick={GoBackward}
                >
                    <Backward />
                </div>
            )}
        </div>
    );
}
