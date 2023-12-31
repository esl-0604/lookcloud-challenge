"use client"

import ProductInfoBox from "./partsinfobox"
import Add from "@/public/svg/add.svg"
import { useContext, useEffect } from "react"
import { partType } from "@/app/utils/atoms/serviceGlobalState"
import { ChallengeInfoContext } from "./context"

export default function PartsInput() {
	const { isAlreadyPosted, lookParts, setLookParts } =
		useContext(ChallengeInfoContext)
	useEffect(() => {
		if (lookParts.length === 0) {
			const newLookPart: partType[] = [
				{
					index: 0,
					part: "상의",
					brand: "",
					name: "",
				},
				{
					index: 1,
					part: "하의",
					brand: "",
					name: "",
				},
			]
			setLookParts(lookParts.concat(newLookPart))
		}
	}, [])
	const AddParts = () => {
		const newLookPart: partType = {
			index: lookParts.length,
			part: "",
			brand: "",
			name: "",
		}
		setLookParts(lookParts.concat(newLookPart))
	}
	return (
		<div className="flex flex-col justify-between items-center w-full px-[4%] text-white text-[12px] font-textBoxFont">
			<div className="flex justify-start items-center w-full h-[20px] mb-[10px] font-semibold">
				제품 정보
			</div>
			<div className="flex flex-col justify-between items-center w-full font-bold">
				{lookParts?.map((part: partType, i: number) => {
					return <ProductInfoBox key={i} partIndex={i} />
				})}
				{isAlreadyPosted ? null : (
					<div
						className="flex flex-row flex-nowrap justify-between items-center w-[120px] h-[20px] cursor-pointer"
						onClick={AddParts}
					>
						<Add />
						<div className="flex justify-center items-center w-[100px] h-full whitespace-nowrap">
							다른 제품 추가하기
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
