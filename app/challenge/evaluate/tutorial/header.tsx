"use client";

import HeaderLogo from "@/../public/svg/headerlogo.svg";

export default function TutorialHeader() {
    return (
        <div className="flex flex-col justify-start items-center w-[100%]">
            <div className="flex flex-row justify-start items-center w-[100%] h-[56px] pl-[16px]">
                <HeaderLogo width={"126"} height={"32"} color={"white"} />
                <span className="text-white w-full text-right mr-4">
                    고연전
                </span>
            </div>
        </div>
    );
}
