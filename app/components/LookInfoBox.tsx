"use client"

import { useContext } from "react"
import { ChallengeImgContext } from "../service/challenge/evaluate/main"

interface itemProps {
	part: string
	brand: string
	name: string
}
export default function LookInfoBox() {
	const { challengeImgList, currentImg, currentImgEvaluate } =
		useContext(ChallengeImgContext)
	const data =
		currentImg > 0 && challengeImgList.length > 0
			? challengeImgList[currentImg - 1]["look"]["parts"]
			: null

	// 변환된 데이터를 원하는 형식으로 가공
	const formattedData: string[] = data.map((item: itemProps) => {
		return `${item.part} - ${item.brand} ${item.name}`
	})

	return (
		<div className="flex flex-col w-full h-full ">
			<div className="h-full w-full relative">
				<img
					src={
						currentImg > 0 && challengeImgList.length > 0
							? challengeImgList[currentImg - 1]["look"]["imageUrl"]
							: null
					}
					alt="image"
					style={{ width: "300px", height: "450px" }}
				/>
				<div
					className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#333333] to-[#333333]"
					style={{
						zIndex: 10,
						height: "15%",
					}}
				>
					<div className="absolute bottom-3 ml-2">
						<span className="text-left text-xs text-white">
							{currentImg > 0
								? challengeImgList[currentImg - 1]["look"]["description"]
								: "고연전을 즐기기위한 편한 무지 티를 기반으로 만든 룩"}
						</span>
					</div>
				</div>
			</div>
	
		</div>
	)
}
