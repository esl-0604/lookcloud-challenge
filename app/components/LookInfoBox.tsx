export default function LookInfoBox() {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-full w-full relative">
        <img
          src="/image/image.png"
          alt="image"
          style={{ width: "300px", height: "450px" }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#333333] to-[#333333]"
          style={{
            zIndex: 10,
            height: "15%",
          }}
        >
          <div className="absolute bottom-3 ml-2">
            <span className="text-left text-xs text-white">
              고연전을 즐기기위한 편한 무지 티를 기반으로 만든 룩
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-[12px]">
        <div className="flex flex-row justify-between items-center w-[100%] h-[40px] bg-black mt-1 rounded-md px-[8px]">
          <div className="flex flex-row">
            <img
              className="rounded-full"
              src="/svg/profileImg.svg"
              width="50px"
              height="50px"
              style={{ marginRight: 4 }}
            />
            <div className="flex flex-col py-[8px]">
              <div className="flex flex-row">
                <span className="text-white text-[8px]">나는야이은상</span>
              </div>
              <span className="text-white text-[8px] leading-[8px]">
                @eslee850
              </span>
            </div>
          </div>
          <span className="text-white text-[24px]">점수</span>
        </div>
        <div className="flex flex-col mt-[12px]">
          <span className="text-white text-[12px]">
            상의 - musinsa standard basic cotton t-shirts
          </span>
          <span className="text-white text-[12px]">
            하의 - musinsa standard banding chino pants
          </span>
          <span className="text-white text-[12px]">신발 - 정보 없음</span>
        </div>
      </div>
    </div>
  );
}
