import Trophy from "../../public/trophyicon.svg";
import Lookbook from "../../public/lookbookicon.svg";
import Chat from "../../public/chaticon.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import NavBarButton from "./navbarButton";

export default function NavBar() {
    return (
        <div className="absolute bottom-0 flex justify-around items-center w-[100%] h-[56px] bg-slate-500">
            <Link href="/challenge">
                <NavBarButton type={"challenge"} />
            </Link>
            <Link href="/lookbook">
                <NavBarButton type={"lookbook"} />
            </Link>
            <Link href="/feedback">
                <NavBarButton type={"feedback"} />
            </Link>
            <Link href="/loading">
                <NavBarButton type={"loading"} />
            </Link>
        </div>
    );
}
