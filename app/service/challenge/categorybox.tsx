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
	state,
	thumbnail,
	comment,
	participantsNum,
}: challengeInfoType) {
	return (
		<div
			className={`flex justify-center items-center relative w-[100%] h-[350px] mb-[24px] ${
				state >= 0 ? "cursor-pointer" : null
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
					{state >= 0 ? (
						<>
							<div className="flex justify-end items-center h-[100%]">
								D-{state === 0 ? "Day" : state}
							</div>
							<div className="flex justify-end items-center w-[70px] h-[100%]">
								{participantsNum}명 참가중
							</div>
						</>
					) : (
						<div className="flex justify-start items-center w-[100%] h-[100%] font-textBoxFont2">
							{state === -1 ? "comming soon" : "already end"}
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
