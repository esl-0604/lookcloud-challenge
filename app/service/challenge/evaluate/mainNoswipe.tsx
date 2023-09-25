"use client"

import {
	userProfileState,
	userProfileType,
} from "@/app/utils/atoms/serviceGlobalState"
import { useSearchParams } from "next/navigation"
import { createContext, useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import CheckBox from "./checkbox"
import SpinnerBox from "@/app/components/spinner"
import ChallengeEvaluateLookDetail from "./lookDetail"

export const ChallengeImgContext = createContext<any>(null)

export default function ChallengeEvaluateMainNoSwipe() {
	const param = useSearchParams()
	const challengeId = param.get("id")

	const [profileData, setProfileData] =
		useRecoilState<userProfileType>(userProfileState)

	const [loading, setLoading] = useState<boolean>(true)
	const [showThumbs, setShowThumbs] = useState<number>(-1)
	const [like, setLike] = useState<boolean>(false)
	const [challengeImgList, setChallengeImgList] = useState<any[]>([])
	const [currentImg, setCurrentImg] = useState<number>(0)
	const [currentImgEvaluate, setCurrentImgEvaluate] = useState<boolean>(true)
	const [canBeNext, setCanBeNext] = useState<boolean>(false)
	const [isNoMoreLook, setIsNoMoreLook] = useState<boolean>(false)

	useEffect(() => {
		if (showThumbs > -1 && profileData.userToken) {
			const participationId = challengeImgList[currentImg - 1]?.participationId
			EvaluateImg(profileData.userToken, showThumbs, participationId)
		}
	}, [showThumbs])

	useEffect(() => {
		console.log({ "현재 위치 : ": currentImg })
		console.log({ "현재 위치 평가 : ": currentImgEvaluate })
		console.log({ "총 길이 : ": challengeImgList.length })
		if (challengeId && profileData.userToken && currentImgEvaluate) {
			if (challengeImgList.length === currentImg) {
				setCanBeNext(false)
				GetChallengeImgs(profileData.userToken)
			} else if (challengeImgList.length > currentImg) {
				setCanBeNext(true)
			}
		}
	}, [
		challengeId,
		challengeImgList,
		profileData,
		currentImg,
		currentImgEvaluate,
	])

	//----------------------------------------------------------------------------

	const GetChallengeImgs = async (userToken: string) => {
		const GET_CHALLENGEIMAGES_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/challenges/${challengeId}/participations-to-evaluate?userId=${userToken}&pageSize=5`
		await fetch(GET_CHALLENGEIMAGES_URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				if (data) {
					console.log(data)
					if (data.length > 0) {
						setIsNoMoreLook(false)
						const tempList = [...challengeImgList]
						const newList = tempList.concat(data)
						setChallengeImgList(newList)
						setLoading(false)
						if (currentImg === 0) {
							setCurrentImg((prev) => prev + 1)
							setCurrentImgEvaluate(false)
						}
					} else {
						console.log("평가할 룩이 더이상 없습니다.")
						setIsNoMoreLook(true)
					}
				} else {
					console.log(message)
					// const newList = challengeImgList.concat(dummyList)
					// setChallengeImgList(newList)
					// if (currentImg === 0) {
					// 	setCurrentImg((prev) => prev + 1)
					// 	setCurrentImgEvaluate(false)
					// }
				}
			})
			.catch((error) => console.log(error))
	}

	const EvaluateImg = async (
		userId: string,
		rating: number,
		participationId: string,
	) => {
		if (rating === 1) setLike(true)
		else setLike(false)
		const POST_EVALUATEIMAGE_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/challenges/${challengeId}/evaluate`
		await fetch(POST_EVALUATEIMAGE_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({
				userId: userId,
				evaluation: {
					participationId: participationId,
					rating: rating,
				},
			}),
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				if (
					status === "ILLEGAL_ARGUMENT" ||
					status === "NOT_FOUND" ||
					status === "BAD_REQUEST"
				) {
					console.log(message)
					setCurrentImgEvaluate(false)
				} else {
					setCurrentImgEvaluate(true)
					setShowThumbs(-1)
				}
			})
			.catch((error) => console.log(error))
	}

	const NextImg = () => {
		setCurrentImgEvaluate(false)
		setCurrentImg((prev) => prev + 1)
		setShowThumbs(-1)
	}

	return (
		<ChallengeImgContext.Provider
			value={{
				challengeImgList,
				currentImg,
				currentImgEvaluate,
				like,
				canBeNext,
				NextImg,
			}}
		>
			{loading ? (
				<div className="flex-1 flex flex-col justify-center items-center w-full px-[4%] bg-black">
					{isNoMoreLook ? (
						<CheckBox />
					) : (
						<SpinnerBox text="이미지를 불러오는 중입니다, 잠시만 기다려주세요" />
					)}
				</div>
			) : (
				<>
					{isNoMoreLook ? <CheckBox /> : null}
					{currentImgEvaluate ? (
						<ChallengeEvaluateLookDetail />
					) : (
						<div className="flex-1 flex flex-col justify-center items-center w-full px-[4%] bg-black">
							<div className="flex justify-center items-center w-full relative">
								<img
									src={challengeImgList[currentImg - 1]?.look?.imageUrl}
									alt="evaluate_img"
									className="object-cover w-full"
								/>
								<div className="absolute bottom-0 left-0 flex flex-row justify-start items-end w-full h-[177px] px-[10px] py-[25px] bg-gradient-to-b from-transparent to-black text-white text-[12px] font-textBoxFont">
									{challengeImgList[currentImg - 1]?.look?.description}
									{/* 고연전을 즐기기위한 편한 무지 티를 기반으로 만든 룩 */}
								</div>
								{showThumbs > -1 ? (
									<div className="absolute top-0 left-0 flex justify-center items-center w-full h-full bg-opacity-25 bg-black">
										{showThumbs === 1 ? (
											<div className="w-[17%] h-0 pb-[14.9%] relative">
												<img
													src="/svg/thumbsup.svg"
													alt="Good"
													className="absolute w-full h-full object-cover"
												/>
											</div>
										) : (
											<div className="w-[17%] h-0 pb-[14.9%] relative">
												<img
													src="/svg/thumbsdown.svg"
													alt="Bad"
													className="absolute w-full h-full object-cover"
												/>
											</div>
										)}
									</div>
								) : null}
							</div>

							<div className="flex flex-row justify-between items-center w-full max-w-[400px] py-[15px] mb-[100px]">
								<div
									className="w-[17%] h-0 pb-[14.9%] relative cursor-pointer"
									onClick={() => setShowThumbs(0)}
								>
									<img
										src="/svg/thumbsdown.svg"
										alt="Bad"
										className="absolute w-full h-full object-cover"
									/>
								</div>
								<div
									className="w-[17%] h-0 pb-[14.9%] relative cursor-pointer"
									onClick={() => setShowThumbs(1)}
								>
									<img
										src="/svg/thumbsup.svg"
										alt="Good"
										className="absolute w-full h-full object-cover"
									/>
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</ChallengeImgContext.Provider>
	)
}
