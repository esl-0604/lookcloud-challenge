"use client";

import SelectButton from "./selectbutton";
import { useContext } from "react";
import { GenderContext } from "./main";

export default function OnboardingGenderInput() {
    const { gender, setGender }: any = useContext(GenderContext);
    return (
        <div className="flex flex-col justify-between items-center w-[364px] h-[104px] mb-[24px] text-[24px] font-textBoxFont ">
            <div onClick={() => setGender("FEMALE")}>
                <SelectButton
                    text={"여성"}
                    selectedTheme={
                        gender === "FEMALE"
                            ? "text-white bg-[#557AFF]"
                            : "text-[#D9D9D9] bg-transparent"
                    }
                />
            </div>
            <div onClick={() => setGender("MALE")}>
                <SelectButton
                    text={"남성"}
                    selectedTheme={
                        gender === "MALE"
                            ? "text-white bg-[#557AFF]"
                            : "text-[#D9D9D9] bg-transparent"
                    }
                />
            </div>
        </div>
    );
}