"use client";

import SelectButton from "./selectbutton";
import { useContext } from "react";
import { OrganContext } from "./main";

export default function OnboardingOranizationInput() {
    const { organ, setOrgan }: any = useContext(OrganContext);
    return (
        <div className="flex flex-col justify-between items-center w-[364px] h-[162px] mb-[24px] text-[24px] font-textBoxFont ">
            <div onClick={() => setOrgan("고려대학교")}>
                <SelectButton
                    text={"고려대학교"}
                    selectedTheme={
                        organ === "고려대학교"
                            ? "text-white bg-[#DC2D2D]"
                            : "text-[#D9D9D9] bg-transparent"
                    }
                />
            </div>
            <div onClick={() => setOrgan("연세대학교")}>
                <SelectButton
                    text={"연세대학교"}
                    selectedTheme={
                        organ === "연세대학교"
                            ? "text-white bg-[#0500FF]"
                            : "text-[#D9D9D9] bg-transparent"
                    }
                />
            </div>
            <div onClick={() => setOrgan("기타")}>
                <SelectButton
                    text={"기타"}
                    selectedTheme={
                        organ === "기타"
                            ? "text-white bg-[#557AFF]"
                            : "text-[#D9D9D9] bg-transparent"
                    }
                />
            </div>
        </div>
    );
}