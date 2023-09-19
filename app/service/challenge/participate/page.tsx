"use client"

import ChallengeHeader from "../header"
import { useState, useEffect } from "react"
import ImageInput from "./imageinput"
import DescriptionInput from "./descriptioninput"
import PartsInput from "./partsinput"
import {
	partType,
	userChallengeParticipateType,
	userProfileState,
	userProfileType,
} from "@/app/utils/atoms/serviceGlobalState"
import { useRecoilState } from "recoil"
import { userChallengeParticipateInfo } from "@/app/utils/atoms/serviceGlobalState"
import { useRouter, useSearchParams } from "next/navigation"
import ParticipateThumbnail from "./thumbnail"
import AlertBox from "@/app/components/AlertBox"
import { ChallengeInfoContext } from "./context"

export default function Participate() {
	const router = useRouter()
	const param = useSearchParams()
	const challengeId = param.get("id")

	// 전역에 존재하는 룩 정보
	const [profileData, setProfileData] =
		useRecoilState<userProfileType>(userProfileState)
	const [userChallengeParticipateData, setUserChallengeParticipateData] =
		useRecoilState<userChallengeParticipateType>(userChallengeParticipateInfo)
	// 로컬 State
	const [deleteModal, setDeleteModal] = useState<boolean>(false)
	const [isAlreadyPosted, setIsAlreadyPosted] = useState<boolean>(false)
	// const [canBeUpdate, setCanBeUpdate] = useState<boolean>(true)
	// 임시로 존재하는 룩 정보
	const [lookImage, setLookImage] = useState<string | null>(null)
	const [lookDescription, setLookDescription] = useState<string>("")
	const [lookParts, setLookParts] = useState<partType[]>([])
	const [lookImageFile, setLookImageFile] = useState<File | null>(null)

	useEffect(() => {
		if (challengeId && userChallengeParticipateData[challengeId]) {
			setIsAlreadyPosted(true)
			// if (userChallengeParticipateData[challengeId].lScore > 0) {
			// 	setCanBeUpdate(false)
			// }
			setLookImage(userChallengeParticipateData[challengeId]?.look?.imageUrl)
			setLookDescription(
				userChallengeParticipateData[challengeId]?.look?.description,
			)
			console.log(userChallengeParticipateData[challengeId]?.look?.parts)
			let sortedParts: partType[] = [
				...userChallengeParticipateData[challengeId]?.look?.parts,
			]
			sortedParts = sortedParts.sort(
				(a: partType, b: partType) => a.index - b.index,
			)
			setLookParts(sortedParts)
		}
	}, [])

	// ---------------------------------------------------------------------
	const PostParticipate = (buttonType: string) => {
		if (buttonType === "Post") {
			const formDataForSubmit = new FormData()
			if (lookImageFile) {
				formDataForSubmit.append("image", lookImageFile)
				ImageUpload(formDataForSubmit)
				// for (const keyValue of formDataForSubmit) console.log(keyValue)
			} else {
				console.log("이미지 없음")
			}
		} else if (buttonType === "Delete") {
			// 게시물 삭제 api 요청
			console.log("삭제!")
			setDeleteModal(true)
		} else {
			// 평가 이력이 있을 경우에는 수정 불가. 삭제만 가능.
			// 사진 , 설명, 제품 정보 비교 후, 수정사항이 있을 경우에만 수정 api 요청.
			// if (canBeUpdate) {
			// 	console.log("수정!")
			// } else {
			// 	alert("평가 이력이 남은 게시물은 수정할 수 없습니다.")
			// }
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
				if (data) {
					console.log(data)
					ChallengeUpload(data)
				} else {
					console.log(message)
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const ChallengeUpload = async (imageURL: string) => {
		const userToken = profileData.userToken
		// 룩 정보 중에서 parts 부분에 빈배열을 확인하고, 빈배열인 부분은 제거한 뒤, 재인덱스 작업 후 포스팅한다.
		let tempLookParts: partType[] = lookParts.filter(
			(part: partType, i: number) => part.part && part.brand && part.name,
		)
		const newLookParts = tempLookParts.map((part: partType, i: number) => {
			const newPart: partType = {
				index: i,
				part: part.part,
				brand: part.brand,
				name: part.name,
			}
			return newPart
		})
		console.log(newLookParts)
		const lookObject = {
			imageUrl: imageURL,
			description: lookDescription,
			parts: newLookParts,
		}
		const CHALLENGE_UPLOAD_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/participations`
		await fetch(CHALLENGE_UPLOAD_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: userToken,
				challengeId: challengeId,
				look: lookObject,
			}),
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				if (data) {
					console.log("등록 성공!")
					console.log(data)
					// 페이지 리로드
					router.replace("/service/challenge/leaderboard")
				} else {
					console.log(message)
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<main className="flex flex-col justify-center items-center absolute w-[100%] min-h-[100%] bg-black">
			{deleteModal ? (
				<AlertBox text="등록 취소" setDeleteModal={setDeleteModal} />
			) : null}
			<ChallengeHeader />
			<div className="flex-1 flex flex-col relative justify-start items-center w-[100%] font-textBoxFont">
				<ParticipateThumbnail />
				<ChallengeInfoContext.Provider
					value={{
						isAlreadyPosted,
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
				{isAlreadyPosted ? (
					// <div className="flex flex-row justify-between items-center mt-[20px] mb-[100px] w-[80%] max-w-[350px] h-[50px] text-[24px] font-semibold text-white">
					// 	<div
					// 		className="flex justify-center items-center w-[48%] max-w-[170px] h-[50px] rounded-[20.5px] bg-[#344467] text-[24px]e cursor-pointer"
					// 		onClick={() => PostParticipate("Update")}
					// 	>
					// 		수정
					// 	</div>
					// 	<div
					// 		className="flex justify-center items-center w-[48%] max-w-[170px] h-[50px] rounded-[20.5px] bg-[#616161] text-[24px] cursor-pointer"
					// 		onClick={() => PostParticipate("Delete")}
					// 	>
					// 		삭제
					// 	</div>
					// </div>
					<div
						className="flex justify-center items-center mt-[20px] mb-[100px] w-[70%] max-w-[310px] h-[50px] rounded-[20.5px] bg-[#AB022B] text-[24px] font-semibold text-white cursor-pointer"
						onClick={() => PostParticipate("Delete")}
					>
						등록 취소
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
