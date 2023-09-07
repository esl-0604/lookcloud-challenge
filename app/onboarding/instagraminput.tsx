"use client";

import InstagramLoginButton from "../instagramloginbutton";

export default function OnboardingInstagramInput() {
    return (
        <div className="flex flex-col justify-between items-center w-[364px] h-[176px] text-[12px] font-textBoxFont text-[#828282]">
            <div className="flex justify-start items-center w-[350px] h-[52px]">
                인스타그램을 연동할 경우, 챌린지 참여 시 타인에게 본인의
                인스타그램 아이디를 노출시킬 수 있습니다.
            </div>
            <div className="flex justify-center items-center h-[72px]">
                <InstagramLoginButton />
            </div>
            <div className="flex justify-center items-center w-[350px] h-[52px]">
                이후에 화면 상단에 있는 “내 정보”에서 언제든지 연결하실 수
                있습니다.
            </div>
        </div>
    );
}
