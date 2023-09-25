"use client"

import Cancle from "@/public/svg/cancle.svg"
import BookMarkOff from "@/public/svg/bookmarkOff.svg"
import BookMarkOn from "@/public/svg/bookmarkOn.svg"
import Good from "@/public/svg/thumbsup.svg"
import Bad from "@/public/svg/thumbsdown.svg"
import { useState } from "react"
import { lookbookImgType, partType } from "@/app/utils/atoms/serviceGlobalState"

interface LookDetailProps {
	img: lookbookImgType
	rating: number
	setLookDetail: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LookDetail({
	img,
	rating,
	setLookDetail,
}: LookDetailProps) {
	const [bookMark, setBookMark] = useState<Boolean>(false)
	let tempList = [...img?.look?.parts]
	const partsList: partType[] = tempList.sort(
		(a: partType, b: partType) => a.index - b.index,
	)
	console.log(img?.look?.parts)

	return (
		<div className="fixed top-0 flex flex-col justify-start items-center w-screen max-w-[480px] h-screen px-[4%] bg-black z-30">
			<div className="flex-none flex justify-end items-center w-full h-[54px]">
				<Cancle width={20} height={20} onClick={() => setLookDetail(false)} />
			</div>
			<div className="flex-1 flex flex-col justify-start items-center w-full overflow-scroll">
				<div className="flex flex-col justify-center items-center w-full relative">
					<img
						src={img?.look?.imageUrl}
						alt="evaluate_img"
						className="object-cover w-full"
					/>
					<div className="absolute bottom-0 left-0 flex flex-row justify-center items-end w-full h-[177px] px-[10px] py-[25px] bg-gradient-to-b from-transparent to-black text-white text-[12px] font-textBoxFont">
						<div className="flex flex-row justify-between items-center w-full h-[70px]">
							{img?.look?.description}
							{/* 고연전을 즐기기위한 편한 무지 티를 기반으로 만든 룩 */}
							<div className="flex justify-center items-center">
								{rating === 1 ? (
									<Good width={40} height={35} />
								) : (
									<Bad width={40} height={35} />
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="flex flex-col justify-center items-center w-full mt-[12px] mb-[100px] relative">
					<div className="flex flex-row justify-between items-center w-full h-[50px]">
						<div className="flex flex-row justify-start items-center">
							<div className="flex justify-center items-center w-[50px] h-[50px] rounded-full overflow-hidden">
								<img
									className="object-cover w-full h-full"
									src="/svg/sampleProfileImg.svg"
								/>
							</div>

							<div className="flex flex-col justify-between items-start h-[40px] text-white text-[12px] font-bold font-textBoxFont ml-[6px]">
								<div className="h-[20px]">{img?.user?.nickName}</div>
								<div className="h-[20px]">
									{"@" + img?.user?.instagramUserName}
								</div>
							</div>
						</div>

						<div className="flex flex-row justify-end items-center h-full text-white text-[24px] font-textBoxFont font-bold">
							<div className="px-[15px]">{img?.lScore}</div>
							<div className="cursor-pointer">
								{bookMark ? (
									<BookMarkOn onClick={() => setBookMark(!bookMark)} />
								) : (
									<BookMarkOff onClick={() => setBookMark(!bookMark)} />
								)}
							</div>
						</div>
					</div>

					<div className="flex flex-row justify-between items-center w-full mt-[12px]">
						<div className="flex flex-col justify-start items-start text-white text-[12px] font-textBoxFont">
							{partsList.map((formattedItem: any, index: number) => (
								<div
									key={index}
									className="flex flex-row justify-start items-center h-[20px]"
								>
									{formattedItem.part +
										" - " +
										formattedItem.brand +
										" " +
										formattedItem.name}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
