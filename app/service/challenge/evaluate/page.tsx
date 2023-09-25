import NavBar from "@/app/components/navbar"
import ChallengeHeader from "../header"
import ChallengeEvaluateMain from "./main"
import ChallengeEvaluateMainNoSwipe from "./mainNoswipe"

export default function Evaluate() {
	return (
		<main className="flex flex-col justify-center items-center w-full min-h-full bg-black">
			<ChallengeHeader />
			{/* <ChallengeEvaluateMain /> */}
			<ChallengeEvaluateMainNoSwipe />
		</main>
	)
}
