"use client"

import HeaderLogo from "@/public/svg/headerlogo.svg"
import Btn from "@/public/svg/btn.svg"
import { useContext } from "react"
import { StepContext } from "./context"

export default function OnboardingHeader() {
	const { step, setStep }: any = useContext(StepContext)

	const StepBackward = () => {
		const stepNum = Number(step.id)
		if (stepNum > 1) setStep({ id: (stepNum - 1).toString() })
	}

	return (
		<div className="flex flex-col justify-start items-center w-[100%]">
			<div className="flex flex-row justify-start items-center w-[100%] h-[56px] pl-[16px]">
				<HeaderLogo width={"126"} height={"32"} color={"black"} />
			</div>
			<div className="flex flex-row justify-start items-center w-[100%] h-[5px] bg-[#D9D9D9]">
				<div
					className={`${
						step.id === "1"
							? "w-1/3"
							: step.id === "2"
							? "w-2/3"
							: step.id === "3"
							? "w-full"
							: "w-full"
					} h-[100%] bg-[#535353] transition-width duration-500`}
				></div>
			</div>
			<div className="flex flex-row justify-start items-center w-[100%] h-[50px] pl-[16px]">
				<div className="cursor-pointer" onClick={StepBackward}>
					<Btn
						width={"15"}
						height={"26"}
						color={step.id === "1" ? "#D9D9D9" : "#535353"}
					/>
				</div>
			</div>
		</div>
	)
}
