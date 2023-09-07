"use client";

import LocalStorage from "@/app/localstorage";
import Profile from "../../../public/svg/profile.svg";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Backward from "../../../public/svg/backward.svg";
import InstagramLoginButton from "@/app/instagramloginbutton";

interface ProfileType {
    nickname: string;
    instagram: string | null;
    gender: string;
    organ: string;
}
export default function ChallengeProfileMain() {
    const router = useRouter();
    const param = useSearchParams();
    const instagramCode = param.get("code");
    const userID = LocalStorage.getItem("lookCloud-user-Id");
    const [profileData, setProfileData] = useState<ProfileType>({
        nickname: "",
        instagram: null,
        gender: "",
        organ: "",
    });
    const GoBackward = () => {
        router.back();
    };
    const RequestUserIDAPIcall = async (userId: string) => {
        const REQUEST_USER_ID_URL =
            "https://external-api.stage.lookcloud.co/users/" +
            userId +
            "/instagram";
        await fetch(REQUEST_USER_ID_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code: instagramCode,
            }),
        })
            .then((res) => res.json())
            .then(({ status, message, data }) => {
                if (status === 200) {
                    console.log(data);
                    if (data["instagramUserName"]) {
                        GetUserInfoAPIcall(userId);
                        router.push("/challenge/profile");
                    } else {
                        console.log("인스타그램 ID 정보를 가져올 수 없습니다.");
                    }
                } else {
                    console.log(message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const GetUserInfoAPIcall = async (userId: string) => {
        const GET_USER_INFO_URL =
            "https://external-api.stage.lookcloud.co/users/" + userId;
        await fetch(GET_USER_INFO_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(({ status, message, data }) => {
                if (status === 200) {
                    console.log(data);
                    let newProfileData = { ...profileData };
                    newProfileData.nickname = '"' + data["nickName"] + '"님';
                    newProfileData.gender =
                        data["gender"] === "MALE" ? "남성" : "여성";
                    newProfileData.organ = data["organization"];
                    if (data["instagram"] && data["instagram"]["userName"]) {
                        newProfileData.instagram =
                            "@" + data["instagram"]["userName"];
                    }
                    setProfileData(newProfileData);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (userID) {
            if (instagramCode) {
                RequestUserIDAPIcall(userID);
            }
            GetUserInfoAPIcall(userID);
        }
    }, []);

    return (
        <div className="flex-1 flex flex-col relative justify-start items-center w-[100%] text-black">
            <div
                className="absolute top-[74px] right-[15px]"
                onClick={GoBackward}
            >
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
                {profileData.instagram ? (
                    <div className="flex justify-start items-center w-[100%] px-[5px] h-[40px] text-[24px]">
                        {profileData.instagram}
                    </div>
                ) : (
                    <div className="flex justify-start items-center w-[100%] px-[5px] h-[40px] text-[12px] text-[#6D6D6D] pt-[17px] pb-[3px]">
                        instagram 계정 연결이 되어있지 않습니다.
                    </div>
                )}
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
            {profileData.instagram ? null : (
                <div className="flex justify-center items-center w-[100%] my-[30px]">
                    <InstagramLoginButton />
                </div>
            )}
        </div>
    );
}
