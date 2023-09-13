"use client"

interface SelectButtonProps {
	text: string
	selectedTheme: string
}

export default function SelectButton({
	text,
	selectedTheme,
}: SelectButtonProps) {
	const unselectedTheme = "text-[#D9D9D9]"
	return (
		<div
			className={`flex justify-center items-center w-[360px] h-[46px] rounded-[22px] border-2 bg-[#F5F5F5] cursor-pointer ${selectedTheme}`}
		>
			{text}
		</div>
	)
}
