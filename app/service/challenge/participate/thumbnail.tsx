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

export default function ParticipateThumbnail() {
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
		<>
			<div className="flex relative justify-center items-start w-full h-[124px] py-[8px] overflow-hidden">
				<div className="absolute top-0 bottom-0 w-full bg-gradient-to-t from-[rgb(0,0,0,0.5)] to-[rgb(217,217,217,0)]" />
				<img
					src={currentChallengeData?.thumbnailUrl}
					alt="challengeImg"
					className="flex justify-center items-start w-[100%] h-[100%] object-cover"
				/>
				<div className="flex flex-col justify-end items-start absolute top-[8px] w-[100%] h-[108px] py-[8px] text-white">
					<div className="w-[100%] pl-[20px] h-[40px] font-semibold text-[30px]">
						{currentChallengeData?.challengeName}
					</div>
					<div className="flex justify-start items-center w-[100%] pl-[20px] h-[20px] text-[12px]">
						{/* <div className="flex justify-end items-center h-[100%]">
							D-
							{currentChallengeData?.state === 0
								? "Day"
								: currentChallengeData?.state}
						</div> */}
						<div className="flex justify-start items-center w-[70px] pl-[5px] h-[100%]">
							{currentChallengeData?.totalCount}명 참가중
						</div>
						<div className="flex justify-end items-center w-[110px] h-[100%]">
							{currentChallengeData.challengeName === "페스티벌 룩"
								? "총 상금 180,000원"
								: "총 상금 100,000원"}
						</div>
					</div>
					{/* <div className="flex flex-col justify-center items-start w-[100%] pl-[20px] h-[48px] text-[12px]">
					{currentChallengeData?.comment}
				</div> */}
				</div>
			</div>
		</>
	)
}
