"use client";

import { useContext, useEffect } from "react";
import { GenderType, OrganType, StepContext } from "./main";
import { useSearchParams } from "next/navigation";

interface ContinueButtonProps {
    canBeContinued: boolean;
    nickName: string;
    gender: GenderType | null;
    organ: OrganType | null;
}

export default function ContinueButton({
    canBeContinued,
    nickName,
    gender,
    organ,
}: ContinueButtonProps) {
    const { step, setStep }: any = useContext(StepContext);
    const param = useSearchParams();
    const id = param.get("id");

    const StepForward = () => {
        if (canBeContinued) {
            const stepNum = Number(step.id);
            if (stepNum < 3) setStep({ id: (stepNum + 1).toString() });
            else if (stepNum === 3) {
                console.log({
                    닉네임: nickName,
                    성별: gender,
                    소속: organ,
                });
                // 유저 정보 저장 api call
                registerUserAPIcall();
            }
        }
    };
    const registerUserAPIcall = async () => {
        const REGISTER_USER_URL = "http://3.35.90.153/users";
        await fetch(REGISTER_USER_URL, {
            method: "POST",
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                instagramLoginId: id,
                nickName: nickName,
                gender: gender,
                organization: organ,
            }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };
    return (
        <div className="flex justify-center items-center w-[100%] py-[16px] ">
            <div
                className={`flex justify-center items-center w-[310px] h-[40px] rounded-[20.5px] text-white text-[12px] font-textBoxFont  ${
                    canBeContinued
                        ? "bg-[#344467] cursor-pointer"
                        : "bg-[#D9D9D9]"
                }`}
                onClick={StepForward}
            >
                {step.id === "3" ? "DONE" : "CONTINUE"}
            </div>
        </div>
    );
}
