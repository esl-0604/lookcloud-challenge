import Link from "next/link";
import HeaderLogo from "../../public/svg/headerlogo.svg";
import Profile from "../../public/svg/profile.svg";

export default function ChallengeHeader() {
    return (
        <div className="flex flex-row justify-between items-center w-[100%] h-[56px] px-[16px]">
            <HeaderLogo width={"126"} height={"32"} color={"white"} />
            <Link href={"/challenge/profile"} className="cursor-pointer">
                <Profile width={"40"} height={"40"} />
            </Link>
        </div>
    );
}
