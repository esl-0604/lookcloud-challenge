"use client"

import {
	userTutorial,
	userTutorialType,
} from "@/app/utils/atoms/serviceGlobalState"
import HeaderLogo from "@/public/svg/headerlogo.svg"
import { useRouter, useSearchParams } from "next/navigation"
import { useRecoilState } from "recoil"

export default function TutorialHeader() {
	const router = useRouter()
	const param = useSearchParams()
	const challengeId = param.get("id")
	const [userTutorialData, setUserTutorialData] =
		useRecoilState<userTutorialType>(userTutorial)

	const SkipTutorial = () => {
		setUserTutorialData({ complete: true })
		router.replace("/service/challenge/evaluate?id=" + challengeId)
	}
	return (
		<div className="flex flex-col justify-start items-center w-[100%]">
			<div className="flex flex-row justify-between items-center w-[100%] h-[56px] px-[16px]">
				<HeaderLogo width={"126"} height={"32"} color={"white"} />
				<div
					className="w-[30%] text-right text-xs text-white cursor-pointer"
					onClick={SkipTutorial}
				>
					skip tutorial
				</div>
			</div>
		</div>
	)
}
