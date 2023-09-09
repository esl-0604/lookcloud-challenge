"use client";

import Boundary from "@/app/components/Boundary";
import Box from "@/app/components/Box";
import LookInfoBox from "@/app/components/LookInfoBox";
import ThumbsDownBox from "@/app/components/ThumbsDownBox";
import ThumbsUpBox from "@/app/components/ThumbsUpBox";
import { inrange } from "@/app/utils";
import { userProfileState } from "@/app/utils/atoms/userprofile";
import registDragEvent from "@/app/utils/registDragEvent";
import { useSearchParams } from "next/navigation";
import { createContext, use, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { dummyList } from "./lookImgDummy";
import Next from "@/public/svg/swipeup.svg";

const BOUNDARY_MARGIN = 0;
const DEFAULT_W = 300;
const DEFAULT_H = 450;

interface ConfigState {
    x: number;
    y: number;
}
export const ChallengeImgContext = createContext<any>(null);

export default function ChallengeEvaluateMain() {
    const boundaryRef = useRef<HTMLDivElement>(null);

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
            }, 1000);
            return () => clearTimeout(timer); // 타이머 해제
        }
    }, [showThumbs]);

    useEffect(() => {
        if (isUp || isDown) {
            setShowThumbs(true);
            const evaluate = isUp ? 1 : 0;
            console.log(evaluate);
            const userId = profileData.userId;
            console.log(userId);
            const participationId =
                challengeImgList[currentImg - 1]?.participationId;
            console.log(participationId);

            // 평가 코드 --------------------------------
            setCurrentImgEvaluate(true);
            // EvaluateImg(userId, evaluate, participationId);
            // --------------------------------------------
        } else setShowThumbs(false);
    }, [isUp, isDown]);

    useEffect(() => {
        if (Math.floor(y) <= 0) setIsUp(true);
        else if (Math.floor(y) >= 80) setIsDown(true);
        else {
            setIsUp(false);
            setIsDown(false);
        }
    }, [y]);

    //----------------------------------------------------------------------------
    const param = useSearchParams();
    const challengeId = param.get("id");
    const [profileData, setProfileData] = useRecoilState<any>(userProfileState);
    const [challengeImgList, setChallengeImgList] = useState<any[]>([]);
    const [currentImg, setCurrentImg] = useState<number>(0);
    const [currentImgEvaluate, setCurrentImgEvaluate] = useState<boolean>(true);
    const [canBeNext, setCanBeNext] = useState<boolean>(false);

    const GetChallengeImgs = async (userId: string) => {
        const GET_CHALLENGEIMAGES_URL = `https://external-api.stage.lookcloud.co/challenges/${challengeId}/participations-to-evaluate?userId=${userId}&pageSize=5`;
        await fetch(GET_CHALLENGEIMAGES_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(({ status, message, data }) => {
                if (status === "OK") {
                    console.log(data);
                    if (data.length > 0) {
                        const newList = challengeImgList.concat(data);
                        setChallengeImgList(newList);
                        setCurrentImgEvaluate(false);
                        setCurrentImg((prev) => prev + 1);
                    }
                } else {
                    console.log(message);
                    const newList = challengeImgList.concat(dummyList);
                    setChallengeImgList(newList);
                    if (currentImg === 0) {
                        setCurrentImg((prev) => prev + 1);
                        setCurrentImgEvaluate(false);
                    }
                }
            })
            .catch((error) => console.log(error));
    };

    const EvaluateImg = async (
        userId: string,
        rating: number,
        participationId: string
    ) => {
        const POST_EVALUATEIMAGE_URL = `https://external-api.stage.lookcloud.co/challenges/${challengeId}/evaluate`;
        await fetch(POST_EVALUATEIMAGE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                userId: userId,
                evaluation: {
                    participationId: participationId,
                    rating: rating,
                },
            }),
        })
            .then((res) => res.json())
            .then(({ status, message, data }) => {
                if (status === "OK") {
                    console.log(data);
                    setCurrentImgEvaluate(true);
                } else console.log(message);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        if (
            profileData.userId &&
            challengeImgList.length === currentImg &&
            currentImgEvaluate
        ) {
            setCanBeNext(false);
            GetChallengeImgs(profileData.userId);
        } else if (challengeImgList.length > currentImg) {
            setCanBeNext(true);
        }
    }, [challengeImgList, profileData, currentImg, currentImgEvaluate]);

    useEffect(() => {}, [challengeImgList, currentImg, currentImgEvaluate]);

    const NextImg = () => {
        setCurrentImgEvaluate(false);
        setCurrentImg((prev) => prev + 1);
        setIsUp(false);
        setIsDown(false);
        setShowThumbs(false);
        setIsInfo(false);
        setConfig({
            x: 0,
            y: 40,
        });
    };

    return (
        <ChallengeImgContext.Provider
            value={{ challengeImgList, currentImg, currentImgEvaluate }}
        >
            <div className="px-4 w-[100%] h-[100%] flex flex-col items-center">
                {isUp ? (
                    <div>
                        {isInfo && currentImgEvaluate ? (
                            <div>
                                <LookInfoBox />
                            </div>
                        ) : (
                            <div
                                className="absolute top-[52px]"
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
                ) : isDown ? (
                    <div>
                        {isInfo && currentImgEvaluate ? (
                            <div>
                                <LookInfoBox />
                            </div>
                        ) : (
                            <div
                                className="absolute top-[132px]"
                                style={{
                                    left: "50%",
                                    transform: "translate(-50%, 0)",
                                    width: 300,
                                    height: 450,
                                }}
                            >
                                <ThumbsDownBox />
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
                                        boundary.width -
                                            DEFAULT_W -
                                            BOUNDARY_MARGIN
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
                            <Box />
                        </div>
                    </Boundary>
                )}
                {currentImgEvaluate && currentImg > 0 && canBeNext ? (
                    <div
                        className="fixed top-[40%] right-[15px] transform-translate-y-[40%] rotate-90"
                        onClick={NextImg}
                    >
                        <Next color={"white"} />
                    </div>
                ) : null}
            </div>
        </ChallengeImgContext.Provider>
    );
}
