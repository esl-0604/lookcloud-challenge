"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import {
	challengeInfoList,
	challengeInfoType,
	challengeParticipantsInfo,
	challengeParticipantsType,
} from "@/app/utils/atoms/serviceGlobalState"
import { useRecoilState } from "recoil"

export default function LeaderBoardThumbnail() {
	const param = useSearchParams()
	const challengeId = param.get("id") ? Number(param.get("id")) : -1

	const [challengeDataList, setChallengeDataList] =
		useRecoilState<challengeInfoType[]>(challengeInfoList)

	const [currentChallengeData, setCurrentChallengeData] =
		useState<challengeInfoType>({
			challengeId: 0,
			challengeName: "",
			startedAt: null,
			endedAt: null,
			state: -2,
			thumbnailUrl: "",
			middleThumbnailUrl: "",
			smallThumbnailUrl: "",
			comment: "",
			totalCount: 0,
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
		<div className="flex relative justify-center items-start w-[100%] h-[240px] py-[8px] overflow-hidden">
			<img
				src={currentChallengeData?.middleThumbnailUrl}
				alt="challengeImg"
				className="flex justify-center items-start w-[100%] h-[100%] object-cover"
			/>
			<div className="flex flex-col justify-center items-start absolute bottom-[10px] w-[100%] px-[15px] h-[108px] text-white font-normal">
				<div className="w-[100%] h-[40px] font-semibold text-[30px]">
					{currentChallengeData?.challengeName}
				</div>
				<div className="flex justify-start items-center w-[100%] h-[20px] text-[12px]">
					<div className="flex justify-end items-center h-[100%]">
						D-
						{currentChallengeData?.state === 0
							? "Day"
							: currentChallengeData?.state}
					</div>
					<div className="flex justify-end items-center w-[70px] h-[100%]">
						{currentChallengeData?.totalCount}명 참가중
					</div>
				</div>
				<div className="flex flex-col justify-center items-start w-[100%] h-[48px] text-[12px]">
					{currentChallengeData?.comment}
				</div>
			</div>
		</div>
	)
}
