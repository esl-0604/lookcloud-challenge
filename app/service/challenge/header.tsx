"use client"

import Link from "next/link"
import HeaderLogo from "@/public/svg/headerlogo.svg"
import Cancle from "@/public/svg/cancle.svg"
import Profile from "@/public/svg/profile.svg"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import Backward from "@/public/svg/backward.svg"
import LocalStorage from "@/app/utils/localstorage"

export default function ChallengeHeader() {
	const router = useRouter()
	const path = usePathname()
	const param = useSearchParams()
	const challengeId = param.get("id")
	console.log(path)
	const userProfile = LocalStorage.getItem("lookCloud-kakao-profile")
	const GoBackward = () => {
		if (path === "/service/challenge/leaderboard")
			router.replace("/service/challenge")
		else if (path === "/service/challenge/participate")
			router.replace("/service/challenge/leaderboard?id=" + challengeId)
		else if (path === "/service/challenge/evaluate")
			router.replace("/service/challenge/leaderboard?id=" + challengeId)
	}
	const GoHome = () => {
		router.push("/service/challenge")
	}
	return (
		<div className="flex flex-row sticky top-0 justify-between items-center w-[100%] h-[56px] px-[4%] z-30 bg-black">
			{path === "/service/challenge" ? (
				<HeaderLogo
					width={"126"}
					height={"32"}
					color={"white"}
					className="cursor-pointer"
					onClick={GoHome}
				/>
			) : path === "/service/challenge/evaluate" ? (
				<div> </div>
			) : (
				<Backward className="cursor-pointer" onClick={GoBackward} />
			)}

			{path === "/service/challenge/evaluate" ? (
				<Cancle
					width={20}
					height={20}
					color={"#D9D9D9"}
					className="cursor-pointer"
					onClick={GoBackward}
				/>
			) : (
				<Link href={"/service/profile"} className="cursor-pointer">
					{userProfile ? (
						<div className="flex justify-center items-center w-[40px] h-[40px] rounded-full overflow-hidden">
							<img className="object-cover" src={userProfile} alt="myProfile" />
						</div>
					) : (
						<Profile width={40} height={40} />
					)}
				</Link>
			)}
		</div>
	)
}
