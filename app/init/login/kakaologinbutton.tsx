"use client"

import { useEffect } from "react"
import LocalStorage from "@/app/utils/localstorage"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

export default function KaKaoLoginButton() {
	const router = useRouter()
	const param = useSearchParams()
	const kakaoCode = param.get("code")

	useEffect(() => {
		if (kakaoCode) {
			// console.log(kakaoCode)
			getUserToken()
		}
	}, [kakaoCode])

	const getUserToken = async () => {
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
					getUsetKaKaoId(data.access_token)
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const getUsetKaKaoId = async (ACCESS_TOKEN: string) => {
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
				}
			})
			.catch((error) => {
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
				// 카카오 계정으로 유저 조회 실패
				if (status === "NOT_FOUND") {
					LocalStorage.removeItem("lookCloud-kakao-Id")
					LocalStorage.removeItem("lookCloud-kakao-profile")
					LocalStorage.setItem("lookCloud-kakao-Id", kakaoId.toString())
					if (kakaoProfileUrl)
						LocalStorage.setItem("lookCloud-kakao-profile", kakaoProfileUrl)
					if (LocalStorage.getItem("lookCloud-kakao-Id")) {
						router.push("/init/onboarding")
					}
				}
				// 카카오 계정으로 유저 조회 성공
				else {
					// console.log(data);
					const userToken: string = data
					GetUserInfoAPIcall(userToken, kakaoProfileUrl)
				}
			})
			.catch((error) => {
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
				// 유저 토큰으로 유저 조회 실패
				if (status === "NOT_FOUND") {
					LocalStorage.removeItem("lookCloud-user-token")
					LocalStorage.removeItem("lookCloud-kakao-Id")
					LocalStorage.removeItem("lookCloud-kakao-profile")
					router.replace("/init/login")
				}
				// 유저 토큰으로 유저 조회 성공
				else {
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
			})
			.catch((error) => {
				console.log(error)
				router.replace("/init/login")
			})
	}

	return (
		<>
			<Link
				href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code&scope=account_email profile_image`}
				className="cursor-pointer mt-[50px]"
			>
				<div className="flex justify-center items-center w-[320px] h-[52px] rounded-[29px] bg-[#D9D9D9]">
					<div className="flex justify-center items-center w-[316px] h-[48px] rounded-[29px] bg-[#707070] text-white text-[14px] font-loginBoxFont">
						SIGN IN WITH KAKAO
					</div>
				</div>
			</Link>
		</>
	)
}
