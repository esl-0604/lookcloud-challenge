"use client";

import LocalStorage from "@/app/localstorage";
import Profile from "../../../public/svg/profile.svg";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Backward from "../../../public/svg/backward.svg";

export default function ChallengeProfileMain() {
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
                console.log(data);
                let newProfileData = { ...profileData };
                newProfileData.nickname = '"' + data["nickName"] + '"님';
                newProfileData.instagram = "@" + data["instagram"]["userName"];
                newProfileData.gender =
                    data["gender"] === "MALE" ? "남성" : "여성";
                newProfileData.organ = data["organization"];
                setProfileData(newProfileData);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        const localPersonalCredit = LocalStorage.getItem(
            "lookCloud-userId-data"
        );
        console.log(localPersonalCredit);
        if (localPersonalCredit) {
            const userId = (
                Number(localPersonalCredit) /
                Number(process.env.NEXT_PUBLIC_ENCRYPTION_KEY)
            ).toString();
            console.log(userId);
        }
        GetUserInfoAPIcall("8");
    }, []);
    const [profileData, setProfileData] = useState({
        nickname: "",
        instagram: "",
        gender: "",
        organ: "",
    });

    const router = useRouter();
    const GoBackward = () => {
        router.back();
    };
    return (
        <div className="flex-1 flex flex-col justify-start items-center w-[100%] text-white">
            <div className="fixed top-[74px] right-[15px]" onClick={GoBackward}>
                <Backward />
            </div>
            <div className="mt-[86px]">
                <Profile width={"180"} height={"180"} />
            </div>
            <div className="flex justify-center items-center w-[100%] h-[52px] mt-[30px] text-[24px] font-textBoxFont">
                {profileData.nickname}
            </div>
            <div className="flex flex-col justify-start items-center w-[320px] h-[62px] mb-[10px] border-b-2 border-[#D9D9D9]">
                <div className="flex justify-start items-center w-[100%] px-[5px] h-[20px] text-[12px]">
                    instagram ID
                </div>
                <div className="flex justify-start items-center w-[100%] px-[5px] h-[40px] text-[24px]">
                    {profileData.instagram}
                </div>
            </div>
            <div className="flex flex-col justify-start items-center w-[320px] h-[62px] mb-[10px] border-b-2 border-[#D9D9D9]">
                <div className="flex justify-start items-center w-[100%] px-[5px] h-[20px] text-[12px]">
                    성별
                </div>
                <div className="flex justify-start items-center w-[100%] px-[5px] h-[40px] text-[24px]">
                    {profileData.gender}
                </div>
            </div>
            <div className="flex flex-col justify-start items-center w-[320px] h-[62px] mb-[10px] border-b-2 border-[#D9D9D9]">
                <div className="flex justify-start items-center w-[100%] px-[5px] h-[20px] text-[12px]">
                    학교
                </div>
                <div className="flex justify-start items-center w-[100%] px-[5px] h-[40px] text-[24px]">
                    {profileData.organ}
                </div>
            </div>
        </div>
    );
}
