"use client"

import SelectButton from "@/app/init/onboarding/selectbutton"
import { useContext } from "react"
import { GenderContext } from "./context"

export default function OnboardingGenderInput() {
	const { gender, setGender }: any = useContext(GenderContext)
	return (
		<div className="flex flex-col justify-between items-center w-full h-[104px] mb-[24px] text-[24px] font-textBoxFont ">
			<div
				className="flex justify-center items-center w-full"
				onClick={() => setGender("FEMALE")}
			>
				<SelectButton
					text={"여성"}
					selectedTheme={
						gender === "FEMALE"
							? "text-[#557AFF] border-[#557AFF]"
							: "text-[#D9D9D9] border-[#D9D9D9]"
					}
				/>
			</div>
			<div
				className="flex justify-center items-center w-full"
				onClick={() => setGender("MALE")}
			>
				<SelectButton
					text={"남성"}
					selectedTheme={
						gender === "MALE"
							? "text-[#557AFF] border-[#557AFF]"
							: "text-[#D9D9D9] border-[#D9D9D9]"
					}
				/>
			</div>
		</div>
	)
}
