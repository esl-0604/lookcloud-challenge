"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

export default function LoginButton() {
    const { data: session, status } = useSession();
    // console.log(session);
    // console.log(status);

    if (status === "authenticated") {
        return (
            <div className="flex flex-col justify-center items-center w-[200px] h-[50px] mt-[50px]">
                <img src={session?.user?.image || ""} alt="profile image" />
                {session?.user?.name}
            </div>
        );
    }

    return (
        <>
            <div
                className="flex justify-center items-center w-[200px] h-[50px] bg-white text-black mt-[50px] cursor-pointer"
                onClick={() => signIn("facebook")}
            >
                페이스북 로그인
            </div>
            {/* <div
                className="flex justify-center items-center w-[200px] h-[50px] bg-white text-black mt-[50px] cursor-pointer"
                onClick={() => {}}
            >
                <Link href={signinurl}>인스타그램 로그인</Link>
            </div> */}
        </>
    );
}
