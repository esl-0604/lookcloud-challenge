"use client"

import { useContext } from "react"
import { TutorialPageContext } from "./main"

export default function Page6() {
	const { tutorialPageNum, setTutorialPageNum }: any =
		useContext(TutorialPageContext)

	const handleTouch = () => {
		setTutorialPageNum((prevPageNum: any) => prevPageNum + 1)
	}
	return (
		<div
			className="pl-4 pr-4 w-[100%] h-[100%] flex flex-col items-center"
			onTouchStart={handleTouch}
			onClick={handleTouch}
		>
			<div>
				<div className="h-full w-full relative bg-black opacity-75">
					<img
						src="/image/image.png"
						alt="image"
						style={{ width: "300px", height: "450px" }}
					/>
					<img
						src="/svg/thumbsup.svg"
						alt="image"
						style={{
							position: "absolute",
							top: "80%",
							left: "15%",
							transform: "translate(-50%, -50%)",
						}}
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
								고연전을 즐기기위한 편한 무지 티를 기반으로 만든 룩
							</span>
						</div>
					</div>
				</div>
			</div>
			<span className="absolute top-[490px] w-[80%] text-left text-white text-[8px]">
				해당 참여자의 프로필 개요입니다.
			</span>
			<span className="absolute z-10 top-[555px] w-[80%] pl-[180px] text-right text-white text-[8px]">
				해당 룩의 현재L.Score 입니다.
			</span>
			<span className="absolute z-10 top-[570px] w-[80%] text-left text-white text-[8px]">
				해당 참여자가 등록한 룩을 구성한 제품 정보입니다.
			</span>
			<div className="absolute top-[510px] w-[80%] flex flex-col">
				<div className="flex flex-row justify-between items-center w-full h-[40px] bg-black mt-1 rounded-md">
					<div className="flex flex-row ring-1 ring-gray-200 px-2 py-1">
						<img
							className="rounded-full"
							src="/svg/sampleProfileImg.svg"
							width="50px"
							height="50px"
							style={{ marginRight: 4 }}
						/>
						<div className="flex flex-col py-[8px]">
							<div className="flex flex-row">
								<span className="text-white text-[8px]">나는야이은상</span>
							</div>
							<span className="text-white text-[8px] leading-[8px]">
								@eslee850
							</span>
						</div>
					</div>
					<span className="text-white text-[24px] ring-1 ring-gray-200 px-2">
						870
					</span>
				</div>
				<div className="w-[85%] flex flex-col mt-[35px] ring-1 ring-gray-200">
					<span className="text-white text-[12px]">
						상의 - musinsa standard basic cotton t-shirts
					</span>
					<span className="text-white text-[12px]">
						하의 - musinsa standard banding chino pants
					</span>
					<span className="text-white text-[12px]">신발 - 정보 없음</span>
				</div>
			</div>
			<span className="absolute top-[620px] w-full text-right pr-5 text-[24px] text-white">
				{tutorialPageNum}/10
			</span>
		</div>
	)
}
