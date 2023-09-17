"use client"

import FacebookLogin from "@greatsumini/react-facebook-login"
import { useEffect, useState } from "react"
import LocalStorage from "@/app/utils/localstorage"
import { useRouter } from "next/navigation"

export default function FacebookLoginButton() {
	const [facebookID, setFacebookID] = useState<any>(null)
	const router = useRouter()
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
				// console.log(status);
				if (status === "ILLEGAL_STATE") {
					LocalStorage.removeItem("lookCloud-facebook-Id")
					LocalStorage.setItem("lookCloud-facebook-Id", facebookID)
					if (LocalStorage.getItem("lookCloud-facebook-Id")) {
						router.push("/init/onboarding")
					}
				} else if (status === 200) {
					// console.log(data);
					const userID = data
					GetUserInfoAPIcall(userID)
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}
	const GetUserInfoAPIcall = async (userId: string) => {
		const GET_USER_INFO_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/users/${userId}`
		await fetch(GET_USER_INFO_URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				if (status === "ILLEGAL_STATE") {
					LocalStorage.removeItem("lookCloud-user-token")
					LocalStorage.removeItem("lookCloud-facebook-Id")
					router.push("/init/login")
				} else if (status === 200) {
					LocalStorage.removeItem("lookCloud-user-token")
					LocalStorage.removeItem("lookCloud-facebook-Id")
					LocalStorage.setItem("lookCloud-user-token", userId)
					if (LocalStorage.getItem("lookCloud-user-token")) {
						router.push("/service/challenge")
					}
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}
	useEffect(() => {
		if (facebookID) {
			// console.log(facebookID);
			GetFacebookUserInfoAPIcall(facebookID)
		}
	}, [facebookID])

	return (
		<>
			<div className="flex justify-center items-center w-[200px] h-[50px] bg-white text-black mt-[50px] cursor-pointer">
				<FacebookLogin
					appId={process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || ""}
					// onSuccess={(response) => {
					//     console.log("Login Success!");
					//     console.log("id: ", response);
					// }}
					onFail={(error) => {
						console.log("Login Failed!")
						console.log("status: ", error)
					}}
					onProfileSuccess={(response) => {
						// console.log("Get Profile Success!");
						// console.log(response);
						setFacebookID(response["id"])
					}}
					render={({ onClick }) => (
						<div onClick={onClick}>
							{/* render prop을 사용할 땐 반드시 onClick을 사용해주세요! */}
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
