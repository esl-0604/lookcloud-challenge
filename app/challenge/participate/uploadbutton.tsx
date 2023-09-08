"use client";

import { useContext, useEffect, useRef, useState } from "react";
import Camera from "../../../public/svg/camera.svg";
import Gallery from "../../../public/svg/gallery.svg";
import Instagram from "../../../public/svg/instagram.svg";
import { ChallengeInfoContext } from "./main";

interface ChallengeParticipantUploadButtonProps {
    text: string;
}
export default function ChallengeParticipantUploadButton({
    text,
}: ChallengeParticipantUploadButtonProps) {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     // userAgent에 ios // android 가 있는 지 확인해줍니다.
    //     const iOS = navigator.userAgent.match(/iOS_App/i);
    //     const Android = navigator.userAgent.match(/Android_App/i);
    //     // 전역으로 사용할 것이기 때문에 리덕스에 데이터를 보관해주었습니다.
    //     if (iOS) dispatch(userAgentAction.set("iOS_App"));
    //     if (Android) dispatch(userAgentAction.set("Android_App"));
    // }, []);

    const { lookImage, setLookImage } = useContext(ChallengeInfoContext);
    // const [image, setImage] = useState<string[]>([]);
    const fileRef = useRef<HTMLInputElement>(null);
    // input click method
    const handleClick = () => {
        if (text === "갤러리에서 가져오기") {
            fileRef?.current?.click();
        }
    };
    const handleChange = (e: React.ChangeEvent) => {
        if (text === "갤러리에서 가져오기") {
            const targetFile = (e.target as HTMLInputElement).files as FileList;
            const targetFileArray = Array.from(targetFile);
            const selectedFile: string[] = targetFileArray.map((file) => {
                return URL.createObjectURL(file);
            });
            // console.log(selectedFiles);
            setLookImage(selectedFile[0]);
        }
    };

    return (
        <form className="flex justify-center items-center w-[100%] h-[50px]">
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
                onChange={handleChange}
            />
        </form>
    );
}
