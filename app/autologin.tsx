"use client";

import { useRouter, useSearchParams } from "next/navigation";
import TitleIcon from "../public/svg/LookCloudTitle.svg";
import { useEffect } from "react";

export default function AutoLogin() {
    // User Scenario
    // 최초 접근 : ./ --> ./login --> ./?code --> ./onboarding --> ./challenge
    // 일반 접근 (자동 로그인) : ./ --> ./challenge
    // 일반 접근 (수동 로그인) : ./ --> ./login --> ./?code --> ./challenge

    // Case (./)
    // url에 code가 없으면 --> 로컬 스토리지 userId 조회
    //  없으면 --> ./login
    //  있으면 --> {GET/users/:userId} api 요청
    //      status: '404 Not Found' --> ./login
    //      status: 'Ok' --> ./challenge

    // Case (./?code)
    // url에 code가 있으면 --> {POST/users/login} api 요청
    //  registerStatus === 'NOT_REGISTERED' ? instagramId 수령 --> 로컬 스토리지 instagramId 저장 --> ./onboarding
    //  registerStatus === 'REGISTERED' ? userId 수령 --> 로컬 스토리지 userId 저장 --> ./challenge

    const router = useRouter();
    const param = useSearchParams();
    const code = param.get("code");

    const RequestUserIDAPIcall = async () => {
        const REQUEST_USER_ID_URL =
            "https://external-api.lookcloud.co/users/login";
        await fetch(REQUEST_USER_ID_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code: code,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data["registerStatus"] === "NOT_REGISTERED") {
                    localStorage.setItem(
                        "lookCloud-instagram-data",
                        JSON.stringify(data["instagram"])
                    );
                    if (localStorage.getItem("lookCloud-instagram-data")) {
                        router.push("./onboarding");
                    }
                } else if (data["registerStatus"] === "REGISTERED") {
                    localStorage.setItem(
                        "lookCloud-userId-data",
                        data["userId"].toString()
                    );
                    router.push("./challenge");
                }
            });
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
            .then((data) => {
                console.log(data);
                router.push("./challenge");
            })
            .catch((error) => {
                router.push("./login");
            });
    };

    if (code) {
        // case : ./?code
        console.log(code);
        // RequestUserIDAPIcall();

        // 라우팅 예시 코드
        useEffect(() => {
            setTimeout(() => {
                router.push("./onboarding");
            }, 500);
        }, []);

        return (
            <main className="flex flex-col justify-center items-center w-[100%] h-[100%] bg-white">
                <TitleIcon width={"310"} height={"47"} color={"black"} />
            </main>
        );
    } else {
        // case : ./
        const userId = localStorage.getItem("lookCloud-userId-data");
        if (userId) {
            // GetUserInfoAPIcall(userId);
        } else router.push("./login");

        // 라우팅 예시 코드
        useEffect(() => {
            setTimeout(() => {
                router.push("./login");
            }, 500);
        }, []);

        return (
            <main className="flex flex-col justify-center items-center w-[100%] h-[100%] bg-black">
                <TitleIcon width={"310"} height={"47"} color={"white"} />
            </main>
        );
    }
}
