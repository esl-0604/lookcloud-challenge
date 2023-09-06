"use client";

import Clothes from "../../../public/svg/clothes.svg";

export default function ChallengeParticipantProductInfoBox() {
    return (
        <div className="flex justify-start items-center w-[100%] h-[60px] rounded-[10px] bg-[#D9D9D9] text-black text-[12px] font-textBoxFont">
            <div className="flex flex-col justify-between items-center w-[60px] h-[100%] pt-[10px] pb-[5px]">
                <Clothes />
                <div className="flex justify-center items-center h-[15px]">
                    상의
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center h-[100%] bg-white">
                <input
                    type="text"
                    placeholder="브랜드"
                    className="w-[calc(100%-38px)] mx-[19px] h-[29px] focus: outline-none placeholder-[#959595]"
                />
                <div className="w-[calc(100%-8px)] h-[2px] bg-[#D9D9D9]" />
                <input
                    type="text"
                    placeholder="제품명"
                    className=" w-[calc(100%-38px)] mx-[19px] h-[29px] focus: outline-none placeholder-[#959595]"
                />
            </div>
        </div>
    );
}
