"use client"

import TitleIcon from "@/public/svg/LookCloudTitle.svg"
import LocalStorage from "@/app/utils/localstorage"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function App() {
	const router = useRouter()
	const userToken = LocalStorage.getItem("lookCloud-user-token")

	// 올바른 유저토큰인지 확인하는 API call
	const GetUserInfoAPIcall = async (userToken: string) => {
		const GET_USER_INFO_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/users/${userToken}`
		await fetch(GET_USER_INFO_URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				// 올바르지 않은 유저 토큰인 경우, 쿠키 초기화 & 자동 로그인 실패.
				if (status === "NOT_FOUND") {
					LocalStorage.removeItem("lookCloud-user-token")
					LocalStorage.removeItem("lookCloud-facebook-Id")
					router.replace("/init/login")

					// 올바른 유저 토큰인 경우, 자동 로그인 성공.
				} else {
					router.replace("/service/challenge")
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	useEffect(() => {
		// 로컬 쿠키에 유저토큰이 존재한다면, 올바른 유저토큰인지 확인.
		if (userToken) GetUserInfoAPIcall(userToken)
		// 로컬 쿠키에 유저토큰이 없다면, 쿠키를 초기화 & 자동 로그인 실패.
		else {
			LocalStorage.removeItem("lookCloud-user-token")
			LocalStorage.removeItem("lookCloud-facebook-Id")
			router.push("/init/login")
		}
	}, [])

	return (
		<main className="flex flex-col justify-center items-center w-[100%] h-[100%] bg-black">
			<TitleIcon width={"310"} height={"47"} color={"white"} />
		</main>
	)
}
