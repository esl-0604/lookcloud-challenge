"use client"

import TutorialBox2 from "@/app/components/TutorialBox2"
import { useContext } from "react"
import { TutorialPageContext } from "./main"

export default function Page2() {
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
			<div className="flex flex-row w-[100%] items-start">
				<span className="w-full text-left pl-5 text-lg text-black">
					화면을 터치하면 다음 설명
					<div />
					으로 넘어갑니다
				</span>
			</div>
			<div style={{ marginTop: "10px" }}>
				<TutorialBox2 />
			</div>
			<div className="flex flex-row w-[100%] items-end">
				<span className="w-full text-left pl-5 text-lg text-white">
					해당 참가자가 등록한 룩에 대<div />한 상세 설명입니다.
				</span>
			</div>
			<span className="absolute top-[620px] w-full text-right pr-5 text-[24px] text-white">
				{tutorialPageNum}/10
			</span>
		</div>
	)
}
