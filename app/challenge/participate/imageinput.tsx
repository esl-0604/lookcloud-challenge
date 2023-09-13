"use client"

import { useContext, useEffect } from "react"
import ChallengeParticipantUploadButton from "./uploadbutton"
import Cancle from "@/public/svg/cancle.svg"
import { ChallengeInfoContext } from "./main"

export default function ChallengeParticipantImageInput() {
	const { lookImage, setLookImage } = useContext(ChallengeInfoContext)
	const CancleLookImage = () => {
		setLookImage(null)
	}

	return (
		<div className="flex flex-col justify-between items-center w-[100%] px-[15px] text-white text-[12px] font-textBoxFont">
			<div className="flex justify-start items-center w-[100%] h-[20px] font-semibold">
				사진 등록
			</div>
			{lookImage ? (
				<div className="flex relative justify-center items-start w-[100%] mt-[5px] rounded-[10px] overflow-hidden">
					<img
						src={lookImage}
						alt="challengeImg"
						className="flex justify-center items-start w-[100%] object-cover"
					/>
					{/* <div
                        className="flex justify-center items-center absolute top-[15px] right-[15px] cursor-pointer"
                        onClick={CancleLookImage}
                    >
                        <Cancle />
                    </div> */}
				</div>
			) : (
				<div className="flex flex-col justify-between items-center w-[100%] h-[110px] mt-[9px] font-bold">
					{/* <ChallengeParticipantUploadButton text="직접 촬영하기" /> */}
					<ChallengeParticipantUploadButton text="갤러리에서 가져오기" />
					<ChallengeParticipantUploadButton text="인스타그램에서 가져오기" />
				</div>
			)}
		</div>
	)
}
