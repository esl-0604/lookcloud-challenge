"use client"

import { useContext, useState } from "react"
import { GenderType } from "@/app/init/onboarding/page"
import { useRouter } from "next/navigation"
import LocalStorage from "@/app/utils/localstorage"
import { StepContext } from "./context"
import SpinnerBox from "@/app/components/spinner"

interface ContinueButtonProps {
	canBeContinued: boolean
	nickName: string
	gender: GenderType | null
	// organ: OrganType | null
	instagramId: string
	setValidateNickName: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ContinueButton({
	canBeContinued,
	nickName,
	gender,
	// organ,
	instagramId,
	setValidateNickName,
}: ContinueButtonProps) {
	const { step, setStep }: any = useContext(StepContext)
	const [apiWaiting, setApiWaiting] = useState<boolean>(false)
	const router = useRouter()

	const StepForward = () => {
		if (canBeContinued) {
			const stepNum = Number(step.id)
			if (stepNum === 1) validateNickName()
			else if (stepNum === 2) setStep({ id: (stepNum + 1).toString() })
			else if (stepNum === 3) {
				console.log({
					닉네임: nickName,
					성별: gender,
					인스타그램ID: instagramId,
				})

				// 유저 정보 저장 api call
				// const facebookID = LocalStorage.getItem("lookCloud-facebook-Id")
				// if (facebookID) registerUserAPIcall(Number(facebookID))
				// else {
				// 	console.log("연결된 facebookId가 없습니다.")
				// 	router.push("/init/login")
				// }

				const kakaoID = LocalStorage.getItem("lookCloud-kakao-Id")
				if (kakaoID) registerUserAPIcall(Number(kakaoID))
				else {
					LocalStorage.removeItem("lookCloud-kakao-profile")
					console.log("연결된 kakaoId가 없습니다.")
					router.replace("/init/login")
				}
			}
			// else if (stepNum === 4) {
			// 	router.push("/service/challenge")
			// }
		}
	}

	const validateNickName = async () => {
		setApiWaiting(true)
		const REGISTER_USER_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/users/nickName`
		await fetch(REGISTER_USER_URL, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				nickName: nickName,
			}),
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				setApiWaiting(false)
				if (data) {
					// 중복된 닉네임이 있는 경우
					if (data === "EXISTS") {
						setValidateNickName(false)
					}

					// 중복된 닉네임이 없는 경우
					else {
						const stepNum = Number(step.id)
						setStep({ id: (stepNum + 1).toString() })
					}
				} else {
					console.log(message)
				}
			})
			.catch((error) => {
				setApiWaiting(false)
				console.log(error)
			})
	}

	const registerUserAPIcall = async (kakaoId: number) => {
		setApiWaiting(true)
		const REGISTER_USER_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/users`
		await fetch(REGISTER_USER_URL, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				kakaoLoginId: kakaoId,
				nickName: nickName,
				gender: gender,
				instagramUserName: instagramId,
			}),
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				// 회원가입 성공
				if (data) {
					console.log(data)
					const userToken: string = data
					GetUserInfoAPIcall(userToken)
				}
				// 이미 가입한 사용자
				else {
					console.log(message)
					router.replace("/init/login")
				}
			})
			// 회원가입 실패
			.catch((error) => {
				console.log(error)
				router.replace("/init/login")
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
				setApiWaiting(false)

				// 유저 조회 성공
				if (data) {
					LocalStorage.removeItem("lookCloud-user-token")
					LocalStorage.setItem("lookCloud-user-token", userToken)
					if (LocalStorage.getItem("lookCloud-user-token")) {
						router.replace("/service/challenge")
						// setStep({ id: "4" })
					}
				}

				// 가입하지 않은 사용자 입니다.
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
			})
	}

	return (
		<div className="flex justify-center items-center w-[100%]">
			{apiWaiting ? <SpinnerBox /> : null}
			<div
				className={`flex justify-center items-center w-[65%] max-w-[310px] h-[40px] rounded-[20.5px] text-white text-[12px] font-textBoxFont  ${
					canBeContinued ? "bg-[#344467] cursor-pointer" : "bg-[#D9D9D9]"
				}`}
				onClick={StepForward}
			>
				{step.id === "3" ? "DONE" : "CONTINUE"}
			</div>
		</div>
	)
}
