import Link from "next/link";
import NavBarButton from "./navbarButton";

interface NavBarProps {
    page: string;
}
export default function NavBar({ page }: NavBarProps) {
    return (
        <div className="absolute bottom-0 flex justify-around items-center w-[100%] h-[50px] bg-white">
            <Link href="/challenge">
                <NavBarButton
                    type={"challenge"}
                    activate={page === "challenge"}
                />
            </Link>
            <Link href="/lookbook">
                <NavBarButton
                    type={"lookbook"}
                    activate={page === "lookbook"}
                />
            </Link>
            <Link href="/feedback">
                <NavBarButton
                    type={"feedback"}
                    activate={page === "feedback"}
                />
            </Link>
            <Link href="/loading">
                <NavBarButton type={"loading"} activate={page === "nothing"} />
            </Link>
        </div>
    );
}
