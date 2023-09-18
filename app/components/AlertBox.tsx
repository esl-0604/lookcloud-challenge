interface AlertBoxProps {
	text: string
	setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AlertBox({ text, setDeleteModal }: AlertBoxProps) {
	if (text === "등록 취소")
		return (
			<>
				<div className="absolute top-0 left-0 w-full h-full bg-black opacity-20 z-20"></div>
				<div className="flex flex-col justify-start items-center w-[80%] min-h-[200px] max-w-[384px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#343434] rounded-[15px] z-30 overflow-hidden font-textBoxFont font-semibold">
					<div className="flex flex-col justify-center items-center w-full px-[10%] min-h-[130px] py-[10px] bg-transparent">
						<div className="flex justify-start items-center text-[24px] text-white w-full min-h-[45px]">
							등록 정보 삭제
						</div>
						<div className="flex flex-col justify-center items-start text-[12px] text-[#CACACA] w-full min-h-[60px]">
							<span> 등록 정보를 삭제할 경우 평가 기록이 초기화되며, </span>
							<span>되돌리실 수 없습니다. </span>
							<span>다시 등록하실 경우 평가가 처음부터 다시 시작됩니다.</span>
						</div>
					</div>

					<div className="flex flex-row justify-center items-center w-full h-[70px] bg-[#474747] border-t-[3px] border-[#AEAEAE] text-[24px] ">
						<div className="flex justify-center items-center w-[50%] h-full border-r-[1px] border-[#AEAEAE] text-[#FF7C7C] cursor-pointer">
							삭제
						</div>
						<div
							className="flex justify-center items-center w-[50%] h-full border-l-[1px] border-[#AEAEAE] text-[#E29F9F] cursor-pointer"
							onClick={() => setDeleteModal(false)}
						>
							취소
						</div>
					</div>
				</div>
			</>
		)
}
