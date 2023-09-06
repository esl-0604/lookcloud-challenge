"use client";

import ChallengeParticipantUploadButton from "./uploadbutton";

export default function ChallengeParticipantImageInput() {
    return (
        <div className="flex flex-col justify-between items-center w-[100%] h-[199px] px-[15px] text-white text-[12px] font-textBoxFont">
            <div className="flex justify-start items-center w-[100%] h-[20px] font-semibold">
                사진 등록
            </div>
            <div className="flex flex-col justify-between items-center w-[100%] h-[170px] font-bold">
                <ChallengeParticipantUploadButton text="직접 촬영하기" />
                <ChallengeParticipantUploadButton text="갤러리에서 가져오기" />
                <ChallengeParticipantUploadButton text="인스타그램에서 가져오기" />
            </div>
        </div>
    );
}
