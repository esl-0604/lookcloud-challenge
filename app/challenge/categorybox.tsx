"use client";

import { useEffect } from "react";

interface ChallengeCategoryBoxProps {
    challengeImg: string;
    challengTitle: string;
    challengeComment: string;
    challengeDeadline: string;
    challengeCount: number;
}

export default function ChallengeCategoryBox({
    challengeImg,
    challengTitle,
    challengeComment,
    challengeDeadline,
    challengeCount,
}: ChallengeCategoryBoxProps) {
    const today = new Date();
    const deadline = new Date(challengeDeadline);
    const diffDate = deadline.getTime() - today.getTime();
    const dDay = Math.floor(diffDate / (1000 * 60 * 60 * 24));

    return (
        <div
            className={`flex justify-center items-center relative w-[100%] h-[350px] mb-[24px] ${
                dDay ? "cursor-pointer" : null
            }`}
        >
            <img
                src={challengeImg}
                alt="challengeImg"
                className="flex justify-center items-center w-[100%] h-[100%] object-cover"
            />
            <div className="flex flex-col justify-center items-start absolute bottom-[4px] w-[100%] h-[106px] text-white font-normal">
                <div className="w-[100%] px-[12px] h-[40px] font-semibold text-[30px]">
                    {challengTitle}
                </div>
                <div className="flex justify-start items-center w-[100%] px-[12px] h-[20px] text-[12px]">
                    {dDay ? (
                        <>
                            <div className="flex justify-end items-center w-[23px] h-[100%]">
                                D-{dDay}
                            </div>
                            <div className="flex justify-end items-center w-[70px] h-[100%]">
                                {challengeCount}명 참가중
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-start items-center w-[100%] h-[100%] font-textBoxFont2">
                            comming soon
                        </div>
                    )}
                </div>
                <div className="flex justify-start items-center w-[100%] h-[36px] px-[12px] text-[12px]">
                    <div>{challengeComment}</div>
                </div>
            </div>
        </div>
    );
}
