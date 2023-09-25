"use client"

import { useState } from "react"
import {
	currentDetailImageState,
	lookbookImgType,
} from "@/app/utils/atoms/serviceGlobalState"
// import LookDetail from "./lookDetail"
import { useRouter, useSearchParams } from "next/navigation"
import { useRecoilState } from "recoil"

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
	// const [lookDetail, setLookDetail] = useState<boolean>(false)
	const router = useRouter()
	const param = useSearchParams()
	const lookbookId = param.get("id")
	const [currentDetailImage, setCurrentDetailImage] =
		useRecoilState<lookbookImgType>(currentDetailImageState)

	const viewDetail = () => {
		setCurrentDetailImage(img)
		router.push("/service/lookbook/detail?id=" + lookbookId)
	}
	return (
		<>
			{/* {lookDetail ? (
				<LookDetail img={img} rating={rating} setLookDetail={setLookDetail} />
			) : null} */}
			<div
				className="flex justify-center items-center relative w-[calc(50%-4px)] after:pb-[100%] bg-black m-[2px] cursor-pointer"
				onClick={viewDetail}
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
