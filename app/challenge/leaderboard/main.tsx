"use client";

import Link from "next/link";
import LeaderBoard from "../../../public/svg/leaderboard.svg";
import { useRouter } from "next/navigation";
import Backward from "../../../public/svg/backward.svg";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChallengeLeaderBoardMain() {
    const param = useSearchParams();
    const id = param.get("id");
    console.log(id);
    useEffect(() => {
        const GET_CHALLENGES_URL =
            "https://external-api.lookcloud.co/challenges/0";
        fetch(GET_CHALLENGES_URL, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(({ status, message, data }) => {
                console.log(data);
                setChallengeData(data);
            })
            .catch((error) => console.log(error));
    }, []);
    const [challengeData, setChallengeData] = useState({
        name: "고연전",
        participants: {
            count: 2,
            users: [],
        },
    });

    const today = new Date();
    const deadline = new Date("2023-09-09");
    const diffDate = deadline.getTime() - today.getTime();
    const dDay = Math.floor(diffDate / (1000 * 60 * 60 * 24));

    const router = useRouter();
    const GoBackward = () => {
        router.back();
    };
    return (
        <div className="flex-1 flex flex-col justify-start items-center w-[100%] text-white">
            <div
                className="fixed top-[74px] right-[15px] z-10"
                onClick={GoBackward}
            >
                <Backward />
            </div>
            <div className="flex relative justify-center items-start w-[100%] h-[240px] py-[8px] overflow-hidden">
                <img
                    src="/image/challenge_thumbnail_1_2.png"
                    alt="challengeImg"
                    className="flex justify-center items-start w-[100%] h-[100%] object-cover"
                />
                <div className="flex flex-col justify-center items-start absolute bottom-[10px] w-[100%] px-[15px] h-[108px] text-white font-normal">
                    <div className="w-[100%] h-[40px] font-semibold text-[30px]">
                        {challengeData.name}
                    </div>
                    <div className="flex justify-start items-center w-[100%] h-[20px] text-[12px]">
                        <div className="flex justify-end items-center w-[23px] h-[100%]">
                            D-{dDay}
                        </div>
                        <div className="flex justify-end items-center w-[70px] h-[100%]">
                            {challengeData.participants.count}명 참가중
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-start w-[100%] h-[48px] text-[12px]">
                        <div>
                            고연전을 최대로 즐기기 위해 준비한 오늘의 스타일로
                        </div>
                        <div>고연전 패션왕에 도전하세요!</div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center w-[360px] h-[90px] py-[10px]">
                <Link
                    href={{
                        pathname: "/challenge/participate",
                        query: { id: id },
                    }}
                >
                    <div className="flex justify-center items-center w-[175px] h-[70px] rounded-[20px] border-2 border-white cursor-pointer">
                        등록하기
                    </div>
                </Link>

                <Link
                    href={{
                        pathname: "/challenge/evaluate",
                        query: { id: id },
                    }}
                >
                    <div className="flex justify-center items-center w-[175px] h-[70px] rounded-[20px] border-2 border-white cursor-pointer">
                        평가하기
                    </div>
                </Link>
            </div>
            <div className="flex justify-center items-center w-[100%] mb-[87px]">
                <img
                    src="/image/leader_board.png"
                    alt="leader-board"
                    className="flex justify-center items-start w-[360px] h-[555px] object-cover"
                />
            </div>
        </div>
    );
}
