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
        <div className="flex flex-row sticky top-0 justify-between items-center w-[100%] h-[56px] px-[16px] z-10 bg-black">
            <HeaderLogo width={"126"} height={"32"} color={"white"} />
            <Link href={"/challenge/profile"} className="cursor-pointer">
                <Profile width={"40"} height={"40"} />
            </Link>
            {path === "/challenge" ? null : (
                <div
                    className="absolute top-[74px] right-[15px] z-10 cursor-pointer"
                    onClick={GoBackward}
                >
                    <Backward />
                </div>
            )}
        </div>
    );
}
