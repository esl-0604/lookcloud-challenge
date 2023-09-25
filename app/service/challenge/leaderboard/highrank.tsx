"use client"

import Spinner from "@/public/svg/spinner.svg"
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
				<div className="flex flex-col w-[70px] h-[70px] items-center absolute z-10 transform -translate-y-1/2 rounded-full overflow-hidden border-[4px] border-[#A3A3A3]">
					<img
						src={ranker2 ? ranker2.imageUrl : "/svg/profile.svg"}
						className="object-cover"
					/>
				</div>
				<div className="flex flex-col items-center pt-[45px] h-[140px] w-[100%] bg-gradient-to-b from-[#1C3A74] to-[#0C1A34] rounded-t-[10px] rounded-l-[10px]">
					{ranker2 ? (
						<>
							<span className="text-[24px] leading-[36px]">
								{ranker2.lScore}
							</span>
							<span className="text-[12px]">{ranker2.nickName}</span>
							<span className="text-[12px]">
								{ranker2.instagramUserName
									? "@" + ranker2.instagramUserName
									: ""}
							</span>
						</>
					) : (
						<Spinner />
					)}
				</div>
			</div>

			<div className="flex flex-col items-center w-1/3">
				<div className="flex flex-col w-[90px] h-[90px] items-center absolute z-10 transform -translate-y-1/2 rounded-full overflow-hidden border-[4px] border-[#FFBB5C]">
					<img
						src={ranker1 ? ranker1.imageUrl : "/svg/profile.svg"}
						className="object-cover"
					/>
				</div>
				<div className="flex flex-col items-center pt-[56px] h-[180px] w-[100%] bg-gradient-to-b from-[#154FBE] to-[#0F0D76] rounded-t-[10px]">
					{ranker1 ? (
						<>
							<span className="text-[24px] leading-[36px]">
								{ranker1.lScore}
							</span>
							<span className="text-[12px]">{ranker1.nickName}</span>
							<span className="text-[12px]">
								{ranker1.instagramUserName
									? "@" + ranker1.instagramUserName
									: ""}
							</span>
						</>
					) : (
						<Spinner />
					)}
				</div>
			</div>

			<div className="flex flex-col items-center w-1/3">
				<div className="flex flex-col items-center w-[50px] h-[50px] absolute z-10 transform -translate-y-1/2 rounded-full overflow-hidden border-[3px] border-[#CD7F32]">
					<img
						src={ranker3 ? ranker3.imageUrl : "/svg/profile.svg"}
						className="object-cover"
					/>
				</div>
				<div className="flex flex-col items-center pt-[25px] h-[100px] w-[100%] bg-gradient-to-b from-[#1C3A74] to-[#0C1A34] rounded-t-[10px] rounded-r-[10px]">
					{ranker3 ? (
						<>
							<span className="text-[24px] leading-[36px]">
								{ranker3.lScore}
							</span>
							<span className="text-[12px]">{ranker3.nickName}</span>
							<span className="text-[12px]">
								{ranker3.instagramUserName
									? "@" + ranker3.instagramUserName
									: ""}
							</span>
						</>
					) : (
						<Spinner />
					)}
				</div>
			</div>
		</div>
	)
}
