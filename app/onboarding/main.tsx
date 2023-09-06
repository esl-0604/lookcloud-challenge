"use client";

import { useState, createContext, useEffect } from "react";
import OnboardingGenderInput from "./genderinput";
import OnboardingHeader from "./header";
import OnboardingNameInput from "./nameinput";
import OnboardingOranizationInput from "./organizationinput";
import TextBox from "./textbox";
import ContinueButton from "./continuebutton";
import { useSearchParams } from "next/navigation";

interface StepType {
    id: "1" | "2" | "3";
}
export interface GenderType {
    gender: "MALE" | "FEMALE";
}
export interface OrganType {
    organ: "고려대학교" | "연세대학교" | "기타";
}

export const stepText = {
    "1": "이름을 알려주세요.",
    "2": "성별을 알려주세요.",
    "3": "소속을 알려주세요.",
};
export const StepContext = createContext<any>(null);
export const NameContext = createContext<any>(null);
export const GenderContext = createContext<any>(null);
export const OrganContext = createContext<any>(null);

export default function OnboardingMain() {
    const [step, setStep] = useState<StepType>({ id: "1" });
    const [nickName, setNickName] = useState<string>("");
    const [gender, setGender] = useState<GenderType | null>(null);
    const [organ, setOrgan] = useState<OrganType | null>(null);
    const [canBeContinued, setCanBeContinued] = useState<boolean>(false);

    useEffect(() => {
        switch (step.id) {
            case "1":
                if (nickName.length > 0) setCanBeContinued(true);
                else setCanBeContinued(false);
                break;
            case "2":
                if (gender) setCanBeContinued(true);
                else setCanBeContinued(false);
                break;
            case "3":
                if (organ) setCanBeContinued(true);
                else setCanBeContinued(false);
                break;
            default:
                break;
        }
    }, [step, nickName, gender, organ]);

    return (
        <StepContext.Provider value={{ step, setStep }}>
            <div className="flex flex-col justify-start items-center w-[100%] h-[100%] bg-[#F5F5F5]">
                <OnboardingHeader />
                <div className="flex-1 flex flex-col justify-start items-center w-[100%]">
                    <TextBox text={stepText[step.id]} />
                    {step.id === "1" ? (
                        <NameContext.Provider value={{ nickName, setNickName }}>
                            <OnboardingNameInput />
                        </NameContext.Provider>
                    ) : step.id === "2" ? (
                        <GenderContext.Provider value={{ gender, setGender }}>
                            <OnboardingGenderInput />
                        </GenderContext.Provider>
                    ) : (
                        <OrganContext.Provider value={{ organ, setOrgan }}>
                            <OnboardingOranizationInput />
                        </OrganContext.Provider>
                    )}

                    <ContinueButton
                        canBeContinued={canBeContinued}
                        nickName={nickName}
                        gender={gender}
                        organ={organ}
                    />
                </div>
            </div>
        </StepContext.Provider>
    );
}
