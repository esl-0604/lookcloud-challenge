"use client"

import { useState, createContext, useEffect } from "react"
import ChallengeParticipantImageInput from "./imageinput"
import ChallengeParticipantProductInput from "./productinput"
import ChallengeParticipantTextInput from "./textinput"
import { userProfileState } from "@/app/utils/atoms/serviceGlobalState"
import { useRecoilState, useRecoilValue } from "recoil"
// import { userChallengeParticipantInfoState } from "@/app/utils/atoms/serviceGlobalState"
import { useParams, useSearchParams } from "next/navigation"

export const ChallengeInfoContext = createContext<any>(null)

export default function ChallengeParticipantMain() {
	const param = useSearchParams()

	// 전역으로 적용되는 룩정보 -> recoilState로 관리
	const [profileData, setProfileData] = useRecoilState<any>(userProfileState)

	// 임시로 존재하는 룩정보
	const [lookImage, setLookImage] = useState(null)
	const [lookImageFile, setLookImageFile] = useState(null)
	const [lookDescription, setLookDescription] = useState("")
	const [lookProductInfoTop, setLookProductInfoTop] = useState("")
	const [lookProductInfoBottom, setLookProductInfoBottom] = useState("")
	const [lookProductInfoShoes, setLookProductInfoShoes] = useState("")

	// useEffect(() => {
	//     if (
	//         lookImage &&
	//         lookDescription &&
	//         lookProductInfoTop &&
	//         lookProductInfoBottom &&
	//         lookProductInfoShoes
	//     ) {
	//         console.log({ lookImage: lookImage });
	//         console.log({ lookDescription: lookDescription });
	//         const Top = JSON.parse(lookProductInfoTop);
	//         const Bottom = JSON.parse(lookProductInfoBottom);
	//         const Shoes = JSON.parse(lookProductInfoShoes);
	//         console.log({
	//             lookProductInfoTop: Top,
	//         });
	//         console.log({
	//             lookProductInfoBottom: Bottom,
	//         });
	//         console.log({
	//             lookProductInfoShoes: Shoes,
	//         });
	//     }
	// }, [
	//     lookImage,
	//     lookDescription,
	//     lookProductInfoTop,
	//     lookProductInfoBottom,
	//     lookProductInfoShoes,
	// ]);

	const PostParticipate = () => {
		const formDataForSubmit = new FormData()
		if (lookImageFile) {
			formDataForSubmit.append("image", lookImageFile)
			// console.log(formDataForSubmit[0]);
			// for (const keyValue of formDataForSubmit) console.log(keyValue);
			ImageUpload(formDataForSubmit)
		} else {
			console.log("이미지 없음")
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
		const userId = profileData.userId
		const challengeId = Number(param.get("id"))
		const lookObject = {
			imageUrl: imageURL,
			description: lookDescription,
			top: lookProductInfoTop,
			bottom: lookProductInfoBottom,
			shoes: lookProductInfoShoes,
		}
		const CHALLENGE_UPLOAD_URL = `${process.env.NEXT_PUBLIC_API_CALL_URL}/participations`
		await fetch(CHALLENGE_UPLOAD_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: userId,
				challengeId: challengeId,
				look: lookObject,
			}),
		})
			.then((res) => res.json())
			.then(({ status, message, data }) => {
				if (status === "OK") {
					console.log(data)
				} else {
					console.log(message)
				}
			})

			.catch((error) => {
				console.log(error)
			})
	}

	// 챌린지 리더보드 정보
	const [challengeData, setChallengeData] = useState({
		name: profileData.organization === "연세대학교" ? "연고전" : "고연전",
		participants: {
			count: 0,
			users: [],
		},
	})

	const id = param.get("id")
	// console.log(id)

	const today = new Date()
	const deadline = new Date("2023-09-10")
	const diffDate = deadline.getTime() - today.getTime()
	const dDay = Math.floor(diffDate / (1000 * 60 * 60 * 24))

	return (
		<div className="flex-1 flex flex-col relative justify-start items-center w-[100%] font-textBoxFont">
			<div className="flex relative justify-center items-start w-[100%] h-[124px] py-[8px] overflow-hidden">
				<img
					src="/image/challenge_thumbnail_1_3.png"
					alt="challengeImg"
					className="flex justify-center items-start w-[100%] h-[100%] object-cover"
				/>
				<div className="flex flex-col justify-center items-start absolute top-[8px] w-[100%] h-[108px] text-white">
					<div className="w-[100%] pl-[20px] h-[40px] font-semibold text-[30px]">
						{challengeData.name}
					</div>
					<div className="flex justify-start items-center w-[100%] pl-[20px] h-[20px] text-[12px]">
						<div className="flex justify-end items-center h-[100%]">
							D-{dDay === 0 ? "Day" : dDay}
						</div>
						<div className="flex justify-end items-center w-[70px] h-[100%]">
							{challengeData.participants.count}명 참가중
						</div>
					</div>
					<div className="flex flex-col justify-center items-start w-[100%] pl-[20px] h-[48px] text-[12px]">
						<div>고연전을 최대로 즐기기 위해 준비한 오늘의 스타일로</div>
						<div>고연전 패션왕에 도전하세요!</div>
					</div>
				</div>
			</div>
			<ChallengeInfoContext.Provider
				value={{
					lookImage,
					setLookImage,
					lookImageFile,
					setLookImageFile,
					lookDescription,
					setLookDescription,
					lookProductInfoTop,
					setLookProductInfoTop,
					lookProductInfoBottom,
					setLookProductInfoBottom,
					lookProductInfoShoes,
					setLookProductInfoShoes,
				}}
			>
				<ChallengeParticipantImageInput />
				<ChallengeParticipantTextInput />
				<ChallengeParticipantProductInput />
			</ChallengeInfoContext.Provider>
			<div
				className="flex justify-center items-center mt-[20px] mb-[100px] w-[310px] h-[50px] rounded-[20.5px] bg-[#344467] text-[24px] font-semibold text-white cursor-pointer"
				onClick={PostParticipate}
			>
				완료
			</div>
		</div>
	)
}
