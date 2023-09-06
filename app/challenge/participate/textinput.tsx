"use client";

export default function ChallengeParticipantTextInput() {
    return (
        <div className="flex flex-col justify-between items-center w-[100%] h-[155px] p-[15px] text-white text-[12px] font-textBoxFont">
            <div className="flex justify-start items-center w-[100%] h-[20px] font-semibold">
                룩에 대한 설명
            </div>
            <div className="flex flex-col justify-between items-center w-[100%] h-[105px] font-bold">
                <input
                    id="input-1"
                    type="text"
                    placeholder="룩에 대한 설명을 써주세요. ex) 고연전을 편하게 즐기기 위해 자연스러운 룩"
                    className="w-[100%] h-[32px] pt-[15px] bg-transparent focus: outline-none placeholder-[#959595]"
                />
                <div className="w-[100%] h-[3px] bg-[#D9D9D9]" />
                <input
                    id="input-2"
                    type="text"
                    className=" w-[100%] h-[32px] bg-transparent focus: outline-none placeholder-[#959595]"
                />
                <div className="w-[100%] h-[3px] bg-[#D9D9D9]" />
                <input
                    id="input-3"
                    type="text"
                    className="flex items-end w-[100%] h-[32px] bg-transparent focus: outline-none placeholder-[#959595]"
                />
                <div className="w-[100%] h-[3px] bg-[#D9D9D9]" />
            </div>
        </div>
    );
}
