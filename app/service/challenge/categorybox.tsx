"use client"

import { useEffect } from "react"
import { useRecoilState } from "recoil"
import {
	challengeInfoType,
	userProfileState,
} from "@/app/utils/atoms/serviceGlobalState"

export default function ChallengeCategoryBox({
	challengeId,
	challengeName,
	startDate,
	endDate,
	thumbnail,
	comment,
	participantsNum,
}: challengeInfoType) {
	// const [profileData, setProfileData] = useRecoilState<any>(userProfileState)
	// let Title = challengTitle
	// if (challengTitle === "고연전" && profileData.organization === "연세대학교") {
	// 	Title = "연고전"
	// }

	const today: Date = new Date()
	const hasDday: boolean = startDate
		? startDate.getTime() <= today.getTime()
			? true
			: false
		: false
	const diffDate: number = endDate ? endDate.getTime() - today.getTime() : -1
	const dDay: number = Math.floor(diffDate / (1000 * 60 * 60 * 24))

	return (
		<div
			className={`flex justify-center items-center relative w-[100%] h-[350px] mb-[24px] ${
				dDay ? "cursor-pointer" : null
			}`}
		>
			<img
				src={thumbnail}
				alt="challengeImg"
				className="flex justify-center items-center w-[100%] h-[100%] object-cover"
			/>
			<div className="flex flex-col justify-center items-start absolute bottom-[4px] w-[100%] h-[106px] text-white font-normal">
				<div className="w-[100%] px-[12px] h-[40px] font-semibold text-[30px]">
					{challengeName}
				</div>
				<div className="flex justify-start items-center w-[100%] px-[12px] h-[20px] text-[12px]">
					{hasDday ? (
						<>
							<div className="flex justify-end items-center h-[100%]">
								D-{dDay === 0 ? "Day" : dDay}
							</div>
							<div className="flex justify-end items-center w-[70px] h-[100%]">
								{participantsNum}명 참가중
							</div>
						</>
					) : (
						<div className="flex justify-start items-center w-[100%] h-[100%] font-textBoxFont2">
							comming soon
						</div>
					)}
				</div>
				<div className="flex justify-start items-center w-[100%] h-[36px] px-[12px] text-[12px]">
					<div>{comment}</div>
				</div>
			</div>
		</div>
	)
}
