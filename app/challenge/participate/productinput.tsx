"use client";

import ChallengeParticipantProductInfoBox from "./productinfobox";
import Add from "../../../public/svg/add.svg";

export default function ChallengeParticipantProductInput() {
    return (
        <div className="flex flex-col justify-between items-center w-[100%] h-[190px] px-[15px] text-white text-[12px] font-textBoxFont">
            <div className="flex justify-start items-center w-[100%] h-[20px] font-semibold">
                제품 정보
            </div>
            <div className="flex flex-col justify-between items-center w-[100%] h-[160px] font-bold">
                <ChallengeParticipantProductInfoBox />
                <ChallengeParticipantProductInfoBox />
                <div className="flex justify-center items-center w-[100%] h-[20px]">
                    <Add />
                    <div className="flex justify-center items-center w-[100px] h-[100%]">
                        다른 제품 추가하기
                    </div>
                </div>
            </div>
        </div>
    );
}
