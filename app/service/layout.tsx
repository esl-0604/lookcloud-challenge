"use client"

import LocalStorage from "@/app/utils/localstorage"
import { useRouter, useSearchParams } from "next/navigation"
import { useRecoilState } from "recoil"
import {
	challengeInfoList,
	challengeInfoType,
	userProfileState,
	userProfileType,
} from "@/app/utils/atoms/serviceGlobalState"
import { useEffect } from "react"

export default function ServiceLayout({
	children,
}: {
	children: React.ReactNode
}) {
	// const instagramCode = param.get("code")
	// const param = useSearchParams()

	const router = useRouter()

	// 유저 정보 저장
	const userToken = LocalStorage.getItem("lookCloud-user-token")
	const [profileData, setProfileData] =
		useRecoilState<userProfileType>(userProfileState)

	useEffect(() => {
		if (userToken) {
			if (!profileData.userToken) {
				GetUserInfo(userToken)
			}
		} else {
			router.replace("/init/login")
		}
	}, [])

	const GetUserInfo = async (userToken: string) => {
		const GET_USER_INFO_URL =
			"https://external-api.stage.lookcloud.co/users/" + userToken
		await fetch(GET_USER_INFO_URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				if (status === 200) {
					console.log(data)
					let newProfileData = { ...profileData }
					newProfileData.userToken = userToken
					newProfileData.nickname = '"' + data["nickName"] + '"님'
					newProfileData.gender = data["gender"] === "MALE" ? "남성" : "여성"
					// if (data["instagram"] && data["instagram"]["userName"]) {
					// 	newProfileData.instagram = "@" + data["instagram"]["userName"]
					// }
					setProfileData(newProfileData)
				} else {
					router.replace("/init/login")
				}
			})
			.catch((error) => {
				console.log(error)
				router.replace("/init/login")
			})
	}

	// ------------------------------------------------------------

	// 챌린지 정보 저장
	const [challengeDataList, setChallengeDataList] =
		useRecoilState<challengeInfoType[]>(challengeInfoList)

	useEffect(() => {
		// GetChallengeInfo()
	}, [])

	const GetChallengeInfo = () => {
		const GET_CHALLENGES_URL =
			"https://external-api.stage.lookcloud.co/challenges/"

		fetch(GET_CHALLENGES_URL, {
			method: "GET",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				console.log(data)
				if (status === "OK") setChallengeDataList(data)
				else console.log(message)
			})
			.catch((error) => console.log(error))
	}
	return <>{children}</>
}

// const RequestUserIDAPIcall = async (userToken: string) => {
// 	const REQUEST_USER_ID_URL =
// 		"https://external-api.stage.lookcloud.co/users/" +
// 		userToken +
// 		"/instagram"
// 	await fetch(REQUEST_USER_ID_URL, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			code: instagramCode,
// 		}),
// 	})
// 		.then((res) => res.json())
// 		.then(({ status, message, data }) => {
// 			if (status === 200) {
// 				// console.log(data);
// 				if (data["instagramUserName"]) {
// 					GetUserInfoAPIcall(userToken)
// 				} else {
// 					console.log("인스타그램 ID 정보를 가져올 수 없습니다.")
// 				}
// 			} else {
// 				console.log(message)
// 			}
// 		})
// 		.catch((error) => {
// 			console.log(error)
// 		})
// }
