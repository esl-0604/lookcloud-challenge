"use client";
interface RankRowProps {
  rank: number;
}
export default function RankRow({ rank }: RankRowProps) {
  return (
    <div className="flex flex-row justify-between items-center w-[100%] h-[40px] bg-[#242344] mt-1 rounded-md px-[8px]">
      <div className="flex flex-row">
        <img
          src="/svg/sampleProfileImg.svg"
          width="30px"
          height="30px"
          style={{ marginRight: 4 }}
        />
        <div className="flex flex-col py-[8px]">
          <div className="flex flex-row">
            <img
              src="/svg/KU.svg"
              width="7.91px"
              height="10px"
              style={{ marginRight: 2.09 }}
            />
            <span className="text-[8px]">나는야이은상</span>
          </div>
          <span className="text-[8px] leading-[8px]">@eslee850</span>
        </div>
      </div>
      <span>점수</span>
    </div>
  );
}
