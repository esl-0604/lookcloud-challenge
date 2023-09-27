"use client"

import { useState, useEffect } from "react"
import OnboardingGenderInput from "@/app/init/onboarding/genderinput"
import OnboardingHeader from "@/app/init/onboarding/header"
import OnboardingNameInput from "@/app/init/onboarding/nameinput"
// import OnboardingOranizationInput from "@/app/init/onboarding/organizationinput"
import TextBox from "@/app/init/onboarding/textbox"
import ContinueButton from "@/app/init/onboarding/continuebutton"
import OnboardingInstagramInput from "@/app/init/onboarding/instagraminput"
import {
	GenderContext,
	InstagramContext,
	NameContext,
	StepContext,
} from "./context"

interface StepType {
	id: "1" | "2" | "3"
}
export interface GenderType {
	gender: "MALE" | "FEMALE"
}
// export interface OrganType {
// 	organ: "고려대학교" | "연세대학교" | "기타"
// }

export default function Onboarding() {
	const [step, setStep] = useState<StepType>({ id: "1" })
	const [nickName, setNickName] = useState<string>("")
	const [validateNickName, setValidateNickName] = useState<boolean>(true)
	const [gender, setGender] = useState<GenderType | null>(null)
	// const [organ, setOrgan] = useState<OrganType | null>(null)
	const [instagramId, setInstagramId] = useState<string>("")
	const [canBeContinued, setCanBeContinued] = useState<boolean>(false)

	const stepText = {
		"1": "이름을 알려주세요.",
		"2": "성별을 알려주세요.",
		// "3": "소속을 알려주세요.",
		"3": "인스타그램 ID를 알려주세요",
	}

	useEffect(() => {
		switch (step.id) {
			case "1":
				if (nickName.length > 0) setCanBeContinued(true)
				else setCanBeContinued(false)
				break
			case "2":
				if (gender) setCanBeContinued(true)
				else setCanBeContinued(false)
				break
			case "3":
				setCanBeContinued(true)
				// if (instagramId) setCanBeContinued(true)
				// else setCanBeContinued(false)
				break
			default:
				break
		}
	}, [step, nickName, gender, instagramId])

	return (
		<main className="flex flex-col justify-start items-center w-[100%] h-[100%]">
			<StepContext.Provider value={{ step, setStep }}>
				<div className="flex flex-col justify-start items-center w-[100%] h-[100%] bg-[#F5F5F5]">
					<OnboardingHeader />
					<div className="flex-1 flex flex-col justify-start items-center w-[100%] relative">
						<TextBox text={stepText[step.id]} />
						{step.id === "1" ? (
							<NameContext.Provider
								value={{
									nickName,
									setNickName,
									validateNickName,
									setValidateNickName,
								}}
							>
								<OnboardingNameInput />
							</NameContext.Provider>
						) : step.id === "2" ? (
							<GenderContext.Provider value={{ gender, setGender }}>
								<OnboardingGenderInput />
							</GenderContext.Provider>
						) : step.id === "3" ? (
							<InstagramContext.Provider
								value={{ instagramId, setInstagramId }}
							>
								<OnboardingInstagramInput />
							</InstagramContext.Provider>
						) : // <OrganContext.Provider value={{ organ, setOrgan }}>
						// 	<OnboardingOranizationInput />
						// </OrganContext.Provider>
						null}

						<ContinueButton
							canBeContinued={canBeContinued}
							nickName={nickName}
							gender={gender}
							instagramId={instagramId}
							setValidateNickName={setValidateNickName}
						/>
					</div>
				</div>
			</StepContext.Provider>
		</main>
	)
}
