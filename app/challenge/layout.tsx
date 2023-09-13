"use client"

import { useRouter, useSearchParams } from "next/navigation"
import LocalStorage from "../localstorage"
import { useRecoilState } from "recoil"
import { userProfileState } from "../utils/atoms/userprofile"
import { useEffect } from "react"

export default function ChallengeLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const router = useRouter()
	const param = useSearchParams()
	const instagramCode = param.get("code")
	const userID = LocalStorage.getItem("lookCloud-user-Id")
	const [profileData, setProfileData] = useRecoilState<any>(userProfileState)

	const RequestUserIDAPIcall = async (userId: string) => {
		const REQUEST_USER_ID_URL =
			"https://external-api.stage.lookcloud.co/users/" + userId + "/instagram"
		await fetch(REQUEST_USER_ID_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				code: instagramCode,
			}),
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				if (status === 200) {
					// console.log(data);
					if (data["instagramUserName"]) {
						GetUserInfoAPIcall(userId)
					} else {
						console.log("인스타그램 ID 정보를 가져올 수 없습니다.")
					}
				} else {
					console.log(message)
				}
			})
			.catch((error) => {
				console.log(error)
			})
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
				if (status === 200) {
					console.log(data)
					let newProfileData = { ...profileData }
					newProfileData.userId = userId
					newProfileData.nickname = '"' + data["nickName"] + '"님'
					newProfileData.gender = data["gender"] === "MALE" ? "남성" : "여성"
					newProfileData.organ = data["organization"]
					if (data["instagram"] && data["instagram"]["userName"]) {
						newProfileData.instagram = "@" + data["instagram"]["userName"]
					}
					setProfileData(newProfileData)
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	useEffect(() => {
		if (instagramCode) {
			if (userID) {
				RequestUserIDAPIcall(userID)
			} else {
				router.push("/login")
			}
		} else {
			if (userID) {
				GetUserInfoAPIcall(userID)
			} else {
				router.push("/login")
			}
		}
	}, [])

	useEffect(() => {
		if (instagramCode && profileData.instagram) {
			router.replace("/challenge")
			// router.push("/challenge/profile");
		}
	}, [profileData])

	return <>{children}</>
}
