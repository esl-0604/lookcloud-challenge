"use client"

import { useContext } from "react"
import { ChallengeInfoContext } from "./context"

export default function DescriptionInput() {
	const { isAlreadyPosted, lookDescription, setLookDescription } =
		useContext(ChallengeInfoContext)

	return (
		<div className="flex flex-col justify-between items-center w-full h-[155px] px-[4%] py-[15px] text-white text-[12px] font-textBoxFont">
			<div className="flex justify-start items-center w-[100%] h-[20px] font-semibold">
				룩에 대한 설명
			</div>
			<div className="flex flex-col justify-between items-center w-full h-[105px] font-bold relative">
				<textarea
					readOnly={isAlreadyPosted}
					rows={3}
					maxLength={105}
					className="w-full h-[100%] bg-transparent focus: outline-none placeholder-[#959595] leading-[36px] overflow-hidden "
					placeholder="룩에 대한 설명을 써주세요. ex) 고연전을 편하게 즐기기 위해 자연스러운 룩"
					value={lookDescription}
					onChange={(e) => {
						setLookDescription(e.target.value)
					}}
				/>
				<div className="absolute top-[32px] w-full h-[3px] bg-white z-10"></div>
				<div className="absolute top-[67px] w-full h-[3px] bg-white z-10"></div>
				<div className="absolute top-[102px] w-full h-[3px] bg-white z-10"></div>
			</div>
		</div>
	)
}
