import { lookbookInfoType } from "@/app/utils/atoms/serviceGlobalState"
import Lockon from "@/public/svg/lockon.svg"
import { useEffect } from "react"

interface LookbookCategoryBoxProps {
	lookbook: {
		title: string
		publicState: boolean
		thumbnailList: string[]
	}
}

export default function LookbookCategoryBox({
	lookbook,
}: LookbookCategoryBoxProps) {
	return (
		<div className="flex flex-col justify-between items-center w-full text-[12px] font-textBoxFont">
			<div className="flex flex-col justify-center items-center w-full after:pb-[100%] rounded-[10px] relative">
				<div className="absolute w-full h-full grid grid-cols-2 grid-rows-2 rounded-[5px] overflow-hidden">
					{lookbook?.thumbnailList.length === 0 ? (
						<div className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-black flex justify-center items-center text-center w-full text-[12px] font-textBoxFont font-semibold">
							아직 평가한 이미지가 없습니다.
						</div>
					) : null}
					<div className="flex justify-center items-center overflow-hidden mr-[2px] mb-[2px] bg-[#D9D9D9]">
						{lookbook?.thumbnailList[0] ? (
							<img
								src={lookbook?.thumbnailList[0]}
								alt="img1"
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="w-full h-full bg-transparent"></div>
						)}
					</div>

					<div className="flex justify-center items-center overflow-hidden ml-[2px] mb-[2px] bg-[#D9D9D9]">
						{lookbook?.thumbnailList[1] ? (
							<img
								src={lookbook?.thumbnailList[1]}
								alt="img1"
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="w-full h-full bg-transparent"></div>
						)}
					</div>

					<div className="flex justify-center items-center overflow-hidden mr-[2px] mt-[2px] bg-[#D9D9D9]">
						{lookbook?.thumbnailList[2] ? (
							<img
								src={lookbook?.thumbnailList[2]}
								alt="img1"
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="w-full h-full bg-transparent"></div>
						)}
					</div>

					<div className="flex justify-center items-center overflow-hidden ml-[2px] mt-[2px] bg-[#D9D9D9]">
						{lookbook?.thumbnailList[3] ? (
							<img
								src={lookbook?.thumbnailList[3]}
								alt="img1"
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="w-full h-full bg-transparent"></div>
						)}
					</div>
				</div>
			</div>

			<div className="flex flex-col justify-between items-start w-full h-[30px] mt-[5px]">
				<div className="flex flex-row flex-nowrap justify-start items-center w-full h-[12px] font-semibold">
					{lookbook?.title}
				</div>
				{lookbook?.publicState ? null : (
					<div className="flex flex-row flex-nowrap justify-start items-center w-full h-[12px] font-normal">
						<Lockon /> <div className="ml-[2.5px]">비공개</div>
					</div>
				)}
			</div>
		</div>
	)
}
