"use client"

import Link from "next/link"
import HeaderLogo from "@/public/svg/headerlogo.svg"
import Profile from "@/public/svg/profile.svg"
import { useRouter, usePathname } from "next/navigation"
import Backward from "@/public/svg/backward.svg"

export default function ChallengeHeader() {
	const router = useRouter()
	const path = usePathname()
	// console.log(path);
	const GoBackward = () => {
		router.back()
	}
	const GoHome = () => {
		router.push("/service/challenge")
	}
	return (
		<div className="flex flex-row sticky top-0 justify-between items-center w-[100%] h-[56px] px-[16px] z-30 bg-black">
			<div className="cursor-pointer" onClick={GoHome}>
				<HeaderLogo width={"126"} height={"32"} color={"white"} />
			</div>

			{path === "service/challenge/evaluate" ? (
				<div className="text-right text-[12px] text-white font-textBoxFont">
					고연전
				</div>
			) : (
				<Link href={"/service/profile"} className="cursor-pointer">
					<Profile width={"40"} height={"40"} />
				</Link>
			)}

			{path === "/service/challenge" ? null : (
				<div
					className="absolute top-[74px] right-[15px] z-10 cursor-pointer"
					onClick={GoBackward}
				>
					<Backward />
				</div>
			)}
		</div>
	)
}
