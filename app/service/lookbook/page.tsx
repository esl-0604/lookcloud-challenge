"use client"

import NavBar from "@/app/components/navbar"
import LookbookHeader from "./header"
import LookbookCategoryBox from "./categorybox"
import Link from "next/link"
import {
	lookbookInfoType,
	lookbookList,
} from "@/app/utils/atoms/serviceGlobalState"
import { useRecoilState } from "recoil"

export default function Lookbook() {
	const [LookbookList, setLookbookList] =
		useRecoilState<lookbookInfoType[]>(lookbookList)
	return (
		<main className="flex flex-col justify-start items-center w-full min-h-[100%] bg-black text-white">
			<LookbookHeader />
			<div className="flex flex-row justify-between items-start w-full h-full px-[5%]">
				{LookbookList.map((lookbook: lookbookInfoType, i: number) => {
					return (
						<Link
							key={i}
							className="flex justify-center items-center w-[calc(50%-9px)]"
							href={{
								pathname: "/service/lookbook/folder",
								query: { id: lookbook.lookbookId },
							}}
						>
							<LookbookCategoryBox
								title={lookbook.title}
								publicState={lookbook.publicState}
							/>
						</Link>
					)
				})}
			</div>

			<NavBar page={"lookbook"} />
		</main>
	)
}
