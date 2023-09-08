"use client";

import LocalStorage from "@/app/localstorage";
import Profile from "../../../public/svg/profile.svg";
import InstagramLoginButton from "@/app/instagramloginbutton";
import { userProfileState } from "../../utils/atoms/userprofile";
import { useRecoilState, useRecoilValue } from "recoil";

interface ProfileType {
    nickname: string;
    instagram: string | null;
    gender: string;
    organ: string;
}
export default function ChallengeProfileMain() {
    const [profileData, setProfileData] = useRecoilState<any>(userProfileState);
    // console.log(profileData);

    return (
        <div className="flex-1 flex flex-col justify-start items-center w-[100%] text-black">
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
