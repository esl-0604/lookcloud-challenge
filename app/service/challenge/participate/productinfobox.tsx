"use client"

import { useContext, useEffect, useState } from "react"
import Clothes from "../../../public/svg/clothes.svg"
import { ChallengeInfoContext } from "./main"

interface ChallengeParticipantProductInfoBoxProps {
	type: string
}

export default function ChallengeParticipantProductInfoBox({
	type,
}: ChallengeParticipantProductInfoBoxProps) {
	const {
		lookProductInfoTop,
		setLookProductInfoTop,
		lookProductInfoBottom,
		setLookProductInfoBottom,
		lookProductInfoShoes,
		setLookProductInfoShoes,
	} = useContext(ChallengeInfoContext)

	const [brand, setBrand] = useState("")
	const [name, setName] = useState("")

	useEffect(() => {
		const productObject = JSON.stringify({
			brand: brand,
			name: name,
		})
		switch (type) {
			case "상의":
				setLookProductInfoTop(productObject)
				break
			case "하의":
				setLookProductInfoBottom(productObject)
				break
			case "신발":
				setLookProductInfoShoes(productObject)
				break
			default:
				break
		}
	}, [brand, name])
	return (
		<div className="flex justify-start items-center w-[100%] h-[60px] rounded-[10px] bg-[#D9D9D9] text-black text-[12px] font-textBoxFont overflow-hidden">
			<div className="flex flex-col justify-between items-center w-[60px] h-[100%] pt-[10px] pb-[5px]">
				<Clothes />
				<div className="flex justify-center items-center h-[15px]">{type}</div>
			</div>
			<div className="flex-1 flex flex-col justify-center items-center h-[100%] bg-white">
				<input
					type="text"
					placeholder="브랜드"
					className="w-[calc(100%-38px)] mx-[19px] h-[29px] focus: outline-none placeholder-[#959595]"
					value={brand}
					onChange={(e) => setBrand(e.target.value)}
				/>
				<div className="w-[calc(100%-8px)] h-[2px] bg-[#D9D9D9]" />
				<input
					type="text"
					placeholder="제품명"
					className=" w-[calc(100%-38px)] mx-[19px] h-[29px] focus: outline-none placeholder-[#959595]"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
		</div>
	)
}
