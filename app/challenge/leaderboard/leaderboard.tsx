"use client";

import HighRank from "./highrank";
import RankRow from "./rankrow";

export default function LeaderBoard() {
    return (
        <div className="flex flex-col justify-center items-center w-[100%] h-[100%] px-[5%]">
            <HighRank />
            <RankRow rank={4} />
            <RankRow rank={5} />
            <RankRow rank={6} />
            <RankRow rank={7} />
            <RankRow rank={8} />
            <RankRow rank={9} />
            <RankRow rank={10} />
            <span className="w-[100%] text-[#00F0FF] text-left text-[8px] leading-[12px]">
                38분전 업데이트
            </span>
        </div>
    );
}
