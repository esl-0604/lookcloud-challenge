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
		currentImg > 0 ? challengeImgList[currentImg - 1]["look"]["parts"] : null

	// 변환된 데이터를 원하는 형식으로 가공
	const formattedData: string[] = data.map((item: itemProps) => {
		return `${item.part} - ${item.brand} ${item.name}`
	})

	return (
		<div className="flex flex-col w-full h-full ">
			<div className="h-full w-full relative">
				<img
					src={
						currentImg > 0
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
			<div className="flex flex-col mt-[12px]">
				<div className="flex flex-row justify-between items-center w-[100%] h-[40px] bg-black mt-1 rounded-md px-[8px]">
					<div className="flex flex-row">
						<img
							className="rounded-full"
							src="/svg/sampleProfileImg.svg"
							width="50px"
							height="50px"
							style={{ marginRight: 4 }}
						/>
						<div className="flex flex-col py-[8px]">
							<div className="flex flex-row">
								<span className="text-white text-[8px]">
									{currentImg > 0
										? challengeImgList[currentImg - 1]["user"]["nickName"]
										: null}
								</span>
							</div>
							<span className="text-white text-[8px] leading-[8px]">
								@
								{currentImg > 0
									? challengeImgList[currentImg - 1]["user"][
											"instagramUserName"
									  ]
									: null}
							</span>
						</div>
					</div>
					<span className="text-white text-[24px]">
						{currentImg > 0 ? challengeImgList[currentImg - 1]["lScore"] : null}
					</span>
				</div>
				<div className="flex flex-col mt-[12px]">
					{formattedData.map((formattedItem: string, index: number) => (
						<span key={index} className="text-white text-[12px]">
							{formattedItem}
						</span>
					))}
				</div>
			</div>
		</div>
	)
}
