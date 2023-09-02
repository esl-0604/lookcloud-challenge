"use client";
import FacebookLogin from "@greatsumini/react-facebook-login";

export default function LoginButton() {
    return (
        <div className="flex justify-center items-center w-[200px] h-[50px] bg-white text-black mt-[50px] cursor-pointer">
            <FacebookLogin
                appId={`657358173031399`}
                autoLoad={true}
                fields="name,email,picture"
                onSuccess={(userInfo) => console.log(userInfo)}
                onFail={(response) => console.log(response)}
                // onProfileSuccess={(userInfo) => console.log(userInfo)}
            />
        </div>
    );
}
