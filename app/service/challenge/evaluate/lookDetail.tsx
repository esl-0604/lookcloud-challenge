"use client"

import BookMarkOff from "@/public/svg/bookmarkOff.svg"
import BookMarkOn from "@/public/svg/bookmarkOn.svg"
import NextBtn from "@/public/svg/next.svg"
import Good from "@/public/svg/thumbsup.svg"
import Bad from "@/public/svg/thumbsdown.svg"
import { useContext, useState } from "react"
import { ChallengeImgContext } from "./mainNoswipe"

export default function ChallengeEvaluateLookDetail() {
	const { challengeImgList, currentImg, like, canBeNext, NextImg } =
		useContext(ChallengeImgContext)

	const [bookMark, setBookMark] = useState<Boolean>(false)

	return (
		<div className="flex-1 flex flex-col justify-center items-center w-full px-[5%] bg-black">
			<div className="flex flex-col justify-center items-center w-full relative">
				<img
					src={challengeImgList[currentImg - 1]?.look?.imageUrl}
					alt="evaluate_img"
					className="object-cover w-full"
				/>
				<div className="absolute bottom-0 left-0 flex flex-row justify-center items-end w-full h-[177px] px-[10px] py-[25px] bg-gradient-to-b from-transparent to-black text-white text-[12px] font-textBoxFont">
					<div className="flex flex-row justify-between items-center w-full h-[70px]">
						{challengeImgList[currentImg - 1]?.look?.description}
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
								{currentImg > 0
									? "@" +
									  challengeImgList[currentImg - 1]?.user?.instagramUserName
									: null}
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

				<div className="flex flex-col justify-start items-start w-full mt-[12px] text-white text-[12px] font-textBoxFont">
					{challengeImgList[currentImg - 1]?.look?.parts.map(
						(formattedItem: any, index: number) => (
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
						),
					)}
				</div>
				{canBeNext ? (
					<div
						className="flex justify-center items-center absolute top-[114px] right-0"
						onClick={NextImg}
					>
						<NextBtn className="cursor-pointer" />
					</div>
				) : null}
			</div>
		</div>
	)
}
