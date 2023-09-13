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
			className="p-4 w-[100%] h-[100%] flex flex-col items-center"
			onTouchStart={handleTouch}
		>
			<div>
				<div className="h-full w-full relative">
					<img
						src="/image/image.png"
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
								고연전을 즐기기위한 편한 무지 티를 기반으로 만든 룩
							</span>
						</div>
					</div>
				</div>
			</div>
			<span className="w-[100%] text-right pl-10 text-lg text-white">
				{tutorialPageNum}/10
			</span>
		</div>
	)
}
