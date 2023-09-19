"use client"

import { useContext, useRef } from "react"
import Camera from "@/public/svg/camera.svg"
import Gallery from "@/public/svg/gallery.svg"
import Instagram from "@/public/svg/instagram.svg"
import { ChallengeInfoContext } from "./context"

interface ChallengeParticipantUploadButtonProps {
	text: string
}
export default function ChallengeParticipantUploadButton({
	text,
}: ChallengeParticipantUploadButtonProps) {
	const { setLookImage, setLookImageFile } = useContext(ChallengeInfoContext)

	const fileRef = useRef<HTMLInputElement>(null)
	const handleClick = () => {
		if (text === "갤러리에서 가져오기") {
			fileRef?.current?.click()
		}
	}
	const handleChange = (e: React.ChangeEvent) => {
		if (text === "갤러리에서 가져오기") {
			const maxSize = 5 * 1024 * 1024
			const targetFile = (e.target as HTMLInputElement).files as FileList
			const targetFileArray = Array.from(targetFile)
			if (targetFileArray[0]?.size > maxSize) {
				alert("5MB 아래의 이미지를 선택해주세요.")
				return
			}
			console.log(typeof targetFileArray[0])
			setLookImageFile(targetFileArray[0])
			const selectedFile: string[] = targetFileArray.map((file) => {
				return URL.createObjectURL(file)
			})
			setLookImage(selectedFile[0])
		}
	}

	return (
		<form
			className="flex justify-center items-center w-[100%] h-[50px]"
			encType="multipart/form-data"
		>
			<div
				className="flex relative flex-col justify-center items-center w-[100%] h-[100%] border-2 border-white rounded-[45px] cursor-pointer"
				onClick={handleClick}
			>
				<div className="absolute top-1/2 left-[20px] translate-y-[-50%]">
					{text === "직접 촬영하기" ? (
						<Camera />
					) : text === "갤러리에서 가져오기" ? (
						<Gallery />
					) : (
						<Instagram />
					)}
				</div>
				<div>{text}</div>
			</div>
			<input
				ref={fileRef}
				className="hidden"
				type="file"
				accept="image/*"
				capture={text === "직접 촬영하기" ? "environment" : false}
				onChange={handleChange}
			/>
		</form>
	)
}
