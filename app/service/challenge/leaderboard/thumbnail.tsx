"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import {
	challengeInfoList,
	challengeInfoType,
} from "@/app/utils/atoms/serviceGlobalState"
import { useRecoilState } from "recoil"
import Scroll from "@/public/svg/scroll.svg"

export default function LeaderBoardThumbnail() {
	const param = useSearchParams()
	const challengeId = param.get("id") ? Number(param.get("id")) : -1

	const [challengeDataList, setChallengeDataList] =
		useRecoilState<challengeInfoType[]>(challengeInfoList)
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

	// --------------------------------------------------------------
	const [showDetail, setShowDetail] = useState<boolean>(false)

	return (
		<div
			className={`flex flex-col relative justify-start items-center w-[100%] py-[8px] overflow-hidden transition-height duration-500 cursor-pointer ${
				showDetail ? "h-[680px]" : "h-[240px]"
			}`}
			onClick={() => setShowDetail(!showDetail)}
		>
			<div className="absolute w-full h-full">
				<div
					className={`absolute w-full bg-gradient-to-t from-[rgb(0,0,0,0.5)] to-[rgb(217,217,217,0)] h-[350px]`}
				/>
				<img
					src={currentChallengeData?.thumbnailUrl}
					alt="challengeImg"
					className="w-full h-[350px] object-cover"
				/>
			</div>
			<div className="flex-1 flex flex-col justify-center items-start w-full px-[4%] pt-[356px] text-[12px]  font-normal font-textBoxFont">
				{currentChallengeData.comment ? (
					<div className="flex flex-row justify-start items-center w-full py-[5px] mb-[4px]">
						{currentChallengeData.comment}
					</div>
				) : null}

				<div className="flex flex-col justify-center items-start w-full mb-[5px]">
					<div className="flex flex-row justify-start items-center w-full h-[22px] font-semibold">
						챌린지 보상
					</div>
					{currentChallengeData.challengeName === "페스티벌 룩" ? (
						<ol className="flex flex-col justify-center items-start w-full h-[60px]">
							<li>1등: 10만원</li>
							<li>2등: 5만원</li>
							<li>3등: 3만원</li>
						</ol>
					) : (
						<ol className="flex flex-col justify-center items-start w-full h-[60px]">
							<li>1등: 5만원</li>
							<li>2등: 3만원</li>
							<li>3등: 2만원</li>
						</ol>
					)}
				</div>

				<div className="flex flex-col justify-center items-start w-full mb-[5px]">
					<div className="flex flex-row justify-start items-center w-full h-[22px] font-semibold">
						챌린지 기간
					</div>
					<div className="flex flex-row justify-start items-center w-full">
						{currentChallengeData.startedAt?.slice(0, 10).replace(/-/g, ".") +
							" ~ " +
							currentChallengeData.endedAt?.slice(0, 10).replace(/-/g, ".")}
					</div>
				</div>

				<div className="flex flex-col justify-center items-start w-full">
					<div className="flex flex-col justify-center items-start w-full mb-[5px]">
						<div className="flex flex-row justify-start items-center w-full h-[22px] font-semibold">
							챌린지 참여 방법
						</div>
						<div className="flex flex-row justify-start items-center w-full">
							{`아래 ‘등록하기' 버튼을 통해 참여를 희망하는 이미지를 선택하여
							참여가능`}
						</div>
					</div>

					<div className="flex flex-col justify-center items-start w-full mb-[5px]">
						<div className="flex flex-row justify-start items-center w-full h-[22px] font-semibold">
							챌린지 평가 방법
						</div>
						<div className="flex flex-row justify-start items-center w-full">
							{`‘평가하기'를 통해 다른 사람들의 참여 룩을 ‘좋아요', ‘싫어요'로
							평가`}
						</div>
					</div>

					<div className="flex flex-col justify-center items-start w-full mb-[5px]">
						<div className="flex flex-row justify-start items-center w-full h-[22px] font-semibold">
							챌린지 순위 결정 기준
						</div>
						<div className="flex flex-row justify-start items-center w-full">
							{`다른 사람들이 평가한 기록을 바탕으로 ‘상대적인' 순위 책정`}
						</div>
					</div>
				</div>
			</div>

			<div
				className={`flex flex-col justify-end items-start absolute bottom-[10px] w-[100%] px-[15px] py-[8px] h-[108px] text-white font-normal transition-bottom duration-500 ${
					showDetail ? "top-[250px]" : "top-[130px]"
				}`}
			>
				<div className="w-[100%] h-[40px] font-semibold text-[30px]">
					{currentChallengeData?.challengeName}
				</div>
				<div className="relative flex justify-start items-center w-[100%] h-[20px] text-[12px]">
					{/* <div className="flex justify-end items-center h-[100%]">
						D-
						{currentChallengeData?.state === 0
							? "Day"
							: currentChallengeData?.state}
					</div> */}
					<div className="flex justify-start items-center w-[70px] pl-[5px] h-[100%]">
						{currentChallengeData?.totalCount}명 참가중
					</div>
					<div className="flex justify-end items-center w-[110px] h-[100%]">
						{currentChallengeData.challengeName === "페스티벌 룩"
							? "총 상금 180,000원"
							: "총 상금 100,000원"}
					</div>
					<Scroll
						className={`absolute bottom-0 right-0 animate-scroll-down-indicator transition-all duration-500 opacity-100 
						${showDetail ? "rotate-180" : null}`}
					/>
				</div>

				{/* <div className="flex flex-col justify-center items-start w-[100%] h-[48px] text-[12px]">
					{currentChallengeData?.comment}
				</div> */}
			</div>
		</div>
	)
}
