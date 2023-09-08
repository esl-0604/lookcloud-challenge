"use client";

import TutorialBox2 from "../../../components/TutorialBox2";
import { useContext } from "react";
import { TutorialPageContext } from "./page";

export default function Page3() {
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
            <div className="flex flex-col w-[100%] justify-start">
                <span className="w-[100%] text-right text-xs text-white">
                    skip tutorial
                </span>
                <div className="flex flex-row w-[100%] items-center justify-center">
                    <img className="w-50" src="/svg/swipeup.svg" alt="image" />
                    <span className="w-[100%] text-left text-xs text-white">
                        사진이 마음에 들면 위로 스와이프해주세요
                    </span>
                </div>
            </div>
            <div style={{ marginTop: "10px" }}>
                <TutorialBox2 />
            </div>
            <div className="flex flex-row w-[100%] items-center justify-center">
                <img className="w-50" src="/svg/swipedown.svg" alt="image" />
                <span className="w-[100%] text-left text-xs text-white">
                    사진이 아쉬우면 아래로 스와이프해주세요
                </span>
                <span className="pl-10 text-lg text-white">
                    {tutorialPageNum}/10
                </span>
            </div>
        </div>
    );
}
