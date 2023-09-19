import ChallengeHeader from "../header"
import ChallengeEvaluateMain from "./main"

export default function Evaluate() {
	return (
		<main className="flex flex-col justify-center items-center w-screen h-screen bg-black">
			<ChallengeHeader />
			<ChallengeEvaluateMain />
		</main>
	)
}
