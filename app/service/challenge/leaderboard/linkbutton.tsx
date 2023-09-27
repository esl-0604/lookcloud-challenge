"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
	challengeInfoList,
	challengeInfoType,
	challengeParticipantsInfo,
	challengeParticipantsType,
	userChallengeParticipateInfo,
	userChallengeParticipateType,
	userProfileState,
	userProfileType,
	userTutorial,
	userTutorialType,
} from "@/app/utils/atoms/serviceGlobalState"
import { useRecoilState } from "recoil"
import { useEffect, useState } from "react"
import Pencil from "@/public/svg/pencil.svg"

export default function LinkButton() {
	const param = useSearchParams()
	const challengeId = Number(param.get("id"))

	const [profileData, setProfileData] =
		useRecoilState<userProfileType>(userProfileState)
	const [challengeParticipantsData, setChallengeParticipantsData] =
		useRecoilState<challengeParticipantsType>(challengeParticipantsInfo)
	const [userChallengeParticipateData, setUserChallengeParticipateData] =
		useRecoilState<userChallengeParticipateType>(userChallengeParticipateInfo)
	const [userTutorialData, setUserTutorialData] =
		useRecoilState<userTutorialType>(userTutorial)
	const [challengeDataList, setChallengeDataList] =
		useRecoilState<challengeInfoType[]>(challengeInfoList)

	const [isParticipate, setIsparticipate] = useState<boolean>(false)
	const [currentChallengeData, setCurrentChallengeData] =
		useState<challengeInfoType>({
			challengeId: 0,
			challengeName: "",
			startedAt: null,
			endedAt: null,
			state: -2,
			thumbnailUrl: "",
			middleThumbnailUrl: "",
			smallThumbnailUrl: "",
			comment: "",
			totalCount: 0,
		})

	useEffect(() => {
		challengeDataList.forEach((challenge, i) => {
			if (challengeId === challenge.challengeId) {
				// console.log(challenge)
				setCurrentChallengeData(challenge)
			}
		})
	}, [challengeDataList])

	useEffect(() => {
		if (
			challengeParticipantsData[challengeId] &&
			userChallengeParticipateData[challengeId]
		) {
			setIsparticipate(true)
		} else {
			setIsparticipate(false)
		}
	}, [challengeParticipantsData, userChallengeParticipateData])

	return (
		<div
			className={`flex flex-col justify-between items-center w-full px-[4%] py-[10px]`}
		>
			<div
				className={`flex flex-row justify-between items-start w-full h-full font-textBoxFont font-semibold ${
					isParticipate ? "h-[220px]" : " h-[90px]"
				}`}
			>
				{isParticipate ? (
					<div className="flex flex-col justify-between items-center w-full h-full font-textBoxFont font-semibold">
						<div className="flex justify-start items-center w-full h-[20px] text-white text-[12px]">
							내 참여 정보
						</div>
						<div className="flex flex-col justify-between items-center w-full h-[175px]">
							<div className="flex flex-row relative justify-start items-start w-full h-[100px]">
								<div className="flex justify-center items-center w-[100px] h-full rounded-[10px] overflow-hidden">
									<img
										src={
											userChallengeParticipateData[challengeId]?.look?.imageUrl
										}
										alt="myChallenge"
										className="flex justify-center items-center w-full h-full object-cover"
									/>
								</div>
								<div className="flex flex-col justify-between items-start w-[200px] h-[80px] ml-[9px]">
									<div className="flex flex-row justify-start items-center w-full h-[32px] text-[12px]">
										{profileData?.nickname}은 현재
									</div>
									<div className="flex flex-col justify-between items-start w-full h-[48px] text-[24px]">
										<div className="flex flex-row justify-start items-center w-full h-[20px]">
											{userChallengeParticipateData[challengeId]?.ranking}등
											(상위
											{Math.floor(
												(userChallengeParticipateData[challengeId]?.ranking /
													challengeParticipantsData[challengeId]?.totalCount) *
													100,
											)}
											%)
										</div>
										<div className="flex flex-row justify-start items-center w-full h-[20px]">
											{userChallengeParticipateData[challengeId]?.lScore} 점
										</div>
									</div>
								</div>
								<Link
									className="flex justify-center items-center absolute top-[8px] right-0 cursor-pointer"
									href={{
										pathname: "/service/challenge/participate",
										query: { id: challengeId },
									}}
								>
									<Pencil />
								</Link>
							</div>
							<Link
								className="flex flex-col justify-center items-center w-full h-[60px] rounded-[39px] border-2 border-white cursor-pointer text-[24px]"
								href={{
									pathname: "/service/challenge/evaluate",
									query: { id: challengeId },
								}}
							>
								다른 스타일 평가하기
							</Link>
						</div>
					</div>
				) : (
					<>
						{(currentChallengeData.challengeName.includes("남성") &&
							profileData.gender === "여성") ||
						(currentChallengeData.challengeName.includes("여성") &&
							profileData.gender === "남성") ? (
							<>
								<div className="flex justify-center items-center w-[48%] h-[70px] rounded-[20px] border-2 text-[#9B9BA1] border-[#9B9BA1]">
									등록하기
								</div>
							</>
						) : (
							<Link
								className="flex justify-center items-center w-[48%] h-[70px] rounded-[20px] border-2 border-white cursor-pointer "
								href={{
									pathname: "/service/challenge/participate",
									query: { id: challengeId },
								}}
							>
								등록하기
							</Link>
						)}

						<Link
							className="flex justify-center items-center w-[48%] h-[70px] rounded-[20px] border-2 border-white cursor-pointer"
							href={{
								pathname: userTutorialData.complete
									? "/service/challenge/evaluate"
									: "/service/challenge/evaluate",
								// : "/service/challenge/tutorial",
								query: { id: challengeId },
							}}
						>
							평가하기
						</Link>
					</>
				)}
			</div>

			{(currentChallengeData.challengeName.includes("남성") &&
				profileData.gender === "여성") ||
			(currentChallengeData.challengeName.includes("여성") &&
				profileData.gender === "남성") ? (
				<div className="flex justify-start items-center text-[6px] w-full pt-[5px] text-[#9B9BA1]">
					{`해당 챌린지는 ${
						profileData.gender === "여성" ? "남성" : "여성"
					} 유저만 등록하실 수 있습니다.`}
				</div>
			) : null}
		</div>
	)
}
