import ChallengeHeader from "../header"
import LeaderBoard from "./leaderboard"
import Thumbnail from "./thumbnail"
import LinkButton from "./linkbutton"

export default function ChallengeLeaderBoard() {
	return (
		<main className="flex flex-col justify-start items-center absolute w-[100%] min-h-[100%]">
			<ChallengeHeader />
			<div className="flex-1 flex flex-col relative justify-start items-center w-[100%] text-white bg-black">
				<Thumbnail />
				<LinkButton />
				<div className="flex justify-center items-center w-full mb-[87px]">
					<LeaderBoard />
				</div>
			</div>
		</main>
	)
}
