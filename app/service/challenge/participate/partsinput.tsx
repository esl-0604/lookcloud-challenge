"use client"

import ProductInfoBox from "./partsinfobox"
import Add from "@/public/svg/add.svg"
import { useContext, useState } from "react"
import { ChallengeInfoContext, PartType } from "./page"

export default function PartsInput() {
	const { lookParts, setLookParts } = useContext(ChallengeInfoContext)
	const AddParts = () => {
		const newLookPart = {
			part: "",
			brand: "",
			name: "",
		}
		setLookParts(lookParts.concat(newLookPart))
	}
	return (
		<div className="flex flex-col justify-between items-center w-full px-[5%] text-white text-[12px] font-textBoxFont">
			<div className="flex justify-start items-center w-full h-[20px] mb-[10px] font-semibold">
				제품 정보
			</div>
			<div className="flex flex-col justify-between items-center w-full font-bold">
				{/* <ProductInfoBox type={"상의"} />
				<ProductInfoBox type={"하의"} /> */}
				{lookParts?.map((part: PartType, i: number) => {
					return <ProductInfoBox key={i} partIndex={i} />
				})}
				<div
					className="flex justify-between items-center w-[120px] h-[20px] cursor-pointer"
					onClick={AddParts}
				>
					<Add />
					<div className="flex justify-center items-center h-full">
						다른 제품 추가하기
					</div>
				</div>
			</div>
		</div>
	)
}
