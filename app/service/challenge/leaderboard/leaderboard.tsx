"use client"

import { useEffect, useState } from "react"
import HighRank from "./highrank"
import RankRow from "./rankrow"
import { useSearchParams } from "next/navigation"
import {
	challengeParticipantsInfo,
	challengeParticipantsType,
	challengeRankerType,
} from "@/app/utils/atoms/serviceGlobalState"
import { useRecoilState } from "recoil"

export default function LeaderBoard() {
	const param = useSearchParams()
	const challengeId = Number(param.get("id"))

	// const [updateTime, setUpdateTime] = useState<number>(0)

	const [challengeParticipantsData, setChallengeParticipantsData] =
		useRecoilState<challengeParticipantsType>(challengeParticipantsInfo)

	// useEffect(() => {
	// 	if (challengeParticipantsData[challengeId]) {
	// 		// 업데이트 시간 계산 ---------------------------------------------
	// 		const now = new Date()
	// 		const diffInMilliseconds = Math.abs(
	// 			new Date().getTime() -
	// 				challengeParticipantsData[challengeId].updateTime.getTime(),
	// 		)
	// 		const minutes = Math.ceil(diffInMilliseconds / (1000 * 60))
	// 		setUpdateTime(minutes)
	// 		// ------------------------------------------------------------
	// 	}
	// }, [challengeParticipantsData])

	return (
		<div className="flex flex-col justify-center items-center w-full h-full px-[4%]">
			<HighRank />
			{challengeParticipantsData[challengeId]?.users.map((ranker, i) => {
				if (ranker?.ranking > 3 && ranker?.ranking <= 10) {
					return <RankRow key={i} ranker={ranker} />
				}
			})}
			{/* <span className="w-[100%] text-[#00F0FF] text-left text-[8px] leading-[12px]">
				{updateTime}분전 업데이트
			</span> */}
		</div>
	)
}
