import Trophy from "/public/svg/trophyicon.svg"
import Lookbook from "../../public/svg/lookbookicon.svg"
import Chat from "../../public/svg/chaticon.svg"
import { ReactElement, useEffect } from "react"
import NavBarTile from "./navbarTile"
import { previousPath } from "../utils/atoms/serviceGlobalState"
import { useRecoilState } from "recoil"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

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

	const [PreviousPath, setPreviousPath] = useRecoilState<string>(previousPath)
	const currentPath = usePathname()
	const param = useSearchParams()
	const currentId = param.get("id")
	const router = useRouter()

	useEffect(() => {
		if (PreviousPath === "") {
			if (currentPath === "/service/challenge")
				setPreviousPath("/service/lookbook")
			else if (currentPath === "/service/lookbook")
				setPreviousPath("/service/challenge")
		}
	}, [PreviousPath, currentPath])

	const navigate = (url: string) => {
		let currentURL = currentPath
		if (currentId) currentURL += "?id=" + currentId
		setPreviousPath(currentURL)
		router.push(url)
	}
	return (
		<div className="fixed bottom-0 flex justify-around items-center w-full max-w-[480px] h-[56px] bg-black z-20">
			{navigateList.map((tile: Tile) => {
				return (
					<div
						key={tile.title}
						onClick={() => {
							if (page !== tile.title) navigate(PreviousPath)
						}}
						className="flex flex-col justify-around items-center h-[42px] cursor-pointer"
					>
						{tile.icon}
						<NavBarTile type={tile.title} activate={page === tile.title} />
					</div>
				)
			})}
		</div>
	)
}
