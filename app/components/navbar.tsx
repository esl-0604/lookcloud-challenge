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
			icon: <Trophy color={page === "challenge" ? "#3E3AFF" : "#9B9BA1"} />,
			title: "challenge",
		},
		{
			icon: <Lookbook color={page === "lookbook" ? "#3E3AFF" : "#9B9BA1"} />,
			title: "lookbook",
		},
		{
			icon: <Chat color={page === "feedback" ? "#3E3AFF" : "#9B9BA1"} />,
			title: "feedback",
		},
		{
			icon: <Trophy color={page === "login" ? "#3E3AFF" : "#9B9BA1"} />,
			title: "login",
		},
	]
	return (
		<div className="absolute bottom-0 flex justify-around items-center w-[100%] h-[50px] bg-white">
			{navigateList.map((tile: Tile) => {
				return (
					<Link
						key={tile.title}
						href={"/" + tile.title}
						className="flex flex-col justify-around items-center h-[42px]"
					>
						{tile.icon}
						<NavBarTile type={tile.title} activate={page === tile.title} />
					</Link>
				)
			})}
		</div>
	)
}
