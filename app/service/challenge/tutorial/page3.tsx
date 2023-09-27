"use client"

import TutorialBox2 from "@/app/components/TutorialBox2"
import { useContext } from "react"
import { TutorialPageContext } from "./main"

export default function Page3() {
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
			<div className="flex flex-row w-[100%] items-center justify-center">
				<img className="w-50 pr-5" src="/svg/swipeup.svg" alt="image" />
				<span className="text-xs text-white">
					사진이 마음에 들면 위로 스와이프해주세요
				</span>
			</div>

			<div style={{ marginTop: "10px", marginBottom: "10px" }}>
				<TutorialBox2 />
			</div>
			<div className="flex flex-row w-[100%] items-center justify-center">
				<img className="w-50 pr-5" src="/svg/swipedown.svg" alt="image" />
				<span className="text-xs text-white">
					사진이 아쉬우면 아래로 스와이프해주세요
				</span>
				<span className="absolute top-[620px] w-full text-right pr-5 text-[24px] text-white">
					{tutorialPageNum}/10
				</span>
			</div>
		</div>
	)
}
