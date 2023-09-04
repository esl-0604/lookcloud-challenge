"use client";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useState } from "react";

interface Profile {
    name: string;
    email: string;
    picture: {
        data: {
            width: number;
            height: number;
            is_silhouette: boolean;
            url: string;
        };
    };
    id: string;
}
export default function LoginButton() {
    // const { data: session, status } = useSession();
    // console.log(session);
    // console.log(status);

    // if (status === "authenticated") {
    //     return (
    //         <div className="flex flex-col justify-center items-center w-[200px] h-[50px] mt-[50px]">
    //             <img src={session?.user?.image || ""} alt="profile image" />
    //             {session?.user?.name}
    //         </div>
    //     );
    // }
    const [profile, setProfile] = useState<any>();
    if (profile?.name) {
        return (
            <>
                <div className="flex flex-col justify-center items-center w-[200px] bg-white text-black mt-[50px] cursor-pointer">
                    <img src={profile.picture.data.url} alt="" />
                    <span>{profile.name}</span>
                    <span>{profile.id}</span>
                    <span>{profile.email}</span>
                </div>
            </>
        );
    }
    return (
        <>
            <div className="flex justify-center items-center w-[200px] h-[50px] bg-white text-black mt-[50px] cursor-pointer">
                <FacebookLogin
                    appId={"657358173031399"}
                    onSuccess={(response) => {
                        console.log("Login Success!");
                        console.log("id: ", response);
                    }}
                    onFail={(error) => {
                        console.log("Login Failed!");
                        console.log("status: ", error);
                    }}
                    onProfileSuccess={(response) => {
                        console.log("Get Profile Success!");
                        console.log("name: ", response);
                        setProfile(response);
                    }}
                />
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
