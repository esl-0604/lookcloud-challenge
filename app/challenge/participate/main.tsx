"use client";

import { useState } from "react";
import ChallengeParticipantImageInput from "./imageinput";
import ChallengeParticipantProductInput from "./productinput";
import ChallengeParticipantTextInput from "./textinput";
import { useRouter } from "next/navigation";
import Backward from "../../../public/svg/backward.svg";

export default function ChallengeParticipantMain() {
    const [lookImage, setLookImage] = useState();
    const [lookDescription, setLookDescription] = useState();
    const [lookProductInfo, setLookProductInfo] = useState();

    return (
        <div className="flex-1 flex flex-col relative justify-start items-center w-[100%] font-textBoxFont">
            <div className="flex relative justify-center items-start w-[100%] h-[124px] py-[8px] overflow-hidden">
                <img
                    src="/image/challenge_thumbnail_1_3.png"
                    alt="challengeImg"
                    className="flex justify-center items-start w-[100%] h-[100%] object-cover"
                />
                <div className="flex flex-col justify-center items-start absolute top-[8px] w-[100%] h-[108px] text-white">
                    <div className="w-[100%] pl-[20px] h-[40px] font-semibold text-[30px]">
                        고연전
                    </div>
                    <div className="flex justify-start items-center w-[100%] pl-[20px] h-[20px] text-[12px]">
                        <div className="flex justify-end items-center w-[23px] h-[100%]">
                            D-1
                        </div>
                        <div className="flex justify-end items-center w-[70px] h-[100%]">
                            37명 참가중
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-start w-[100%] pl-[20px] h-[48px] text-[12px]">
                        <div>
                            고연전을 최대로 즐기기 위해 준비한 오늘의 스타일로
                        </div>
                        <div>고연전 패션왕에 도전하세요!</div>
                    </div>
                </div>
            </div>
            <ChallengeParticipantImageInput />
            <ChallengeParticipantTextInput />
            <ChallengeParticipantProductInput />
            <div className="flex justify-center items-center mt-[20px] w-[310px] h-[50px] rounded-[20.5px] bg-[#344467] text-[24px] font-semibold text-white cursor-pointer">
                완료
            </div>
        </div>
    );
}
