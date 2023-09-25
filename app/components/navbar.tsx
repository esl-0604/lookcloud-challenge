import Link from "next/link"
import Trophy from "/public/svg/trophyicon.svg"
import Lookbook from "../../public/svg/lookbookicon.svg"
import Chat from "../../public/svg/chaticon.svg"
import { ReactElement } from "react"
import NavBarTile from "./navbarTile"

interface NavBarProps {
	page: string
}
interface Tile {
	icon: ReactElement
	title: string
}

export default function NavBar({ page }: NavBarProps) {
	const navigateList: Array<Tile> = [
		{
			icon: <Trophy color={page === "challenge" ? "#FFFFFF" : "#9B9BA1"} />,
			title: "challenge",
		},
		{
			icon: <Lookbook color={page === "lookbook" ? "#FFFFFF" : "#9B9BA1"} />,
			title: "lookbook",
		},
		// {
		// 	icon: <Chat color={page === "feedback" ? "#FFFFFF" : "#9B9BA1"} />,
		// 	title: "feedback",
		// },
	]
	return (
		<div className="fixed bottom-0 flex justify-around items-center w-full max-w-[480px] h-[56px] bg-black">
			{navigateList.map((tile: Tile) => {
				return (
					<Link
						key={tile.title}
						href={"/service/" + tile.title}
						className={`flex flex-col justify-around items-center h-[42px] ${
							tile.title === "feedback" ? "pointer-events-none" : null
						} `}
					>
						{tile.icon}
						<NavBarTile type={tile.title} activate={page === tile.title} />
					</Link>
				)
			})}
		</div>
	)
}
