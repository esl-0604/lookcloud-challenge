"use client"

import LocalStorage from "@/app/utils/localstorage"
import { useRouter } from "next/navigation"
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
		const GET_USER_INFO_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/users/${userToken}`
		await fetch(GET_USER_INFO_URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				if (status === "NOT_FOUND") {
					console.log(message)
					router.replace("/init/login")
				} else {
					console.log(data)
					let newProfileData = { ...profileData }
					newProfileData.userToken = userToken
					newProfileData.nickname = '"' + data["nickName"] + '"님'
					newProfileData.gender = data["gender"] === "MALE" ? "남성" : "여성"
					if (data["instagramUserName"]) {
						newProfileData.instagramUserName = "@" + data["instagramUserName"]
					}
					setProfileData(newProfileData)
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
		const GET_CHALLENGES_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/challenges`

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
				if (status === "OK") {
					const newChallengeDateList = data.map(
						(challenge: challengeInfoType, i: number) => {
							const today: Date = new Date()
							let state: number = 0

							if (challenge.startDate && challenge.endDate) {
								// state === -1
								if (today < challenge.startDate) {
									state = -1
								}
								// state === 0 이상의 정수
								else if (
									challenge.startDate <= today &&
									today <= challenge.endDate
								) {
									const dTime: number =
										challenge.endDate.getTime() - today.getTime()
									const dDay: number = Math.ceil(dTime / (1000 * 60 * 60 * 24))
									state = dDay
								}
								// state === -2
								else {
									state = -2
								}
							}
							let newChallengeData = { ...challenge }
							newChallengeData.state = state
							return newChallengeData
						},
					)
					console.log(newChallengeDateList)
					setChallengeDataList(newChallengeDateList)
				} else console.log(message)
			})
			.catch((error) => console.log(error))
	}
	return <>{children}</>
}

// const instagramCode = param.get("code")
// const param = useSearchParams()

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
