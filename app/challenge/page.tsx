import NavBar from "../Components/navbar";

export default function Challenge() {
    return (
        <main className="flex flex-col justify-center items-center w-[100%] h-[100%] bg-[#F5F5F5] text-black">
            <h1>Challenge</h1>
            <NavBar page={"challenge"} />
        </main>
    );
}
