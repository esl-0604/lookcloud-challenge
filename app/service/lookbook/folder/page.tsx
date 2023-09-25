"use client"

import { useSearchParams } from "next/navigation"
import LookbookHeader from "../header"
import CommingSoon from "@/public/svg/lookbookCommingsoon.svg"
import {
	lookbookImgList,
	lookbookImgListType,
	lookbookImgType,
	userProfileState,
	userProfileType,
} from "@/app/utils/atoms/serviceGlobalState"
import { useRecoilState } from "recoil"
import LookbookImgBox from "./imagebox"
import NavBar from "@/app/components/navbar"
import { useEffect, useState } from "react"
import SpinnerBox from "@/app/components/spinner"

export default function LookbookFolder() {
	const param = useSearchParams()
	const lookbookId = param.get("id")

	const [LookbookImgList, setLookbookImgList] =
		useRecoilState<lookbookImgListType>(lookbookImgList)
	const [userProfile, setUserProfile] =
		useRecoilState<userProfileType>(userProfileState)

	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		if (userProfile.userToken && lookbookId) getImgList(userProfile.userToken)
	}, [userProfile])

	const getImgList = async (userToken: string) => {
		if (lookbookId === "0") {
			const GET_IMAGE_LIST_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/lookbooks/evaluatedLooks/${userToken}`
			await fetch(GET_IMAGE_LIST_URL, {
				method: "GET",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then(({ status, message, data }) => {
					setIsLoading(false)
					if (data) {
						// console.log(data)
						let newImgList: lookbookImgListType = { ...LookbookImgList }
						newImgList[lookbookId] = {
							title: "내가 평가한 룩",
							comment: "챌린지에서 평가했던 룩들을 다시 볼 수 있습니다.",
							publicState: false,
							imgList: data,
						}
						setLookbookImgList(newImgList)
					} else {
						console.log(message)
					}
				})
				.catch((error) => console.log(error))
		} else if (lookbookId === "1") {
			setIsLoading(false)
		}
	}

	return (
		<main className="flex flex-col justify-start items-center w-full h-full bg-black text-white relative">
			<LookbookHeader />
			<div className="flex flex-col justify-between items-start w-full h-[50px] px-[8px] font-textBoxFont z-30">
				<div className="flex flex-row justify-start items-center w-full h-[30px] text-[24px] font-semibold">
					{lookbookId ? LookbookImgList[lookbookId].title : null}
				</div>
				<div className="flex flex-row justify-start items-center w-full h-[20px] text-[12px] font-normal">
					{lookbookId ? LookbookImgList[lookbookId].comment : null}
				</div>
			</div>
			<div
				className={`flex flex-wrap flex-row justify-start items-start w-full miin-h-full px-[2px] pb-[60px] ${
					lookbookId === "1" ? "overflow-hidden" : "overflow-scroll"
				}`}
			>
				{isLoading ? (
					<SpinnerBox />
				) : lookbookId ? (
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
				) : null}
				{lookbookId === "1" ? (
					<>
						<div className="fixed top-[100px] bottom-[56px] w-screen max-w-[480px] flex bg-black opacity-[0.6] z-10"></div>
						<div className="fixed top-[100px] bottom-[56px] w-screen max-w-[480px] flex justify-center items-center z-20">
							<CommingSoon />
						</div>
					</>
				) : null}
			</div>
			<NavBar page={"lookbook"} />
		</main>
	)
}
