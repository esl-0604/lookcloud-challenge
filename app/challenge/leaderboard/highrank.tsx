"use client";

export default function HighRank() {
  return (
    <div className="flex flex-row items-end w-[100%] h-[227px]">
      <div className="flex flex-col items-center w-1/3">
        <div className="flex flex-col items-center absolute z-10 transform -translate-y-1/2">
          <img src="/svg/sampleProfileImg.svg" width="70px" height="70px" />
          <img
            className="absolute z-20 transform translate-y-[60px]"
            src="/svg/KU.svg"
            width="20px"
          />
        </div>
        <div className="flex flex-col items-center pt-[45px] h-[140px] w-[100%] bg-gradient-to-b from-[#1C3A74] to-[#0C1A34] rounded-t-[10px] rounded-l-[10px]">
          <span className="text-[24px] leading-[36px]">점수</span>
          <span className="text-[12px]">나는야이은상</span>
          <span className="text-[12px]">@eslee850</span>
        </div>
      </div>
      <div className="flex flex-col items-center w-1/3">
        <div className="flex flex-col items-center absolute z-10 transform -translate-y-1/2">
          <img src="/svg/sampleProfileImg.svg" width="90px" height="90px" />
          <img
            className="absolute z-20 transform translate-y-[78px]"
            src="/svg/KU.svg"
            width="23px"
          />
        </div>
        <div className="flex flex-col items-center pt-[56px] h-[180px] w-[100%] bg-gradient-to-b from-[#154FBE] to-[#0F0D76] rounded-t-[10px]">
          <span className="text-[24px] leading-[36px]">점수</span>
          <span className="text-[12px]">나는야이은상</span>
          <span className="text-[12px]">@eslee850</span>
        </div>
      </div>
      <div className="flex flex-col items-center w-1/3">
        <div className="flex flex-col items-center absolute z-10 transform -translate-y-1/2">
          <img src="/svg/sampleProfileImg.svg" width="50px" height="50px" />
          <img
            className="absolute z-20 transform translate-y-[45px]"
            src="/svg/KU.svg"
            width="10px"
          />
        </div>
        <div className="flex flex-col items-center pt-[25px] h-[100px] w-[100%] bg-gradient-to-b from-[#1C3A74] to-[#0C1A34] rounded-t-[10px] rounded-r-[10px]">
          <span className="text-[24px] leading-[36px]">점수</span>
          <span className="text-[12px]">나는야이은상</span>
          <span className="text-[12px]">@eslee850</span>
        </div>
      </div>
    </div>
  );
}
