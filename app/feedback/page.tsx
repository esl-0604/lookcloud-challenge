import NavBar from "../components/navbar";

export default function Feedback() {
    return (
        <main className="flex flex-col justify-center items-center w-[100%] h-[100%] bg-[#F5F5F5] text-black">
            <h1>Feedback</h1>
            <NavBar page={"feedback"} />
        </main>
    );
}
