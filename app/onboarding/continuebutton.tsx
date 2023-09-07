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
            }
        }
    };
    const GetUserInfoAPIcall = async (userId: string) => {
        const GET_USER_INFO_URL =
            "https://external-api.lookcloud.co/users/" + userId;
        await fetch(GET_USER_INFO_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(({ status, message, data }) => {
                if (status === "ILLEGAL_STATE") {
                    LocalStorage.removeItem("lookCloud-user-Id");
                    LocalStorage.removeItem("lookCloud-facebook-Id");
                    router.push("./login");
                } else if (status === 200) {
                    LocalStorage.removeItem("lookCloud-user-Id");
                    LocalStorage.removeItem("lookCloud-facebook-Id");
                    LocalStorage.setItem("lookCloud-user-Id", userId);
                    if (LocalStorage.getItem("lookCloud-user-Id")) {
                        router.push("./challenge");
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const registerUserAPIcall = async () => {
        const facebookID = LocalStorage.getItem("lookCloud-facebook-Id");

        const REGISTER_USER_URL = "https://external-api.lookcloud.co/users";
        await fetch(REGISTER_USER_URL, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                facebookLoginId: Number(facebookID),
                nickName: nickName,
                gender: gender,
                organization: organ,
            }),
        })
            .then((res) => res.json())
            .then(({ status, message, data }) => {
                if (status === 200) {
                    GetUserInfoAPIcall(data.toString());
                } else {
                    console.log(message);
                }
            })
            .catch((error) => {
                console.log(error);
                router.push("./login");
            });
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
