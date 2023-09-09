"use client";
interface RankRowProps {
    rank: number;
    ranker: any;
}
export default function RankRow({ rank, ranker }: RankRowProps) {
    return (
        <div className="flex flex-row justify-between items-center w-[100%] h-[40px] bg-[#242344] mt-1 rounded-md px-[8px]">
            <div className="flex flex-row">
                <img
                    className="rounded-full"
                    src="/svg/sampleProfileImg.svg"
                    width="30px"
                    height="30px"
                    style={{ marginRight: 4 }}
                />
                <div className="flex flex-col py-[8px]">
                    <div className="flex flex-row">
                        <img
                            src={
                                ranker?.organization === "고려대학교"
                                    ? "/svg/KU.svg"
                                    : ranker?.organization === "연세대학교"
                                    ? "/svg/YU.svg"
                                    : "/svg/KU.svg"
                            }
                            width="7.91px"
                            height="10px"
                            style={{ marginRight: 2.09 }}
                        />
                        <span className="text-[8px]">{ranker?.nickName}</span>
                    </div>
                    <span className="text-[8px] leading-[8px]">
                        @{ranker?.instagramUserName}
                    </span>
                </div>
            </div>
            <span>{ranker?.lScore}</span>
        </div>
    );
}
