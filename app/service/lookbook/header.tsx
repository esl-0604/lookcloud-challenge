"use client"

import Link from "next/link"
import HeaderLogo from "@/public/svg/headerlogo.svg"
import Profile from "@/public/svg/profile.svg"
import { useRouter, usePathname } from "next/navigation"
import Backward from "@/public/svg/backward.svg"
import LocalStorage from "@/app/utils/localstorage"

export default function LookbookHeader() {
	const router = useRouter()
	const path = usePathname()
	console.log(path)
	const userProfile = LocalStorage.getItem("lookCloud-kakao-profile")
	const GoBackward = () => {
		router.replace("/service/lookbook")
	}
	const GoHome = () => {
		router.push("/service/lookbook")
	}
	return (
		<div className="flex-none flex flex-row sticky top-0 justify-between items-center w-[100%] h-[56px] px-[10px] z-30 bg-black">
			{path === "/service/lookbook" ? (
				<div className="pl-[6px] cursor-pointer" onClick={GoHome}>
					<HeaderLogo width={"126"} height={"32"} color={"white"} />
				</div>
			) : (
				<div className="cursor-pointer" onClick={GoBackward}>
					<Backward />
				</div>
			)}

			<Link href={"/service/profile"} className="cursor-pointer pr-[6px]">
				{userProfile ? (
					<div className="flex justify-center items-center w-[40px] h-[40px] rounded-full overflow-hidden">
						<img className="object-cover" src={userProfile} alt="myProfile" />
					</div>
				) : (
					<Profile width={"40"} height={"40"} />
				)}
			</Link>
		</div>
	)
}
