"use client"

import FacebookLogin from "@greatsumini/react-facebook-login"
import { useEffect, useState } from "react"
import LocalStorage from "@/app/utils/localstorage"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function KaKaoLoginButton() {
	const router = useRouter()
	const CODE_REQUEST_URL =
		"https://kauth.kakao.com/oauth/authorize?client_id=33895ce051fc6d0a517591f219408901&redirect_uri=https://localhost:3001/init/login&response_type=code&scope=account_email profile_image"
	return (
		<>
			<Link href={CODE_REQUEST_URL} className="cursor-pointer">
				<div className="flex justify-center items-center w-[320px] h-[52px] rounded-[29px] bg-[#D9D9D9]">
					<div className="flex justify-center items-center w-[316px] h-[48px] rounded-[29px] bg-[#707070] text-white text-[14px] font-loginBoxFont">
						SIGN IN WITH KAKAO
					</div>
				</div>
			</Link>
		</>
	)
}
