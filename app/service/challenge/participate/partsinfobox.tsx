"use client"

import { useContext, useEffect, useState } from "react"
import Clothes from "@/public/svg/clothes.svg"
import { ChallengeInfoContext, PartType } from "./page"
import Cancle from "@/public/svg/cancle.svg"

interface ChallengeParticipantProductInfoBoxProps {
	partIndex: number
}

export default function PartsInfoBox({
	partIndex,
}: ChallengeParticipantProductInfoBoxProps) {
	const { lookParts, setLookParts } = useContext(ChallengeInfoContext)
	const [isHover, setIsHover] = useState<boolean>(false)

	useEffect(() => {
		console.log(lookParts)
	}, [lookParts])

	const UpdateParts = (type: string, value: string) => {
		let newLookParts = [...lookParts]
		newLookParts[partIndex][type] = value
		setLookParts(newLookParts)
	}

	const RemovePart = () => {
		const newLookParts = lookParts.filter((part: PartType, i: number) => {
			return i !== partIndex
		})
		setLookParts(newLookParts)
	}

	return (
		<div
			className="flex justify-start items-center relative w-full h-[60px] mb-[10px] rounded-[10px] bg-[#D9D9D9] text-black text-[12px] font-textBoxFont overflow-hidden"
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<div className="flex flex-col justify-between items-center w-[60px] h-[100%] pt-[10px] pb-[5px]">
				<Clothes />
				<input
					type="text"
					placeholder="구분"
					className="flex justify-center items-center w-[calc(100%-20px)] mx-[10px] h-[15px] bg-transparent focus: outline-none text-center "
					value={lookParts[partIndex]?.part}
					onChange={(e) => UpdateParts("part", e.target.value)}
				/>
			</div>
			<div className="flex-1 flex flex-col justify-center items-center h-[100%] bg-white">
				<input
					type="text"
					placeholder="브랜드"
					className="w-[calc(100%-38px)] mx-[19px] h-[29px] focus: outline-none placeholder-[#959595]"
					value={lookParts[partIndex]?.brand}
					onChange={(e) => UpdateParts("brand", e.target.value)}
				/>
				<div className="w-[calc(100%-8px)] h-[2px] bg-[#D9D9D9]" />
				<input
					type="text"
					placeholder="제품명"
					className=" w-[calc(100%-38px)] mx-[19px] h-[29px] focus: outline-none placeholder-[#959595]"
					value={lookParts[partIndex]?.name}
					onChange={(e) => UpdateParts("name", e.target.value)}
				/>
			</div>
			{partIndex > 1 && isHover ? (
				<div
					className="flex justify-center items-center w-[20px] h-[20px] rounded-full bg-[#D9D9D9] absolute top-[-1px] right-[-1px] hover:bg-[#616161] cursor-pointer"
					onClick={RemovePart}
				>
					<Cancle width={10} height={10} />
				</div>
			) : null}
		</div>
	)
}
