"use client"

import Boundary from "@/app/components/Boundary"
import Box from "@/app/components/Box"
import LookInfoBox from "@/app/components/LookInfoBox"
import ThumbsDownBox from "@/app/components/ThumbsDownBox"
import ThumbsUpBox from "@/app/components/ThumbsUpBox"
import { inrange } from "@/app/utils"
import {
	userProfileState,
	userProfileType,
} from "@/app/utils/atoms/serviceGlobalState"
import registDragEvent from "@/app/utils/registDragEvent"
import { useSearchParams } from "next/navigation"
import { createContext, useEffect, useRef, useState } from "react"
import { useRecoilState } from "recoil"
import { dummyList } from "./lookImgDummy"
import Next from "@/public/svg/swipeup.svg"
import CheckBox from "./checkbox"

const BOUNDARY_MARGIN = 0
const DEFAULT_W = 300
const DEFAULT_H = 450

interface ConfigState {
	x: number
	y: number
}
export const ChallengeImgContext = createContext<any>(null)

export default function ChallengeEvaluateMain() {
	const param = useSearchParams()
	const challengeId = param.get("id")
	const boundaryRef = useRef<HTMLDivElement>(null)

	const [profileData, setProfileData] =
		useRecoilState<userProfileType>(userProfileState)

	const [{ x, y }, setConfig] = useState<ConfigState>({
		x: 0,
		y: 40,
	})
	const [isUp, setIsUp] = useState<boolean>(false)
	const [isDown, setIsDown] = useState<boolean>(false)
	const [showThumbs, setShowThumbs] = useState<boolean>(false)
	const [isInfo, setIsInfo] = useState<boolean>(false)
	const [challengeImgList, setChallengeImgList] = useState<any[]>([])
	const [currentImg, setCurrentImg] = useState<number>(0)
	const [currentImgEvaluate, setCurrentImgEvaluate] = useState<boolean>(true)
	const [canBeNext, setCanBeNext] = useState<boolean>(false)
	const [isNoMoreLook, setIsNoMoreLook] = useState<boolean>(false)
	const [imageLoaded, setImageLoaded] = useState<boolean>(false)
	const [imageUrl, setImageUrl] = useState<string>("")

	useEffect(() => {
		const boundary = boundaryRef.current?.getBoundingClientRect()

		if (boundary) {
			setConfig({
				x: Math.floor(boundary.width / 2 - DEFAULT_W / 2),
				y: 40,
			})
		}
	}, [])

	useEffect(() => {
		if (showThumbs) {
			const timer = setTimeout(() => {
				setShowThumbs(false)
				setIsInfo(true)
			}, 300)
			return () => clearTimeout(timer) // 타이머 해제
		}
	}, [showThumbs])

	useEffect(() => {
		if ((isUp || isDown) && profileData.userToken) {
			setShowThumbs(true)
			const evaluate = isUp ? 1 : 0
			// console.log(evaluate)
			const userId = profileData.userToken
			// console.log(userId)
			const participationId = challengeImgList[currentImg - 1]?.participationId
			// console.log(participationId)

			// 평가 코드 --------------------------------
			// setCurrentImgEvaluate(true)
			EvaluateImg(userId, evaluate, participationId)
			// --------------------------------------------
		} else setShowThumbs(false)
	}, [isUp, isDown, profileData])

	useEffect(() => {
		if (Math.floor(y) <= 0) setIsUp(true)
		else if (Math.floor(y) >= 80) setIsDown(true)
		else {
			setIsUp(false)
			setIsDown(false)
		}
	}, [y])

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

	useEffect(() => {
		if (currentImg > 0) {
			const imageUrl = challengeImgList[currentImg - 1]?.look?.imageUrl
			if (imageUrl) {
				const img = new Image()
				img.src = imageUrl
				img.onload = () => {
					setImageUrl(imageUrl)
					setImageLoaded(true)
				}
			}
		}
	}, [currentImg, challengeImgList])

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
				} else setCurrentImgEvaluate(true)
			})
			.catch((error) => console.log(error))
	}

	const NextImg = () => {
		setCurrentImgEvaluate(false)
		setCurrentImg((prev) => prev + 1)
		setIsUp(false)
		setIsDown(false)
		setShowThumbs(false)
		setIsInfo(false)
		setConfig({
			x: 0,
			y: 40,
		})
	}

	return (
		<ChallengeImgContext.Provider
			value={{ challengeImgList, currentImg, currentImgEvaluate }}
		>
			<div className="flex flex-col justify-center items-center relative w-full h-full px-4 ">
				{isNoMoreLook ? <CheckBox /> : null}
				{isUp ? (
					<div>
						{isInfo && currentImgEvaluate ? (
							<div className="flex">
								<LookInfoBox />
							</div>
						) : (
							<div className="absolute left-1/2 top-[calc(50%-50px)] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[450px]">
								<ThumbsUpBox />
							</div>
						)}
					</div>
				) : isDown ? (
					<div>
						{isInfo && currentImgEvaluate ? (
							<div className="flex">
								<LookInfoBox />
							</div>
						) : (
							<div className="absolute left-1/2 top-[calc(50%+50px)] -translate-x-1/2 -translate-y-1/2 w-[300px] h-[450px]">
								<ThumbsDownBox />
							</div>
						)}
					</div>
				) : imageLoaded ? (
					<Boundary
						ref={boundaryRef}
						style={{
							width: 300,
							height: 550,
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					>
						<div
							style={{
								left: x,
								top: y,
								width: DEFAULT_W,
								height: DEFAULT_H,
							}}
							className="relative"
							{...registDragEvent((deltaX, deltaY) => {
								if (!boundaryRef.current) return

								const boundary = boundaryRef.current.getBoundingClientRect()

								setConfig({
									x: inrange(
										x + deltaX,
										BOUNDARY_MARGIN,
										boundary.width - DEFAULT_W - BOUNDARY_MARGIN,
									),
									y: inrange(
										y + deltaY,
										BOUNDARY_MARGIN,
										boundary.height - DEFAULT_H - BOUNDARY_MARGIN,
									),
								})
							})}
						>
							<Box />
						</div>
					</Boundary>
				) : isNoMoreLook ? null : (
					<div style={{ width: 300, height: 450 }}>
						<div className="h-full w-full relative">
							<div className="w-full h-full bg-black flex items-center justify-center">
								<img src="/svg/spinner.svg" alt="image" />
							</div>
							<div
								className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#333333] to-[#333333]"
								style={{
									zIndex: 10,
									height: "15%",
								}}
							>
								<div className="absolute bottom-3 ml-2">
									<span className="text-left text-xs text-white">
										이미지를 불러오는 중입니다, 잠시만 기다려주세요
									</span>
								</div>
							</div>
						</div>
					</div>
				)}
				{currentImgEvaluate && currentImg > 0 && canBeNext ? (
					<div
						className="absolute top-[40%] right-[15px] transform-translate-y-[40%] rotate-90"
						onClick={NextImg}
					>
						<Next />
					</div>
				) : null}
			</div>
		</ChallengeImgContext.Provider>
	)
}
