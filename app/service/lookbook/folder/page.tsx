"use client"

import { useSearchParams } from "next/navigation"
import LookbookHeader from "../header"
import CommingSoon from "@/public/svg/lookbookCommingsoon.svg"
import {
	lookbookImgList,
	lookbookImgListType,
	lookbookImgType,
} from "@/app/utils/atoms/serviceGlobalState"
import { useRecoilState } from "recoil"
import LookbookImgBox from "./imagebox"
import NavBar from "@/app/components/navbar"

export default function LookbookFolder() {
	const param = useSearchParams()
	const lookbookId = param.get("id")

	const [LookbookImgList, setLookbookImgList] =
		useRecoilState<lookbookImgListType>(lookbookImgList)

	return (
		<main className="flex flex-col justify-start items-center w-full min-h-full overflow-scroll bg-black text-white relative">
			<LookbookHeader />
			<div className="flex flex-col justify-between items-start w-full h-[50px] px-[8px] font-textBoxFont">
				<div className="flex flex-row justify-start items-center w-full h-[30px] text-[24px] font-semibold">
					{lookbookId ? LookbookImgList[lookbookId].title : null}
				</div>
				<div className="flex flex-row justify-start items-center w-full h-[20px] text-[12px] font-normal">
					{lookbookId ? LookbookImgList[lookbookId].comment : null}
				</div>
			</div>
			<div className="flex flex-wrap flex-row justify-start items-start w-full h-full px-[2px] pb-[100px]">
				{lookbookId === "0" ? (
					LookbookImgList[lookbookId].imgList.map(
						(img: lookbookImgType, i: number) => {
							return (
								<LookbookImgBox
									key={i}
									img={img}
									imgUrl={img.look.imageUrl}
									rating={img.rating}
								/>
							)
						},
					)
				) : (
					<>
						<div className="fixed top-[110px] bottom-[56px] w-screen max-w-[480px] flex bg-black opacity-[0.6] z-10"></div>
						<div className="fixed top-[110px] bottom-[56px] w-screen max-w-[480px] flex justify-center items-center z-20">
							<CommingSoon />
						</div>
					</>
				)}
			</div>
			<NavBar page={"lookbook"} />
		</main>
	)
}
