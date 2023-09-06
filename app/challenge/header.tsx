"use client";

import HeaderLogo from "../../public/svg/headerlogo.svg";

export default function ChallengeHeader() {
    return (
        <div className="flex flex-row justify-start items-center w-[100%] h-[56px] pl-[16px]">
            <HeaderLogo width={"126"} height={"32"} color={"white"} />
        </div>
    );
}
