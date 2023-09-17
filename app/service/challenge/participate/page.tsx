"use client"

import ChallengeHeader from "../header"
import { useState, createContext, useEffect } from "react"
import ImageInput from "./imageinput"
import DescriptionInput from "./descriptioninput"
import PartsInput from "./partsinput"
import { userChallengeParticipateType } from "@/app/utils/atoms/serviceGlobalState"
import { useRecoilState } from "recoil"
import { userChallengeParticipateInfo } from "@/app/utils/atoms/serviceGlobalState"
import { useSearchParams } from "next/navigation"
import ParticipateThumbnail from "./thumbnail"

export const ChallengeInfoContext = createContext<any>(null)
export interface PartType {
	part: string
	name: string
	brand: string
}

export default function Participate() {
	const param = useSearchParams()
	const challengeId = Number(param.get("id"))

	// 전역에 존재하는 룩 정보
	const [userChallengeParticipateData, setUserChallengeParticipateData] =
		useRecoilState<userChallengeParticipateType>(userChallengeParticipateInfo)

	// 임시로 존재하는 룩 정보
	const [UItype, setUIType] = useState<string>("Post")
	const [canBeUpdate, setCanBeUpdate] = useState<boolean>(true)
	const [lookImage, setLookImage] = useState<string | null>(null)
	const [lookDescription, setLookDescription] = useState<string>("")
	const [lookParts, setLookParts] = useState<PartType[]>([])
	const [lookImageFile, setLookImageFile] = useState<File | null>(null)

	useEffect(() => {
		if (userChallengeParticipateData[challengeId]) {
			setUIType("Update")
			if (userChallengeParticipateData[challengeId].lScore > 0) {
				setCanBeUpdate(false)
			}
			setLookImage(userChallengeParticipateData[challengeId].imageUrl)
			setLookDescription(userChallengeParticipateData[challengeId].description)
			if (userChallengeParticipateData[challengeId].parts) {
				const partsObj = JSON.parse(
					userChallengeParticipateData[challengeId].parts,
				)
				console.log(partsObj)
				setLookParts(partsObj)
			}
		}
	}, [])

	// ---------------------------------------------------------------------
	const PostParticipate = (buttonType: string) => {
		if (buttonType === "Post") {
			const formDataForSubmit = new FormData()
			if (lookImageFile) {
				formDataForSubmit.append("image", lookImageFile)
				// for (const keyValue of formDataForSubmit) console.log(keyValue)
				ImageUpload(formDataForSubmit)
			} else {
				console.log("이미지 없음")
			}
		} else if (buttonType === "Update") {
			// 사진 , 설명, 제품 정보 비교 후, 수정사항이 있을 경우에만 수정 api 요청.
			// 단, 평가 이력이 있을 경우에는 수정 불가. 삭제만 가능.
			if (canBeUpdate) {
				console.log("수정!")
			} else {
				alert("평가 이력이 남은 게시물은 수정할 수 없습니다.")
			}
		} else {
			// 게시물 삭제 api 요청
			console.log("삭제!")
		}
	}

	const ImageUpload = async (formData: any) => {
		const IMAGE_UPLOAD_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/participations/image`
		await fetch(IMAGE_UPLOAD_URL, {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				if (status === "OK") {
					console.log(data)
					// ChallengeUpload(data)
				} else {
					console.log(message)
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	// const ChallengeUpload = async (imageURL: string) => {
	// 	const userId = profileData.userId
	// 	const challengeId = Number(param.get("id"))
	// 	const lookObject = {
	// 		imageUrl: imageURL,
	// 		description: lookDescription,

	// 	}
	// 	const CHALLENGE_UPLOAD_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/participations`
	// 	await fetch(CHALLENGE_UPLOAD_URL, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({
	// 			userId: userId,
	// 			challengeId: challengeId,
	// 			look: lookObject,
	// 		}),
	// 	})
	// 		.then((res) => res.json())
	// 		.then(({ status, message, data }) => {
	// 			if (status === "OK") {
	// 				console.log(data)
	// 			} else {
	// 				console.log(message)
	// 			}
	// 		})

	// 		.catch((error) => {
	// 			console.log(error)
	// 		})
	// }

	return (
		<main className="flex flex-col justify-center items-center absolute w-[100%] min-h-[100%] bg-black">
			<ChallengeHeader />
			<div className="flex-1 flex flex-col relative justify-start items-center w-[100%] font-textBoxFont">
				<ParticipateThumbnail />
				<ChallengeInfoContext.Provider
					value={{
						lookImage,
						setLookImage,
						lookImageFile,
						setLookImageFile,
						lookDescription,
						setLookDescription,
						lookParts,
						setLookParts,
					}}
				>
					<ImageInput />
					<DescriptionInput />
					<PartsInput />
				</ChallengeInfoContext.Provider>
				{UItype === "Update" ? (
					<div className="flex flex-row justify-between items-center mt-[20px] mb-[100px] w-[80%] max-w-[350px] h-[50px] text-[24px] font-semibold text-white">
						<div
							className="flex justify-center items-center w-[48%] max-w-[170px] h-[50px] rounded-[20.5px] bg-[#344467] text-[24px]e cursor-pointer"
							onClick={() => PostParticipate("Update")}
						>
							수정
						</div>
						<div
							className="flex justify-center items-center w-[48%] max-w-[170px] h-[50px] rounded-[20.5px] bg-[#616161] text-[24px] cursor-pointer"
							onClick={() => PostParticipate("delete")}
						>
							삭제
						</div>
					</div>
				) : (
					<div
						className="flex justify-center items-center mt-[20px] mb-[100px] w-[70%] max-w-[310px] h-[50px] rounded-[20.5px] bg-[#344467] text-[24px] font-semibold text-white cursor-pointer"
						onClick={() => PostParticipate("Post")}
					>
						완료
					</div>
				)}
			</div>
		</main>
	)
}
