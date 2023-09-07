"use client";

import HeaderLogo from "../../../public/svg/headerlogo.svg";

export default function ChallengeProfileHeader() {
    return (
        <div className="flex flex-row justify-between items-center w-[100%] h-[56px] px-[16px]">
            <HeaderLogo width={"126"} height={"32"} color={"black"} />
        </div>
    );
}
