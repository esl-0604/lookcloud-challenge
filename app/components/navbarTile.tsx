interface NavBarButtonProps {
	type: string
	activate: boolean
}

export default function NavBarTile({ type, activate }: NavBarButtonProps) {
	const title = (): string => {
		switch (type) {
			case "challenge":
				return "챌린지"
			case "lookbook":
				return "룩북"
			case "feedback":
				return "피드백"
			default:
				return "로그인"
		}
	}
	return (
		<span
			className={`text-[12px] font-bold ${
				activate ? "text-white" : "text-deactivate"
			}`}
		>
			{title()}
		</span>
	)
}
