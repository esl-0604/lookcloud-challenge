"use client"

import { useContext } from "react"
import { GenderType, StepContext } from "@/app/init/onboarding/page"
import { useRouter } from "next/navigation"
import LocalStorage from "@/app/utils/localstorage"

interface ContinueButtonProps {
	canBeContinued: boolean
	nickName: string
	gender: GenderType | null
	// organ: OrganType | null
	instagramId: string
}

export default function ContinueButton({
	canBeContinued,
	nickName,
	gender,
	// organ,
	instagramId,
}: ContinueButtonProps) {
	const { step, setStep }: any = useContext(StepContext)
	const router = useRouter()

	const StepForward = () => {
		if (canBeContinued) {
			const stepNum = Number(step.id)
			if (stepNum < 3) setStep({ id: (stepNum + 1).toString() })
			else if (stepNum === 3) {
				console.log({
					닉네임: nickName,
					성별: gender,
					인스타그램ID: instagramId,
				})

				// 유저 정보 저장 api call
				const facebookID = LocalStorage.getItem("lookCloud-facebook-Id")
				if (facebookID) registerUserAPIcall(Number(facebookID))
				else {
					console.log("연결된 facebookId가 없습니다.")
					router.push("/init/login")
				}
			}
			// else if (stepNum === 4) {
			// 	router.push("/service/challenge")
			// }
		}
	}

	const registerUserAPIcall = async (facebookId: number) => {
		const REGISTER_USER_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/users`
		await fetch(REGISTER_USER_URL, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				facebookLoginId: facebookId,
				nickName: nickName,
				gender: gender,
				instagramUserName: instagramId,
			}),
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				// 이미 가입한 사용자
				if (status === "ILLEGAL_STATE") {
					console.log(message)
					router.replace("/init/login")
					// alert("Done 버튼을 다시 눌러주세요.")
				}
				// 회원가입 성공
				else {
					const userToken: string = data
					GetUserInfoAPIcall(userToken)
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
				// 가입하지 않은 사용자 입니다.
				if (status === "NOT_FOUND") {
					LocalStorage.removeItem("lookCloud-user-token")
					LocalStorage.removeItem("lookCloud-facebook-Id")
					router.replace("/init/login")
				}
				// 유저 조회 성공
				else {
					LocalStorage.removeItem("lookCloud-user-token")
					LocalStorage.removeItem("lookCloud-facebook-Id")
					LocalStorage.setItem("lookCloud-user-token", userToken)
					if (LocalStorage.getItem("lookCloud-user-token")) {
						router.replace("/service/challenge")
						// setStep({ id: "4" })
					}
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<div
			className={`flex justify-center items-center w-[100%] ${
				step.id === "4" ? null : "py-[16px]"
			}`}
		>
			<div
				className={`flex justify-center items-center w-[310px] h-[40px] rounded-[20.5px] text-white text-[12px] font-textBoxFont  ${
					canBeContinued ? "bg-[#344467] cursor-pointer" : "bg-[#D9D9D9]"
				}`}
				onClick={StepForward}
			>
				{step.id === "3" ? "DONE" : step.id === "4" ? "건너뛰기" : "CONTINUE"}
			</div>
		</div>
	)
}
