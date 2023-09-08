"use client";

import Boundary from "@/app/components/Boundary";
import TutorialMovingBox from "@/app/components/TutorialMovingBox";
import LookInfoBox from "@/app/components/LookInfoBox";
import ThumbsDownBox from "@/app/components/ThumbsDownBox";
import ThumbsUpBox from "@/app/components/ThumbsUpBox";
import { inrange } from "@/app/utils";
import registDragEvent from "@/app/utils/registDragEvent";
import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { TutorialPageContext } from "./page";

const BOUNDARY_MARGIN = 0;
const DEFAULT_W = 300;
const DEFAULT_H = 450;

interface ConfigState {
    x: number;
    y: number;
}

export default function Page4() {
    const boundaryRef = useRef<HTMLDivElement>(null);

    const { tutorialPageNum, setTutorialPageNum }: any =
        useContext(TutorialPageContext);

    const [{ x, y }, setConfig] = useState<ConfigState>({
        x: 0,
        y: 40,
    });

    useEffect(() => {
        const boundary = boundaryRef.current?.getBoundingClientRect();

        if (boundary) {
            setConfig({
                x: Math.floor(boundary.width / 2 - DEFAULT_W / 2),
                y: 40,
            });
        }
    }, []);

    const [isUp, setIsUp] = useState<boolean>(false);
    const [isDown, setIsDown] = useState<boolean>(false);
    const [showThumbs, setShowThumbs] = useState<boolean>(false);
    const [isInfo, setIsInfo] = useState<boolean>(false);

    useEffect(() => {
        if (showThumbs) {
            const timer = setTimeout(() => {
                setShowThumbs(false);
                setIsInfo(true);
            }, 500);
            return () => clearTimeout(timer); // 타이머 해제
        }
    }, [showThumbs]);

    useEffect(() => {
        if (isUp || isDown) setShowThumbs(true);
        else setShowThumbs(false);
    }, [isUp, isDown]);

    useEffect(() => {
        if (Math.floor(y) <= 0) {
            setIsUp(true);
            setTutorialPageNum((prevPage: any) => prevPage + 1);
        } else if (Math.floor(y) >= 80) setIsDown(true);
        else {
            setIsUp(false);
            setIsDown(false);
        }
    }, [y]);

    return (
        <div className="p-4 w-[100%] h-[100%] flex flex-col items-center">
            <span className="w-[100%] text-right text-xs text-white">
                skip tutorial
            </span>
            {isUp ? (
                <div>
                    {isInfo ? (
                        <div>
                            <LookInfoBox />
                        </div>
                    ) : (
                        <div
                            className="absolute top-[72px]"
                            style={{
                                left: "50%",
                                transform: "translate(-50%, 0)",
                                width: 300,
                                height: 450,
                            }}
                        >
                            <ThumbsUpBox />
                        </div>
                    )}
                </div>
            ) : (
                <Boundary
                    ref={boundaryRef}
                    style={{ width: 300, height: "100%" }}
                >
                    <div
                        style={{
                            left: x,
                            top: y,
                            width: DEFAULT_W,
                            height: DEFAULT_H,
                        }}
                        className="relative"
                        {...registDragEvent((deltaX, deltaY) => {
                            if (!boundaryRef.current) return;

                            const boundary =
                                boundaryRef.current.getBoundingClientRect();

                            setConfig({
                                x: inrange(
                                    x + deltaX,
                                    BOUNDARY_MARGIN,
                                    boundary.width - DEFAULT_W - BOUNDARY_MARGIN
                                ),
                                y: inrange(
                                    y + deltaY,
                                    BOUNDARY_MARGIN,
                                    boundary.height -
                                        DEFAULT_H -
                                        BOUNDARY_MARGIN
                                ),
                            });
                        })}
                    >
                        <TutorialMovingBox />
                    </div>
                </Boundary>
            )}
            <div className="flex flex-row w-[100%] items-center justify-center">
                <span className="w-[100%] text-left text-lg text-white">
                    위로 스와이프 해보세요!
                </span>
                <span className="pl-10 text-lg text-white">
                    {tutorialPageNum}/10
                </span>
            </div>
        </div>
    );
}
