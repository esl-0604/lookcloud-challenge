"use client";

import { useContext, useEffect } from "react";
import { GenderType, OrganType, StepContext } from "./main";
import { useRouter, useSearchParams } from "next/navigation";
import LocalStorage from "../localstorage";

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
    const router = useRouter();

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
                // 유저 정보 저장 성공 시, 로컬 스토리지에서 instagramId 제거

                // // 라우팅 예시 코드 (나중에 제거) ----------------
                // router.push("./challenge");
                // // ----------------------------------------
            }
        }
    };

    const registerUserAPIcall = async () => {
        const instagramDataJson = LocalStorage.getItem(
            "lookCloud-instagram-data"
        );
        const instagramData = JSON.parse(instagramDataJson || "");

        const REGISTER_USER_URL = "https://external-api.lookcloud.co/users";
        await fetch(REGISTER_USER_URL, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                instagramLoginId: instagramData["loginId"],
                nickName: nickName,
                gender: gender,
                organization: organ,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                LocalStorage.setItem("lookCloud-userId-data", data.toString());
                LocalStorage.removeItem("lookCloud-instagram-data");
                if (LocalStorage.getItem("lookCloud-userId-data")) {
                    router.push("./challenge");
                }
            })
            .catch((error) => console.log(error));
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
