import NavBar from "../components/navbar"

export default function Lookbook() {
	return (
		<main className="flex flex-col justify-center items-center w-[100%] h-[100%] bg-[#F5F5F5] text-black">
			<h1>Lookbook</h1>
			<NavBar page={"lookbook"} />
		</main>
	)
}
