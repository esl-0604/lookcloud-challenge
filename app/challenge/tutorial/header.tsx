"use client"

import HeaderLogo from "@/../public/svg/headerlogo.svg"
import { useRouter } from "next/navigation"

export default function TutorialHeader() {
	const router = useRouter()
	const SkipTutorial = () => {
		router.replace("/challenge/evaluate")
	}
	return (
		<div className="flex flex-col justify-start items-center w-[100%]">
			<div className="flex flex-row justify-between items-center w-[100%] h-[56px] px-[16px]">
				<HeaderLogo width={"126"} height={"32"} color={"white"} />
				<div
					className="w-[20%] text-right text-xs text-white"
					onClick={SkipTutorial}
				>
					skip tutorial
				</div>
			</div>
		</div>
	)
}
