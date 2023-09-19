"use client"

import TitleIcon from "@/public/svg/LookCloudTitle.svg"
import FacebookLoginButton from "@/app/init/login/facebookloginbutton"
import KaKaoLoginButton from "./kakaologinbutton"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function Login() {
	const param = useSearchParams()
	const kakaoCode = param.get("code")
	useEffect(() => {
		if (kakaoCode) console.log(kakaoCode)
	}, [kakaoCode])
	return (
		<main className="flex flex-col justify-center items-center w-[100%] h-[100%] bg-black text-white">
			<div className="mt-[35px]">
				<TitleIcon width={"310"} height={"47"} color={"white"} />
			</div>
			<div className="flex justify-center items-center w-full h-[50px] bg-transparent text-black mt-[50px] cursor-pointer">
				<FacebookLoginButton />
				{/* <KaKaoLoginButton /> */}
			</div>
		</main>
	)
}
