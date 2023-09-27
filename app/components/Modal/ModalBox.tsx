interface ModalBoxProps {
	setIsEtcOn: React.Dispatch<React.SetStateAction<boolean>>
	setFilerModalOn: React.Dispatch<React.SetStateAction<boolean>>
	setSortModalOn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ModalBox({
	setIsEtcOn,
	setSortModalOn,
	setFilerModalOn,
}: ModalBoxProps) {
	const ModalOn = (type: string) => {
		setIsEtcOn(false)
		if (type === "filter") {
			setFilerModalOn(true)
		} else if (type === "sort") {
			setSortModalOn(true)
		}
	}

	return (
		<>
			<div
				className="fixed top-0 bottom-0 left-0 right-0 z-30 bg-black opacity-0"
				onClick={() => setIsEtcOn(false)}
			/>
			<div className="absolute bottom-[-25px] right-[4px] flex flex-col justify-center items-center w-[97px] h-[76px] z-40 bg-[#F5F5F5] text-black rounded-[15px] text-[12px] font-textBoxFont font-semibold">
				<div
					className="flex flex-row justify-start items-center w-[77px] h-[24px] pb-[4px] border-b-[1px] border-[#D9D9D9] cursor-pointer"
					onClick={() => ModalOn("filter")}
				>
					필터
				</div>
				<div
					className="flex flex-row justify-start items-center w-[77px] h-[24px] pt-[4px] border-t-[1px] border-[#D9D9D9] cursor-pointer"
					onClick={() => ModalOn("sort")}
				>
					정렬
				</div>
			</div>
		</>
	)
}
