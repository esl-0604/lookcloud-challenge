"use client"

import Good from "@/public/svg/thumbsup.svg"
import Bad from "@/public/svg/thumbsdown.svg"
import { useState } from "react"
import { lookbookImgType } from "@/app/utils/atoms/serviceGlobalState"

interface LookbookFolderProps {
	img: lookbookImgType
	imgUrl: string
	rating: number
}

export default function LookbookImgBox({
	img,
	imgUrl,
	rating,
}: LookbookFolderProps) {
	const [lookDetail, setLookDetail] = useState<boolean>(false)
	return (
		<div
			className="flex justify-center items-center relative w-[calc(50%-4px)] after:pb-[100%] bg-black m-[2px] cursor-pointer"
			onClick={() => setLookDetail(true)}
		>
			<div className="flex justify-start items-start absolute w-full h-full overflow-hidden">
				<img className="w-full h-full object-cover" src={imgUrl} alt="img" />
				<div className="flex justify-center items-center absolute bottom-[5.75px] right-[5px]">
					{rating === 1 ? (
						<Good width={30} height={26.25} />
					) : (
						<Bad width={30} height={26.25} />
					)}
				</div>
			</div>
		</div>
	)
}
