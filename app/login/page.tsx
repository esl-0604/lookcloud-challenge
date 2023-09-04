import TitleIcon from "../../public/LookCloudTitle.svg";
import FacebookLoginButton from "./facebookloginbutton";
import InstagramLoginButton from "./instagramloginbutton";

export default function Login() {
    return (
        <main className="flex flex-col justify-start items-center w-[100%] h-[100%] bg-black text-white">
            <div className="mt-[60px]">
                <TitleIcon width={"310"} height={"47"} color={"white"} />
            </div>
            {/* <FacebookLoginButton /> */}
            <InstagramLoginButton />
        </main>
    );
}
