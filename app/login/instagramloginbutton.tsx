"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function InstagramLoginButton() {
    const CODE_REQUEST_URL = `https://api.instagram.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URL}&scope=user_profile,user_media&response_type=code`;

    const param = useSearchParams();
    const code = param.get("code");

    if (code) {
        // 서버에 코드 전달 후 응답 데이터를 렌더링
        console.log(code);

        return (
            <div className="flex justify-center items-center w-[200px] h-[50px] bg-white text-black mt-[50px] cursor-pointer">
                코드 수령 완료! url 확인 바람.
            </div>
        );
    }

    return (
        <Link href={CODE_REQUEST_URL} className="mt-[35px] cursor-pointer">
            <div className="flex justify-center items-center w-[320px] h-[52px] rounded-[29px] bg-[#D9D9D9]">
                <div className="flex justify-center items-center w-[316px] h-[48px] rounded-[29px] bg-[#707070] text-white text-[14px] font-mainFont">
                    SIGN IN WITH INSTAGRAM
                </div>
            </div>
        </Link>
    );
}
