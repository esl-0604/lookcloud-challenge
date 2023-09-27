"use client"

import BookMarkOff from "@/public/svg/bookmarkOff.svg"
import BookMarkOn from "@/public/svg/bookmarkOn.svg"
import NextBtn from "@/public/svg/next.svg"
import Good from "@/public/svg/thumbsup.svg"
import Bad from "@/public/svg/thumbsdown.svg"
import { useContext, useEffect, useState } from "react"
import { ChallengeImgContext } from "./mainNoswipe"
import {
	partType,
	userProfileState,
	userProfileType,
} from "@/app/utils/atoms/serviceGlobalState"
import { useRecoilState } from "recoil"

export default function ChallengeEvaluateLookDetail() {
	const { challengeImgList, currentImg, like, canBeNext, NextImg } =
		useContext(ChallengeImgContext)

	let tempList = [...challengeImgList[currentImg - 1]?.look?.parts]
	const partsData: partType[] = tempList.sort(
		(a: partType, b: partType) => a.index - b.index,
	)
	const [profileData, setProfileData] =
		useRecoilState<userProfileType>(userProfileState)

	const [bookMark, setBookMark] = useState<Boolean>(false)
	const [sendStatistic, setSendStatistic] = useState<boolean>(false)

	useEffect(() => {
		console.log(profileData.userToken)
		console.log(challengeImgList[currentImg - 1]?.participationId)
		if (
			profileData.userToken &&
			challengeImgList[currentImg - 1]?.participationId &&
			bookMark &&
			!sendStatistic
		) {
			Statistic(
				profileData.userToken,
				challengeImgList[currentImg - 1]?.participationId,
			)
		}
	}, [bookMark, sendStatistic, profileData, challengeImgList, currentImg])

	const Statistic = async (userToken: string, participationId: string) => {
		const STATISTIC_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/statistics/saving`
		await fetch(STATISTIC_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({
				userId: userToken,
				participationId: participationId,
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
				} else {
					// console.log(data)
					setSendStatistic(true)
				}
			})
			.catch((error) => console.log(error))
	}

	return (
		<div className="flex-1 flex flex-col justify-center items-center w-full px-[4%] bg-black">
			<div className="flex flex-col justify-center items-center w-full relative">
				<img
					src={challengeImgList[currentImg - 1]?.look?.imageUrl}
					alt="evaluate_img"
					className="object-cover w-full"
				/>
				<div className="absolute bottom-0 left-0 flex flex-row justify-center items-end w-full h-[177px] px-[10px] py-[25px] bg-gradient-to-b from-transparent to-black text-white text-[12px] font-textBoxFont">
					<div className="flex flex-row justify-between items-center w-full h-[70px]">
						<div>{challengeImgList[currentImg - 1]?.look?.description}</div>
						{/* 고연전을 즐기기위한 편한 무지 티를 기반으로 만든 룩 */}
						<div className="flex justify-center items-center">
							{like ? (
								<Good width={40} height={35} />
							) : (
								<Bad width={40} height={35} />
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="flex flex-col justify-center items-center w-full mt-[12px] mb-[100px] relative">
				<div className="flex flex-row justify-between items-center w-full h-[50px]">
					<div className="flex flex-row justify-start items-center">
						<div className="flex justify-center items-center w-[50px] h-[50px] rounded-full overflow-hidden">
							<img
								className="object-cover w-full h-full"
								src="/svg/sampleProfileImg.svg"
							/>
						</div>

						<div className="flex flex-col justify-between items-start h-[40px] text-white text-[12px] font-bold font-textBoxFont ml-[6px]">
							<div className="h-[20px]">
								{currentImg > 0
									? challengeImgList[currentImg - 1]?.user?.nickName
									: null}
							</div>
							<div className="h-[20px]">
								{currentImg > 0 &&
								challengeImgList[currentImg - 1]?.user?.instagramUserName
									? "@" +
									  challengeImgList[currentImg - 1]?.user?.instagramUserName
									: ""}
							</div>
						</div>
					</div>

					<div className="flex flex-row justify-end items-center h-full text-white text-[24px] font-textBoxFont font-bold">
						<div className="px-[15px]">
							{challengeImgList[currentImg - 1]?.lScore}
						</div>
						<div className="cursor-pointer">
							{bookMark ? (
								<BookMarkOn onClick={() => setBookMark(!bookMark)} />
							) : (
								<BookMarkOff onClick={() => setBookMark(!bookMark)} />
							)}
						</div>
					</div>
				</div>

				<div className="flex flex-row justify-between items-center w-full mt-[12px]">
					<div className="flex flex-col justify-start items-start text-white text-[12px] font-textBoxFont">
						{partsData.map((formattedItem: any, index: number) => (
							<div
								key={index}
								className="flex flex-row justify-start items-center h-[20px]"
							>
								{formattedItem.part +
									" - " +
									formattedItem.brand +
									" " +
									formattedItem.name}
							</div>
						))}
					</div>

					<NextBtn
						className="cursor-pointer"
						color={canBeNext ? "white" : "#D4D4D4"}
						onClick={NextImg}
					/>
				</div>
			</div>
		</div>
	)
}
