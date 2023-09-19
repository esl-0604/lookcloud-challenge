"use client"

import {
	challengeParticipantsInfo,
	challengeParticipantsType,
} from "@/app/utils/atoms/serviceGlobalState"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, useContext } from "react"
import { useRecoilState } from "recoil"

export default function HighRank() {
	const param = useSearchParams()
	const challengeId = Number(param.get("id"))

	const [challengeParticipantsData, setChallengeParticipantsData] =
		useRecoilState<challengeParticipantsType>(challengeParticipantsInfo)

	const ranker3 = challengeParticipantsData[challengeId]?.users.find(
		(ranker) => {
			if (ranker.ranking === 3) return true
		},
	)
	const ranker2 = challengeParticipantsData[challengeId]?.users.find(
		(ranker) => {
			if (ranker.ranking === 2) return true
		},
	)
	const ranker1 = challengeParticipantsData[challengeId]?.users.find(
		(ranker) => {
			if (ranker.ranking === 1) return true
		},
	)

	return (
		<div className="flex flex-row items-end w-[100%] h-[227px]">
			<div className="flex flex-col items-center w-1/3">
				<div className="flex flex-col items-center absolute z-10 transform -translate-y-1/2">
					<img
						src="/svg/sampleProfileImg.svg"
						width="70px"
						height="70px rounded-full"
					/>
					{/* <img
						className="absolute z-20 transform translate-y-[60px]"
						src={}
						width="20px"
					/> */}
				</div>
				<div className="flex flex-col items-center pt-[45px] h-[140px] w-[100%] bg-gradient-to-b from-[#1C3A74] to-[#0C1A34] rounded-t-[10px] rounded-l-[10px]">
					<span className="text-[24px] leading-[36px]">
						{ranker3 ? ranker3?.lScore : 0}
					</span>
					<span className="text-[12px]">{ranker3?.nickName}</span>
					<span className="text-[12px]">
						{ranker3 ? "@" + ranker3?.instagramUserName : ""}
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
					{/* <img
						className="absolute z-20 transform translate-y-[78px]"
						src={
							lankingList[0]?.organization === "고려대학교"
								? "/svg/KU.svg"
								: lankingList[0]?.organization === "연세대학교"
								? "/svg/YU.svg"
								: "/svg/KU.svg"
						}
						width="23px"
					/> */}
				</div>
				<div className="flex flex-col items-center pt-[56px] h-[180px] w-[100%] bg-gradient-to-b from-[#154FBE] to-[#0F0D76] rounded-t-[10px]">
					<span className="text-[24px] leading-[36px]">
						{ranker1 ? ranker1?.lScore : 0}
					</span>
					<span className="text-[12px]">{ranker1?.nickName}</span>
					<span className="text-[12px]">
						{ranker1 ? "@" + ranker1?.instagramUserName : ""}
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
					{/* <img
						className="absolute z-20 transform translate-y-[45px]"
						src={
							lankingList[2]?.organization === "고려대학교"
								? "/svg/KU.svg"
								: lankingList[2]?.organization === "연세대학교"
								? "/svg/YU.svg"
								: "/svg/KU.svg"
						}
						width="10px"
					/> */}
				</div>
				<div className="flex flex-col items-center pt-[25px] h-[100px] w-[100%] bg-gradient-to-b from-[#1C3A74] to-[#0C1A34] rounded-t-[10px] rounded-r-[10px]">
					<span className="text-[24px] leading-[36px]">
						{ranker2 ? ranker2?.lScore : 0}
					</span>
					<span className="text-[12px]">{ranker2?.nickName}</span>
					<span className="text-[12px]">
						{ranker2 ? "@" + ranker2?.instagramUserName : ""}
					</span>
				</div>
			</div>
		</div>
	)
}
