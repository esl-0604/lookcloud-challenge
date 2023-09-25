"use client"

import { useState } from "react"
import { lookbookImgType } from "@/app/utils/atoms/serviceGlobalState"
import LookDetail from "./lookDetail"

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
		<>
			{lookDetail ? (
				<LookDetail img={img} rating={rating} setLookDetail={setLookDetail} />
			) : null}
			<div
				className="flex justify-center items-center relative w-[calc(50%-4px)] after:pb-[100%] bg-black m-[2px] cursor-pointer"
				onClick={() => setLookDetail(true)}
			>
				<div className="flex justify-start items-start absolute w-full h-full overflow-hidden">
					<img className="w-full h-full object-cover" src={imgUrl} alt="img" />
					<div className="flex justify-center items-center absolute bottom-[5.75px] right-[5px] w-[15.9%] h-[13.9%]">
						{rating === 1 ? (
							<img
								src="/svg/thumbsup.svg"
								alt="Good"
								className="w-full h-full object-cover"
							/>
						) : (
							<img
								src="/svg/thumbsdown.svg"
								alt="Good"
								className="w-full h-full object-cover"
							/>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
