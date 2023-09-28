"use client"

import { useContext, useEffect, useState } from "react"
import { NameContext } from "./context"

interface NoticeTextType {
	text: string
	theme: string
}

export default function OnboardingNameInput() {
	const { nickName, setNickName, validateNickName, setValidateNickName }: any =
		useContext(NameContext)
	const [noticeText, setNoticeText] = useState<NoticeTextType>({
		text: "LookCloud에서 보이게될 이름입니다. 나중에 바꿀 수 있습니다.",
		theme: "text-[#9C9C9C]",
	})

	useEffect(() => {
		if (validateNickName === 1) {
			setNoticeText({
				text: "부적절한 단어가 포함되었습니다. 다시 입력해주세요",
				theme: "text-[#DC2D2D]",
			})
			setNickName("")
			setTimeout(() => {
				setValidateNickName(0)
			}, 1200)
		} else if (validateNickName === 2) {
			setNoticeText({
				text: "이미 사용 중인 이름입니다. 다시 입력해주세요",
				theme: "text-[#DC2D2D]",
			})
			setNickName("")
			setTimeout(() => {
				setValidateNickName(0)
			}, 1200)
		} else {
			setNoticeText({
				text: "LookCloud에서 보이게될 이름입니다. 나중에 바꿀 수 있습니다.",
				theme: "text-[#9C9C9C]",
			})
		}
	}, [validateNickName])

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
		<div className="flex flex-col justify-between items-center w-[84%] max-w-[320px] mb-[16px] text-[12px]">
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
