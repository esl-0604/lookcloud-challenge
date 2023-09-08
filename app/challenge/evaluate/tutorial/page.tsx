"use client";

import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";
import Page4 from "./page4";
import Page5 from "./page5";
import Page6 from "./page6";
import Page7 from "./page7";
import Page8 from "./page8";
import Page9 from "./page9";
import Page10 from "./page10";
import { useEffect, useState, createContext } from "react";
import TutorialHeader from "./header";

export const TutorialPageContext = createContext<any>(null);

export default function TutorialZ() {
    const [tutorialPageNum, setTutorialPageNum] = useState(1);

    useEffect(() => {
        if (tutorialPageNum == 5) {
            const timer = setTimeout(() => {
                setTutorialPageNum(6);
            }, 1000);
            return () => clearTimeout(timer); // 타이머 해제
        }
    }, [tutorialPageNum]);

    useEffect(() => {
        if (tutorialPageNum == 8) {
            const timer = setTimeout(() => {
                setTutorialPageNum(9);
            }, 1000);
            return () => clearTimeout(timer); // 타이머 해제
        }
    }, [tutorialPageNum]);

    return (
        <TutorialPageContext.Provider
            value={{ tutorialPageNum, setTutorialPageNum }}
        >
            <main className="flex flex-col itmes-center justify-center w-[100%] h-[100%] bg-black">
                <TutorialHeader />
                {tutorialPageNum == 1 ? (
                    <Page1 />
                ) : tutorialPageNum == 2 ? (
                    <Page2 />
                ) : tutorialPageNum == 3 ? (
                    <Page3 />
                ) : tutorialPageNum == 4 ? (
                    <Page4 />
                ) : tutorialPageNum == 5 ? (
                    <Page5 />
                ) : tutorialPageNum == 6 ? (
                    <Page6 />
                ) : tutorialPageNum == 7 ? (
                    <Page7 />
                ) : tutorialPageNum == 8 ? (
                    <Page8 />
                ) : tutorialPageNum == 9 ? (
                    <Page9 />
                ) : (
                    <Page10 />
                )}
            </main>
        </TutorialPageContext.Provider>
    );
}
