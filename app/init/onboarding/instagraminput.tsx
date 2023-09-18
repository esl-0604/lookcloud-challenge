"use client"

import { useContext, useState } from "react"
import { InstagramContext } from "@/app/init/onboarding/page"

interface NoticeTextType {
	text: string
	theme: string
}

export default function OnboardingInstagramInput() {
	const { instagramId, setInstagramId }: any = useContext(InstagramContext)
	const [noticeText, setNoticeText] = useState<NoticeTextType>({
		text: "인스타그렘 ID을 입력해주세요. 맨 앞에 @없이 입력해주세요.",
		theme: "text-[#9C9C9C]",
	})

	const SettingInstagramId = (instagramId: string) => {
		setInstagramId(instagramId)
	}
	return (
		<div className="flex flex-col justify-between items-center w-[320px] h-[48px] text-[12px]">
			<input
				type="text"
				placeholder="ex) eslee850"
				className="w-[100%] bg-transparent focus: outline-none placeholder-[#9C9C9C]"
				value={instagramId}
				onChange={(e) => {
					SettingInstagramId(e.target.value)
				}}
			/>
			<div className="w-[100%] h-[2px] bg-[#D9D9D9]" />
			<div
				className={`flex justify-start items-center w-[100%] ${noticeText.theme}`}
			>
				{noticeText.text}
			</div>
		</div>
	)
}

// "use client"

// import InstagramLoginButton from "@/app/init/login/instagramloginbutton"

// export default function OnboardingInstagramInput() {
// 	return (
// 		<div className="flex flex-col justify-between items-center w-[364px] h-[176px] text-[12px] font-textBoxFont text-[#828282]">
// 			<div className="flex justify-start items-center w-[350px] h-[52px]">
// 				인스타그램을 연동할 경우, 챌린지 참여 시 타인에게 본인의 인스타그램
// 				아이디를 노출시킬 수 있습니다.
// 			</div>
// 			<div className="flex justify-center items-center h-[72px]">
// 				<InstagramLoginButton />
// 			</div>
// 			<div className="flex justify-center items-center w-[350px] h-[52px]">
// 				이후에 화면 상단에 있는 “내 정보”에서 언제든지 연결하실 수 있습니다.
// 			</div>
// 		</div>
// 	)
// }
