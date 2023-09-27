interface ModalBoxProps {
	setSortModalOn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SortModal({ setSortModalOn }: ModalBoxProps) {
	const ModalOn = (type: string) => {}

	return (
		<>
			<div
				className="fixed top-0 bottom-0 left-0 right-0 z-30"
				onClick={() => setSortModalOn(false)}
			/>
			<div className="absolute bottom-[96px] left-[10px] right-[10px] flex flex-col justify-center items-center h-[182px] z-40 text-black rounded-[20px] font-textBoxFont font-semibold overflow-hidden">
				<div className="flex w-full h-[122px]"></div>
				<div className="flex w-full h-[60px]"></div>
			</div>
		</>
	)
}
