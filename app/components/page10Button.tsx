import { useRouter } from "next/navigation"

export default function Page10Button() {
	const router = useRouter()
	const handleTouch = () => {
		router.replace("/service/challenge/evaluate")
	}

	return (
		<div
			className="flex items-center justify-center bg-gray-500 rounded-full ring-1 ring-white"
			onTouchStart={handleTouch}
			onClick={handleTouch}
			style={{
				position: "fixed",
				left: "50%",
				transform: "translate(-50%, 0)",
				width: 180,
				height: 50,
				top: 600,
			}}
		>
			<span className="text-xl text-white">시작하기</span>
		</div>
	)
}
