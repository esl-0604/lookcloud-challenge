"use client";

import TutorialBox from "@/app/components/TutorialBox";
import { useContext } from "react";
import { TutorialPageContext } from "./main";

export default function Page1() {
    const { tutorialPageNum, setTutorialPageNum }: any =
        useContext(TutorialPageContext);
    const handleTouch = () => {
        setTutorialPageNum((prevPageNum: any) => prevPageNum + 1);
    };
    return (
        <div
            className="p-4 w-[100%] h-[100%] flex flex-col items-center"
            onTouchStart={handleTouch}
        >
            <div className="flex flex-row w-[100%] items-start">
                <span className="w-[80%] text-left text-lg text-white">
                    화면을 터치하면 다음 설명
                    <div />
                    으로 넘어갑니다
                </span>
                <span className="w-[20%] text-right text-xs text-white">
                    skip tutorial
                </span>
            </div>
            <div style={{ marginTop: "10px" }}>
                <TutorialBox />
            </div>
            <div className="flex flex-row w-[100%] items-end">
                <span className="w-[100%] text-left text-lg text-white">
                    평가 첫 화면입니다! <div />
                    평가 후 다음 사진이 계속해서
                    <div /> 제공됩니다.
                </span>
                <span className="pl-10 text-lg text-white">
                    {tutorialPageNum}/10
                </span>
            </div>
        </div>
    );
}
