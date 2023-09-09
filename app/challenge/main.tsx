"use client";

import ChallengeCategoryBox from "./categorybox";
import CommingSoon from "../../public/svg/commingsoon.svg";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import LocalStorage from "../localstorage";
import { userProfileState } from "../utils/atoms/userprofile";
import { useRecoilState, useRecoilValue } from "recoil";

export default function ChallengeMain() {
    //----------------------------------------------------------------------------
    useEffect(() => {
        const GET_CHALLENGES_URL =
            "https://external-api.stage.lookcloud.co/challenges/0";
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
                let newChallengeList = [...challengeList];
                newChallengeList[0].challengeCount =
                    data["participants"]["count"];
                setChallengeList(newChallengeList);
            })
            .catch((error) => console.log(error));
    }, []);
    const [challengeList, setChallengeList] = useState([
        {
            challengeImg: "/image/challenge_thumbnail_1_1.png",
            challengTitle: "고연전",
            challengeComment:
                "고연전을 최대로 즐기기 위해 준비한 오늘의 스타일로 고연전 패션왕에 도전하세요!",
            challengeDeadline: "2023-09-10",
            challengeCount: 0,
        },
        {
            challengeImg: "/image/challenge_thumbnail_2_1.png",
            challengTitle: "소개팅",
            challengeComment:
                "소개팅에서 가장 좋은 첫 인상을 남길 수 있는 스타일을 보여주세요!",
            challengeDeadline: "0000-00-00",
            challengeCount: 0,
        },
    ]);

    return (
        <div className="flex-1 flex flex-col justify-start items-center w-[100%] px-[20px] text-white">
            <div className="flex flex-col justify-center items-start w-[100%] h-[64px] text-[12px] font-textBoxFont leading-[20px] font-normal">
                <span>
                    나만의 스타일링을 선보일 수 있는 다양한 챌린지에
                    참여해보세요!
                </span>
                <span>
                    챌린지 기한 종료시 결과를 통해 지급되는 보상을 받아보세요!
                </span>
            </div>
            <div className="flex flex-col justify-between items-center w-[100%]">
                {challengeList.map((challenge, i) => {
                    return (
                        <Link
                            key={i}
                            className={`${
                                i !== 0 ? "pointer-events-none" : null
                            }`}
                            href={{
                                pathname: "/challenge/leaderboard",
                                query: { id: i },
                            }}
                        >
                            <ChallengeCategoryBox
                                challengeImg={challenge.challengeImg}
                                challengTitle={challenge.challengTitle}
                                challengeComment={challenge.challengeComment}
                                challengeDeadline={challenge.challengeDeadline}
                                challengeCount={challenge.challengeCount}
                            />
                        </Link>
                    );
                })}
            </div>
            <div className="flex justify-center items-center w-[100%] mt-[6px] mb-[50px]">
                <CommingSoon />
            </div>
        </div>
    );
}
