"use client";

import Camera from "../../../public/svg/camera.svg";
import Gallery from "../../../public/svg/gallery.svg";
import Instagram from "../../../public/svg/instagram.svg";

interface ChallengeParticipantUploadButtonProps {
    text: string;
}
export default function ChallengeParticipantUploadButton({
    text,
}: ChallengeParticipantUploadButtonProps) {
    return (
        <div className="flex relative flex-col justify-center items-center w-[100%] h-[50px] border-2 border-white rounded-[45px] cursor-pointer">
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
    );
}
