import Spinner from "@/public/svg/spinner.svg"

interface SpinnerBoxProps {
	text?: string
}

export default function SpinnerBox({ text }: SpinnerBoxProps) {
	return (
		<div className="flex justify-center items-center absolute top-0 left-0 w-full h-full">
			<div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-20"></div>
			<div className="flex flex-col justify-center items-center z-30">
				<Spinner />
				{text ? (
					<div className="whitespace-nowrap text-[12px] text-white">{text}</div>
				) : null}
			</div>
		</div>
	)
}
