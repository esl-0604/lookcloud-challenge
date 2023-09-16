"use client"

import { useContext } from "react"
import { GenderType, OrganType, StepContext } from "@/app/init/onboarding/page"
import { useRouter } from "next/navigation"
import LocalStorage from "@/app/utils/localstorage"

interface ContinueButtonProps {
	canBeContinued: boolean
	nickName: string
	gender: GenderType | null
	organ: OrganType | null
}

export default function ContinueButton({
	canBeContinued,
	nickName,
	gender,
	organ,
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
					소속: organ,
				})
				// 유저 정보 저장 api call
				const facebookID = LocalStorage.getItem("lookCloud-facebook-Id")
				if (facebookID) registerUserAPIcall(Number(facebookID))
				else {
					console.log("연결된 facebookId가 없습니다.")
					router.push("/login")

					// 나중에 지워야함.
					// setStep({ id: (stepNum + 1).toString() });
				}
			} else if (stepNum === 4) {
				router.push("/challenge")
			}
		}
	}
	const GetUserInfoAPIcall = async (userId: string) => {
		const GET_USER_INFO_URL =
			"https://external-api.stage.lookcloud.co/users/" + userId
		await fetch(GET_USER_INFO_URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				if (status === "ILLEGAL_STATE") {
					LocalStorage.removeItem("lookCloud-user-Id")
					LocalStorage.removeItem("lookCloud-facebook-Id")
					router.push("/login")
				} else if (status === 200) {
					LocalStorage.removeItem("lookCloud-user-Id")
					LocalStorage.removeItem("lookCloud-facebook-Id")
					LocalStorage.setItem("lookCloud-user-Id", userId)
					if (LocalStorage.getItem("lookCloud-user-Id")) {
						// router.push("./challenge");
						setStep({ id: "4" })
					}
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const registerUserAPIcall = async (facebookId: number) => {
		const REGISTER_USER_URL = "https://external-api.stage.lookcloud.co/users"
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
				organization: organ,
			}),
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				if (status === 200) {
					GetUserInfoAPIcall(data)
				} else {
					console.log(message)
					alert("Done 버튼을 다시 눌러주세요.")
				}
			})
			.catch((error) => {
				console.log(error)
				router.push("/login")
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
