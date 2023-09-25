"use client"

import Check from "@/public/svg/check.svg"
import { useRouter, useSearchParams } from "next/navigation"

export default function CheckBox() {
	const router = useRouter()
	const param = useSearchParams()
	const challengeId = param.get("id")
	const backToLeaderboard = () => {
		router.replace("/service/challenge/leaderboard?id=" + challengeId)
	}
	return (
		<div className="flex justify-center items-center absolute top-0 left-0 w-full h-full">
			<div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-20"></div>
			<div
				className="flex flex-col justify-center items-center pb-[20px] font-textBoxFontr text-white bg-transparent z-30"
				onClick={backToLeaderboard}
			>
				<Check />
				<div className="flex justify-center items-center text-[24px]">
					모두 평가했습니다!
				</div>
				<div className="flex justify-center items-center text-[12px]">
					다른 참가자들을 조금만 기다려주세요!
				</div>
			</div>
		</div>
	)
}
