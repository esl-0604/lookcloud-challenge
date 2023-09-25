"use client"

import { usePathname, useSearchParams } from "next/navigation"

import { useRecoilState } from "recoil"
import {
	challengeParticipantsInfo,
	challengeParticipantsType,
	userChallengeParticipateInfo,
	userChallengeParticipateType,
	userProfileState,
	userProfileType,
	userTutorial,
	userTutorialType,
} from "@/app/utils/atoms/serviceGlobalState"
import { useEffect } from "react"
import NavBar from "@/app/components/navbar"

export default function ChallengeLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const path = usePathname()
	const param = useSearchParams()
	const challengeId = param.get("id")
	const [profileData, setProfileData] =
		useRecoilState<userProfileType>(userProfileState)

	// 현재 챌린지 세부 정보 및 참여자 정보 저장 ------------------------------------------------------------
	const [challengeParticipantsData, setChallengeParticipantsData] =
		useRecoilState<challengeParticipantsType>(challengeParticipantsInfo)

	useEffect(() => {
		// 현재 챌린지 세부 정보가 저장되어 있지 않을 경우, 불러오기.
		if (
			profileData.userToken &&
			challengeId
			// !Object.keys(challengeParticipantsData).includes(challengeId)
		) {
			// setChallengeParticipantsData({})
			GetChallengeParticipantsInfo(challengeId)
		}
	}, [profileData, challengeId])

	const GetChallengeParticipantsInfo = async (challengeId: string) => {
		const GET_CHALLENGE_PARTICIPANTS_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/challenges/${challengeId}`
		await fetch(GET_CHALLENGE_PARTICIPANTS_URL, {
			method: "GET",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				if (data) {
					console.log(data)
					let newChallengeRankerObj = { ...challengeParticipantsData }
					newChallengeRankerObj[challengeId] = data["participants"]
					// console.log(newChallengeRankerObj)
					setChallengeParticipantsData(newChallengeRankerObj)
				} else console.log(message)
			})
			.catch((error) => console.log(error))
	}

	// 현재 유저의 현재 챌린지 참여 정보 저장 ------------------------------------------------------------
	useEffect(() => {
		// 현재 유저의 현재 챌린지 참여 정보가 저장되어 있지않다면, 불러오기.
		if (
			profileData.userToken &&
			challengeId
			// !Object.keys(userChallengeParticipateData).includes(challengeId)
		) {
			setUserChallengeParticipateData({})
			GetUserChallengeParticipateInfo(profileData.userToken, challengeId)
		}
	}, [profileData, challengeId])

	const [userChallengeParticipateData, setUserChallengeParticipateData] =
		useRecoilState<userChallengeParticipateType>(userChallengeParticipateInfo)

	const GetUserChallengeParticipateInfo = async (
		userToken: string,
		challengeId: string,
	) => {
		const GET_USER_CHALLENGE_PARTICIPATE_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/users/${userToken}/challenges/${challengeId}`
		await fetch(GET_USER_CHALLENGE_PARTICIPATE_URL, {
			method: "GET",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				// 참여 챌린지 정보가 없는 경우
				if (status === "NOT_FOUND") {
					console.log(message)
					let newUserChallengeObj = { ...userChallengeParticipateData }
					delete newUserChallengeObj[challengeId]
					// console.log(newUserChallengeObj)
				} else {
					console.log(data)
					let newUserChallengeObj = { ...userChallengeParticipateData }
					newUserChallengeObj[challengeId] = data
					setUserChallengeParticipateData(newUserChallengeObj)
				}
			})
			.catch((error) => console.log(error))
	}

	// --------------------------------------------------------------------------------

	return (
		<>
			{children}
			{path === "/service/challenge/evaluate" ? null : (
				<NavBar page="challenge" />
			)}
		</>
	)
}
