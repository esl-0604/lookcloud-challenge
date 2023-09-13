"use client"

import { useContext, useState } from "react"
import { NameContext } from "./main"

interface NoticeTextType {
	text: string
	theme: string
}

export default function OnboardingNameInput() {
	const { nickName, setNickName }: any = useContext(NameContext)
	const [noticeText, setNoticeText] = useState<NoticeTextType>({
		text: "LookCloud에서 보이게될 이름입니다. 나중에 바꿀 수 있습니다.",
		theme: "text-[#9C9C9C]",
	})

	const SettingNickName = (name: string) => {
		if (name.length < 9) {
			setNickName(name)
			setNoticeText({
				text: "LookCloud에서 보이게될 이름입니다. 나중에 바꿀 수 있습니다.",
				theme: "text-[#9C9C9C]",
			})
		} else {
			setNoticeText({
				text: "이름은 최대 8글자로 작성해주세요.",
				theme: "text-[#DC2D2D]",
			})
			setTimeout(() => {
				setNoticeText({
					text: "LookCloud에서 보이게될 이름입니다. 나중에 바꿀 수 있습니다.",
					theme: "text-[#9C9C9C]",
				})
			}, 1000)
		}
	}
	return (
		<div className="flex flex-col justify-between items-center w-[320px] h-[48px] text-[12px]">
			<input
				type="text"
				placeholder="ex) 고대멋쟁이"
				className="w-[100%] bg-transparent focus: outline-none placeholder-[#9C9C9C]"
				value={nickName}
				onChange={(e) => {
					SettingNickName(e.target.value)
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
