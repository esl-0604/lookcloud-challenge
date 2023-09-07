"use client";

import { useRouter } from "next/navigation";
import TitleIcon from "../public/svg/LookCloudTitle.svg";
import { useEffect } from "react";
import LocalStorage from "./localstorage";

export default function AutoLogin2() {
    const router = useRouter();
    const userID = LocalStorage.getItem("lookCloud-user-Id");
    useEffect(() => {
        if (userID) GetUserInfoAPIcall(userID);
        else {
            LocalStorage.removeItem("lookCloud-user-Id");
            LocalStorage.removeItem("lookCloud-facebook-Id");
            router.push("./login");
        }
    }, []);

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
                    router.push("./challenge");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <main className="flex flex-col justify-center items-center w-[100%] h-[100%] bg-black">
            <TitleIcon width={"310"} height={"47"} color={"white"} />
        </main>
    );
}
