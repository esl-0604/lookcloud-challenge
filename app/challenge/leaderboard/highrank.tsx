"use client";

import { useEffect, useState, useContext } from "react";
import { ChallengeDataContext } from "./main";

export default function HighRank() {
    const { challengeData } = useContext(ChallengeDataContext);
    const [lankingList, setLankingList] = useState(
        Array.from({ length: 3 }, () => ({
            nickName: "참가자",
            instagramUserName: "",
            organization: "고려대학교",
            lScore: 0,
        }))
    );

    useEffect(() => {
        if (challengeData) {
            // console.log(challengeData.participants.users);
            const templankingList = challengeData.participants.users;
            const arr2 = Array.from({ length: 3 - lankingList.length }, () => ({
                nickName: "참가자",
                instagramUserName: "",
                organization: "고려대학교",
                lScore: 0,
            }));
            const finalLankingList = templankingList.concat(arr2);
            console.log(finalLankingList);
            setLankingList(finalLankingList);
        }
    }, [challengeData]);

    return (
        <div className="flex flex-row items-end w-[100%] h-[227px]">
            <div className="flex flex-col items-center w-1/3">
                <div className="flex flex-col items-center absolute z-10 transform -translate-y-1/2">
                    <img
                        src="/svg/sampleProfileImg.svg"
                        width="70px"
                        height="70px rounded-full"
                    />
                    <img
                        className="absolute z-20 transform translate-y-[60px]"
                        src={
                            lankingList[1]?.organization === "고려대학교"
                                ? "/svg/KU.svg"
                                : lankingList[1]?.organization === "연세대학교"
                                ? "/svg/YU.svg"
                                : "/svg/KU.svg"
                        }
                        width="20px"
                    />
                </div>
                <div className="flex flex-col items-center pt-[45px] h-[140px] w-[100%] bg-gradient-to-b from-[#1C3A74] to-[#0C1A34] rounded-t-[10px] rounded-l-[10px]">
                    <span className="text-[24px] leading-[36px]">
                        {lankingList[1]?.lScore ? lankingList[1]?.lScore : 0}
                    </span>
                    <span className="text-[12px]">
                        {lankingList[1]?.nickName}
                    </span>
                    <span className="text-[12px]">
                        @{lankingList[1]?.instagramUserName}
                    </span>
                </div>
            </div>
            <div className="flex flex-col items-center w-1/3">
                <div className="flex flex-col items-center absolute z-10 transform -translate-y-1/2">
                    <img
                        src="/svg/sampleProfileImg.svg"
                        width="90px"
                        height="90px rounded-full"
                    />
                    <img
                        className="absolute z-20 transform translate-y-[78px]"
                        src={
                            lankingList[0]?.organization === "고려대학교"
                                ? "/svg/KU.svg"
                                : lankingList[0]?.organization === "연세대학교"
                                ? "/svg/YU.svg"
                                : "/svg/KU.svg"
                        }
                        width="23px"
                    />
                </div>
                <div className="flex flex-col items-center pt-[56px] h-[180px] w-[100%] bg-gradient-to-b from-[#154FBE] to-[#0F0D76] rounded-t-[10px]">
                    <span className="text-[24px] leading-[36px]">
                        {lankingList[0]?.lScore ? lankingList[0]?.lScore : 0}
                    </span>
                    <span className="text-[12px]">
                        {lankingList[0]?.nickName}
                    </span>
                    <span className="text-[12px]">
                        @{lankingList[0]?.instagramUserName}
                    </span>
                </div>
            </div>
            <div className="flex flex-col items-center w-1/3">
                <div className="flex flex-col items-center absolute z-10 transform -translate-y-1/2">
                    <img
                        src="/svg/sampleProfileImg.svg"
                        width="50px"
                        height="50px rounded-full"
                    />
                    <img
                        className="absolute z-20 transform translate-y-[45px]"
                        src={
                            lankingList[2]?.organization === "고려대학교"
                                ? "/svg/KU.svg"
                                : lankingList[2]?.organization === "연세대학교"
                                ? "/svg/YU.svg"
                                : "/svg/KU.svg"
                        }
                        width="10px"
                    />
                </div>
                <div className="flex flex-col items-center pt-[25px] h-[100px] w-[100%] bg-gradient-to-b from-[#1C3A74] to-[#0C1A34] rounded-t-[10px] rounded-r-[10px]">
                    <span className="text-[24px] leading-[36px]">
                        {lankingList[2]?.lScore ? lankingList[2]?.lScore : 0}
                    </span>
                    <span className="text-[12px]">
                        {lankingList[2]?.nickName}
                    </span>
                    <span className="text-[12px]">
                        @{lankingList[2]?.instagramUserName}
                    </span>
                </div>
            </div>
        </div>
    );
}
