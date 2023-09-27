"use client"

import { useEffect, useState } from "react"
import LocalStorage from "@/app/utils/localstorage"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import SpinnerBox from "@/app/components/spinner"

export default function KaKaoLoginButton() {
	const [apiWaiting, setApiWaiting] = useState<boolean>(false)
	const router = useRouter()
	const param = useSearchParams()
	const kakaoCode = param.get("code")

	useEffect(() => {
		if (kakaoCode) {
			// console.log(kakaoCode)
			getKakaoUserToken()
		}
	}, [kakaoCode])

	const getKakaoUserToken = async () => {
		setApiWaiting(true)
		const USER_TOKEN_URL = "https://kauth.kakao.com/oauth/token"
		await fetch(USER_TOKEN_URL, {
			method: "POST",
			headers: {
				"Content-type": "application/x-www-form-urlencoded;charset=utf-8",
			},
			body: `grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&code=${kakaoCode}`,
		})
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					// console.log(data)
					getKaKaoUserId(data.access_token)
				} else {
					setApiWaiting(false)
				}
			})
			.catch((error) => {
				setApiWaiting(false)
				console.log(error)
			})
	}

	const getKaKaoUserId = async (ACCESS_TOKEN: string) => {
		const USER_TOKEN_URL = "https://kapi.kakao.com/v2/user/me"
		await fetch(USER_TOKEN_URL, {
			method: "POST",
			headers: {
				Authorization: "Bearer " + ACCESS_TOKEN,
				"Content-type": "application/x-www-form-urlencoded;charset=utf-8",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data) {
					// console.log(data)

					const kakaoId: number = data.id
					const kakaoProfileUrl: string | null = data.properties?.profile_image

					GetKakaoUserInfoAPIcall(kakaoId, kakaoProfileUrl)
				} else {
					setApiWaiting(false)
				}
			})
			.catch((error) => {
				setApiWaiting(false)
				console.log(error)
			})
	}

	const GetKakaoUserInfoAPIcall = async (
		kakaoId: number,
		kakaoProfileUrl: string | null,
	) => {
		const GET_KAKAO_USER_INFO_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/users/kakao/${kakaoId}`
		await fetch(GET_KAKAO_USER_INFO_URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				// 카카오 계정으로 유저 조회 성공
				if (data) {
					// console.log(data);
					const userToken: string = data
					GetUserInfoAPIcall(userToken, kakaoProfileUrl)
				}

				// 카카오 계정으로 유저 조회 실패
				else {
					setApiWaiting(false)
					LocalStorage.removeItem("lookCloud-kakao-Id")
					LocalStorage.removeItem("lookCloud-kakao-profile")
					LocalStorage.setItem("lookCloud-kakao-Id", kakaoId.toString())
					if (kakaoProfileUrl)
						LocalStorage.setItem("lookCloud-kakao-profile", kakaoProfileUrl)
					if (LocalStorage.getItem("lookCloud-kakao-Id"))
						router.push("/init/onboarding")
				}
			})
			.catch((error) => {
				setApiWaiting(false)
				console.log(error)
			})
	}

	const GetUserInfoAPIcall = async (
		userToken: string,
		kakaoProfileUrl: string | null,
	) => {
		const GET_USER_INFO_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/users/${userToken}`
		await fetch(GET_USER_INFO_URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				setApiWaiting(false)

				// 유저 토큰으로 유저 조회 성공
				if (data) {
					LocalStorage.removeItem("lookCloud-user-token")
					LocalStorage.removeItem("lookCloud-kakao-Id")
					LocalStorage.removeItem("lookCloud-kakao-profile")
					LocalStorage.setItem("lookCloud-user-token", userToken)
					if (kakaoProfileUrl)
						LocalStorage.setItem("lookCloud-kakao-profile", kakaoProfileUrl)
					if (LocalStorage.getItem("lookCloud-user-token")) {
						router.replace("/service/challenge")
					}
				}

				// 유저 토큰으로 유저 조회 실패
				else {
					LocalStorage.removeItem("lookCloud-user-token")
					LocalStorage.removeItem("lookCloud-kakao-Id")
					LocalStorage.removeItem("lookCloud-kakao-profile")
					router.replace("/init/login")
				}
			})
			.catch((error) => {
				setApiWaiting(false)
				console.log(error)
				LocalStorage.removeItem("lookCloud-user-token")
				LocalStorage.removeItem("lookCloud-kakao-Id")
				LocalStorage.removeItem("lookCloud-kakao-profile")
				router.replace("/init/login")
			})
	}

	return (
		<div className="flex justify-center items-center mt-[50px] w-full">
			{apiWaiting ? <SpinnerBox /> : null}
			<Link
				href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code&scope=account_email profile_image`}
				className="flex justify-center items-center w-[70%] max-w-[320px] cursor-pointer"
			>
				<div className="flex justify-center items-center w-full h-[52px] rounded-[29px] bg-[#707070] text-white text-[14px] font-loginBoxFont font-normal border-[2px] border-[#D9D9D9]">
					SIGN IN WITH KAKAO
				</div>
			</Link>
		</div>
	)
}
