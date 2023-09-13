import ChallengeHeader from "./header"
import ChallengeMain from "./main"

export default function Challenge() {
	return (
		<main className="flex flex-col justify-start items-center absolute w-[100%] min-h-[100%] bg-black">
			<ChallengeHeader />
			<ChallengeMain />
		</main>
	)
}
