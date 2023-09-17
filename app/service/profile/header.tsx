"use client"

import { useRouter } from "next/navigation"
import HeaderLogo from "@/public/svg/headerlogo.svg"
import Backward from "@/public/svg/backward.svg"

export default function ChallengeProfileHeader() {
	const router = useRouter()
	const GoBackward = () => {
		router.back()
	}
	return (
		<div className="flex flex-row sticky top-0 justify-between items-center w-[100%] h-[56px] px-[16px]">
			<HeaderLogo width={"126"} height={"32"} color={"black"} />
			<div
				className="absolute top-[74px] right-[15px] z-10 cursor-pointer"
				onClick={GoBackward}
			>
				<Backward />
			</div>
		</div>
	)
}
