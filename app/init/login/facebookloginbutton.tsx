"use client"

import FacebookLogin from "@greatsumini/react-facebook-login"
import { useEffect, useState } from "react"
import LocalStorage from "@/app/utils/localstorage"
import { useRouter } from "next/navigation"

export default function FacebookLoginButton() {
	const [facebookID, setFacebookID] = useState<string>("")
	const router = useRouter()

	useEffect(() => {
		if (facebookID) {
			// console.log(typeof facebookID)
			GetFacebookUserInfoAPIcall(facebookID)
		}
	}, [facebookID])

	const GetFacebookUserInfoAPIcall = async (facebookId: string) => {
		const GET_FACEBOOK_USER_INFO_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/users/facebook/${facebookId}`
		await fetch(GET_FACEBOOK_USER_INFO_URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				// 페이스북 계정으로 유저 조회 실패
				if (status === "NOT_FOUND") {
					LocalStorage.removeItem("lookCloud-facebook-Id")
					LocalStorage.setItem("lookCloud-facebook-Id", facebookId)
					if (LocalStorage.getItem("lookCloud-facebook-Id")) {
						router.push("/init/onboarding")
					}
				}
				// 페이스북 계정으로 유저 조회 성공
				else {
					// console.log(data);
					const userToken: string = data
					GetUserInfoAPIcall(userToken)
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

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
				// 유저 토큰으로 유저 조회 실패
				if (status === "NOT_FOUND") {
					LocalStorage.removeItem("lookCloud-user-token")
					LocalStorage.removeItem("lookCloud-facebook-Id")
					router.replace("/init/login")
				}
				// 유저 토큰으로 유저 조회 성공
				else {
					LocalStorage.removeItem("lookCloud-user-token")
					LocalStorage.removeItem("lookCloud-facebook-Id")
					LocalStorage.setItem("lookCloud-user-token", userToken)
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
			<div className="flex justify-center items-center w-[200px] h-[50px] bg-white text-black mt-[50px] cursor-pointer">
				<FacebookLogin
					appId={process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || ""}
					// onSuccess={(response) => {
					//     console.log("Login Success!");
					//     console.log("id: ", response);
					// }}
					scope={""}
					fields={"id"}
					onFail={(error) => {
						console.log("Login Failed!")
						console.log("status: ", error)
					}}
					onProfileSuccess={(response) => {
						// console.log("Get Profile Success!");
						console.log(response)
						if (response["id"]) setFacebookID(response["id"])
					}}
					render={({ onClick }) => (
						<div onClick={onClick}>
							<div className="flex justify-center items-center w-[320px] h-[52px] rounded-[29px] bg-[#D9D9D9]">
								<div className="flex justify-center items-center w-[316px] h-[48px] rounded-[29px] bg-[#707070] text-white text-[14px] font-loginBoxFont">
									SIGN IN WITH FACEBOOK
								</div>
							</div>
						</div>
					)}
				/>
			</div>
		</>
	)
}
