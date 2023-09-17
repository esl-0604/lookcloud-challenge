"use client"

import ChallengeHeader from "../header"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import LeaderBoard from "./leaderboard"
import {
	challengeInfoList,
	challengeInfoType,
} from "@/app/utils/atoms/serviceGlobalState"
import { useRecoilState } from "recoil"

export default function ChallengeLeaderBoard() {
	const param = useSearchParams()
	const challengeId = Number(param.get("id"))

	const [challengeDataList, setChallengeDataList] =
		useRecoilState<challengeInfoType[]>(challengeInfoList)

	const [currentChallengeData, setCurrentChallengeData] =
		useState<challengeInfoType>({
			challengeId: null,
			challengeName: "",
			startDate: null,
			endDate: null,
			state: -2,
			thumbnail: "",
			comment: "",
			participantsNum: 0,
		})

	useEffect(() => {
		challengeDataList.forEach((challenge, i) => {
			if (challengeId === challenge.challengeId) {
				// console.log(challenge)
				setCurrentChallengeData(challenge)
			}
		})
	}, [challengeDataList])

	return (
		<main className="flex flex-col justify-start items-center absolute w-[100%] min-h-[100%]">
			<ChallengeHeader />
			<div className="flex-1 flex flex-col relative justify-start items-center w-[100%] text-white bg-black">
				<div className="flex relative justify-center items-start w-[100%] h-[240px] py-[8px] overflow-hidden">
					<img
						src={currentChallengeData.thumbnail}
						alt="challengeImg"
						className="flex justify-center items-start w-[100%] h-[100%] object-cover"
					/>
					<div className="flex flex-col justify-center items-start absolute bottom-[10px] w-[100%] px-[15px] h-[108px] text-white font-normal">
						<div className="w-[100%] h-[40px] font-semibold text-[30px]">
							{currentChallengeData.challengeName}
						</div>
						<div className="flex justify-start items-center w-[100%] h-[20px] text-[12px]">
							<div className="flex justify-end items-center h-[100%]">
								D-
								{currentChallengeData.state === 0
									? "Day"
									: currentChallengeData.state}
							</div>
							<div className="flex justify-end items-center w-[70px] h-[100%]">
								{currentChallengeData.participantsNum}명 참가중
							</div>
						</div>
						<div className="flex flex-col justify-center items-start w-[100%] h-[48px] text-[12px]">
							<div>{currentChallengeData.comment}</div>
						</div>
					</div>
				</div>

				<div className="flex justify-between items-center w-[340px] h-[90px] py-[10px]">
					<Link
						href={{
							pathname: "/service/challenge/participate",
							query: { id: challengeId },
						}}
					>
						<div className="flex justify-center items-center w-[165px] h-[70px] rounded-[20px] border-2 border-white cursor-pointer">
							등록하기
						</div>
					</Link>

					<Link
						href={{
							pathname: "/service/challenge/evaluate",
							query: { id: challengeId },
						}}
					>
						<div className="flex justify-center items-center w-[165px] h-[70px] rounded-[20px] border-2 border-white cursor-pointer">
							평가하기
						</div>
					</Link>
				</div>
				<div className="flex justify-center items-center w-[100%] mb-[87px]">
					<LeaderBoard />
				</div>
			</div>
		</main>
	)
}
