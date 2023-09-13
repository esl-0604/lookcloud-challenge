"use client"

import { useContext, useEffect, useState } from "react"
import HighRank from "./highrank"
import RankRow from "./rankrow"
import { ChallengeDataContext } from "./main"

export default function LeaderBoard() {
	const { challengeData } = useContext(ChallengeDataContext)
	const [lankingList, setLankingList] = useState(
		Array.from({ length: 10 }, () => ({
			nickName: "참가자",
			instagramUserName: "",
			organization: "고려대학교",
			lScore: 0,
		})),
	)

	useEffect(() => {
		if (challengeData) {
			// console.log(challengeData.participants.users);
			const templankingList = challengeData.participants.users
			const arr2 = Array.from({ length: 10 - lankingList.length }, () => ({
				nickName: "참가자",
				instagramUserName: "",
				organization: "고려대학교",
				lScore: 0,
			}))
			const finalLankingList = templankingList.concat(arr2)
			// console.log(finalLankingList);
			setLankingList(finalLankingList)
		}
	}, [challengeData])

	return (
		<div className="flex flex-col justify-center items-center w-[100%] h-[100%] px-[5%]">
			<HighRank />
			{lankingList.map((ranker, i) => {
				if (i > 2 && i < 10) {
					return <RankRow key={i} rank={i + 1} ranker={ranker} />
				}
			})}
			<span className="w-[100%] text-[#00F0FF] text-left text-[8px] leading-[12px]">
				38분전 업데이트
			</span>
		</div>
	)
}
