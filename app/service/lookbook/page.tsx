"use client"

import NavBar from "@/app/components/navbar"
import LookbookHeader from "./header"
import LookbookCategoryBox from "./categorybox"
import Link from "next/link"
import {
	lookbookInfoType,
	lookbookList,
	userProfileState,
	userProfileType,
} from "@/app/utils/atoms/serviceGlobalState"
import { useRecoilState } from "recoil"
import { useEffect, useState } from "react"

export default function Lookbook() {
	const [LookbookList, setLookbookList] =
		useRecoilState<lookbookInfoType>(lookbookList)
	const [userProfile, setUserProfile] =
		useRecoilState<userProfileType>(userProfileState)
	const [lookbookIndexList, setLookbookIndexList] = useState<string[]>([])

	useEffect(() => {
		if (LookbookList) {
			setLookbookIndexList(Object.keys(LookbookList))
		}
	}, [LookbookList])

	useEffect(() => {
		if (userProfile.userToken) {
			getLookbookThumbnail(userProfile.userToken)
		}
	}, [userProfile])

	const getLookbookThumbnail = async (userToken: string) => {
		const GET_LOOKBOOKTHUMBNAIL_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/lookbooks/evaluatedLooks/${userToken}/onlyThumbnails`
		await fetch(GET_LOOKBOOKTHUMBNAIL_URL, {
			method: "GET",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				if (data) {
					// console.log(data)
					let newLookbookList: lookbookInfoType = { ...LookbookList }
					newLookbookList["0"] = {
						title: "내가 평가한 룩",
						publicState: false,
						thumbnailList: data,
					}
					setLookbookList(newLookbookList)
				} else {
					console.log(message)
				}
			})
	}
	const Statistic = async (userToken: string, lookbookId: number) => {
		const STATISTIC_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/statistics/lookbook`
		await fetch(STATISTIC_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({
				userId: userToken,
				lookbookId: lookbookId,
			}),
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				if (
					status === "ILLEGAL_ARGUMENT" ||
					status === "NOT_FOUND" ||
					status === "BAD_REQUEST"
				) {
					console.log(message)
				} else {
					// console.log(data)
				}
			})
			.catch((error) => console.log(error))
	}
	return (
		<main className="flex flex-col justify-start items-center w-full min-h-[100%] bg-black text-white">
			<LookbookHeader />
			<div className="flex flex-row justify-between items-start w-full h-full px-[5px]">
				{lookbookIndexList.map((lookbookIndex: string, i: number) => {
					return (
						<Link
							key={i}
							className="flex justify-center items-center w-[50%] m-[5px]"
							onClick={() => {
								if (userProfile.userToken)
									Statistic(userProfile.userToken, Number(lookbookIndex))
							}}
							href={{
								pathname: "/service/lookbook/folder",
								query: { id: lookbookIndex },
							}}
						>
							<LookbookCategoryBox lookbook={LookbookList[lookbookIndex]} />
						</Link>
					)
				})}
			</div>

			<NavBar page={"lookbook"} />
		</main>
	)
}
