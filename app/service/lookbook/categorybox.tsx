import {
	lookbookImgList,
	lookbookImgListType,
	lookbookInfoType,
} from "@/app/utils/atoms/serviceGlobalState"
import Lockon from "@/public/svg/lockon.svg"
import { useEffect } from "react"
import { useRecoilState } from "recoil"

interface LookbookCategoryBoxProps {
	title: string
	publicState: boolean
	lookbookId: string
}

export default function LookbookCategoryBox({
	title,
	publicState,
	lookbookId,
}: LookbookCategoryBoxProps) {
	const [LookbookImgList, setLookbookImgList] =
		useRecoilState<lookbookImgListType>(lookbookImgList)

	useEffect(() => {
		if (LookbookImgList[lookbookId]) {
			const img1 = LookbookImgList[lookbookId].imgList[0]
		}
	}, [LookbookImgList])

	return (
		<div className="flex flex-col justify-between items-center w-full text-[12px] font-textBoxFont">
			<div className="flex flex-col justify-center items-center w-full after:pb-[100%] rounded-[10px] bg-[#D9D9D9] relative">
				<div className="absolute w-full h-full grid grid-cols-2 grid-rows-2 p-[2px]">
					<div className="flex justify-center items-center overflow-hidden m-[2px]">
						{LookbookImgList[lookbookId]?.imgList[0] ? (
							<img
								src={LookbookImgList[lookbookId]?.imgList[0].look.imageUrl}
								alt="img1"
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="w-full h-full bg-transparent"></div>
						)}
					</div>

					<div className="flex justify-center items-center overflow-hidden  m-[3px]">
						{LookbookImgList[lookbookId]?.imgList[1] ? (
							<img
								src={LookbookImgList[lookbookId]?.imgList[1].look.imageUrl}
								alt="img1"
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="w-full h-full bg-transparent"></div>
						)}
					</div>

					<div className="flex justify-center items-center overflow-hidden  m-[3px]">
						{LookbookImgList[lookbookId]?.imgList[2] ? (
							<img
								src={LookbookImgList[lookbookId]?.imgList[2].look.imageUrl}
								alt="img1"
								className="w-full h-full object-cover"
							/>
						) : (
							<div className="w-full h-full bg-transparent"></div>
						)}
					</div>

					<div className="flex justify-center items-center overflow-hidden m-[3px]">
						{LookbookImgList[lookbookId]?.imgList[3] ? (
							<img
								src={LookbookImgList[lookbookId]?.imgList[3].look.imageUrl}
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
					{title}
				</div>
				{publicState ? null : (
					<div className="flex flex-row flex-nowrap justify-start items-center w-full h-[12px] font-normal">
						<Lockon /> <div className="ml-[2.5px]">비공개</div>
					</div>
				)}
			</div>
		</div>
	)
}
