"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { useRecoilState } from "recoil"
import {
	challengeParticipantsInfo,
	challengeParticipantsType,
	userChallengeParticipateInfo,
	userChallengeParticipateType,
	userProfileState,
	userProfileType,
} from "@/app/utils/atoms/serviceGlobalState"
import { useEffect } from "react"

export default function ChallengeLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const router = useRouter()
	const param = useSearchParams()
	const challengeId = Number(param.get("id"))

	const [challengeParticipantsData, setChallengeParticipantsData] =
		useRecoilState<challengeParticipantsType>(challengeParticipantsInfo)

	const GetChallengeParticipantsInfo = async (challengeId: number) => {
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
				if (status === "OK") {
					console.log(data)
					let newChallengeRankerObj = { ...challengeParticipantsData }
					newChallengeRankerObj[challengeId] = data["participants"]
					setChallengeParticipantsData(newChallengeRankerObj)
				} else console.log(message)
			})
			.catch((error) => console.log(error))
	}
	// --------------------------------------------------------------------------------
	const [profileData, setProfileData] =
		useRecoilState<userProfileType>(userProfileState)

	const [userChallengeParticipateData, setUserChallengeParticipateData] =
		useRecoilState<userChallengeParticipateType>(userChallengeParticipateInfo)

	const GetUserChallengeParticipateInfo = async (
		userToken: string,
		challengeId: number,
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
				if (status === "OK") {
					console.log(data)
					let newUserChallengeObj = { ...userChallengeParticipateData }
					newUserChallengeObj[challengeId] = data
					setUserChallengeParticipateData(newUserChallengeObj)
				} else console.log(message)
			})
			.catch((error) => console.log(error))
	}

	// --------------------------------------------------------------------------------

	useEffect(() => {
		if (profileData.userToken && challengeId) {
			console.log(challengeId)
			// GetChallengeParticipantsInfo(challengeId)
			// GetUserChallengeParticipateInfo(profileData.userToken, challengeId)
		}
	}, [])

	return <>{children}</>
}
