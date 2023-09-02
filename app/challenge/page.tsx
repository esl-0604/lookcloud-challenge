import Link from "next/link";
import NavBar from "../Components/navbar";

export default function Challenge() {
    return (
        <main className="flex flex-col justify-center items-center w-[100%] h-[100%] bg-[#F5F5F5] text-black">
            <div className="flex flex-row justify-around items-center w-[100%] h-[50px] mt-[50px]">
                <Link href="/challenge/participate">
                    <div className="flex justify-center items-center w-[30%] h-[100%] bg-slate-400 cursor-pointer">
                        참가하기
                    </div>
                </Link>
                <Link href="/challenge/evalute">
                    <div className="flex justify-center items-center w-[30%] h-[100%] bg-slate-400 cursor-pointer">
                        평가하기
                    </div>
                </Link>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center w-[100%]">
                리더보드
            </div>
            {/* <NavBar page={"challenge"} /> */}
        </main>
    );
}
