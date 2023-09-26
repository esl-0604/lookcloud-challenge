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
	const [showDetail, setShowDetail] = useState<boolean>(false)

	useEffect(() => {
		challengeDataList.forEach((challenge, i) => {
			if (challengeId === challenge.challengeId) {
				// console.log(challenge)
				setCurrentChallengeData(challenge)
			}
		})
	}, [challengeDataList])

	return (
		<div
			className={`flex flex-col relative justify-start items-center w-[100%] py-[8px] overflow-hidden transition-height duration-500 cursor-pointer ${
				showDetail ? "h-[640px]" : "h-[240px]"
			}`}
			onClick={() => setShowDetail(!showDetail)}
		>
			<div className="absolute w-full">
				<div
					className={`absolute w-full bg-gradient-to-t from-[rgb(0,0,0,0.5)] to-[rgb(217,217,217,0)] h-[350px]`}
				/>
				<img
					src={currentChallengeData?.thumbnailUrl}
					alt="challengeImg"
					className="w-full h-[350px] object-cover"
				/>

				<div className="flex flex-col justify-start items-start w-full px-[4%] py-[10px] text-white">
					챌린지 세부 정보
				</div>
			</div>

			<div
				className={`flex flex-col justify-end items-start absolute bottom-[10px] w-[100%] px-[15px] py-[8px] h-[108px] text-white font-normal transition-bottom duration-500 ${
					showDetail ? "top-[250px]" : "top-[130px]"
				}`}
			>
				<div className="w-[100%] h-[40px] font-semibold text-[30px]">
					{currentChallengeData?.challengeName}
				</div>
				<div className="flex justify-start items-center w-[100%] h-[20px] text-[12px]">
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
						총 상금 100,000원
					</div>
				</div>
				{/* <div className="flex flex-col justify-center items-start w-[100%] h-[48px] text-[12px]">
					{currentChallengeData?.comment}
				</div> */}
			</div>
		</div>
	)
}
