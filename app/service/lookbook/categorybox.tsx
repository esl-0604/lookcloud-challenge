import Lockon from "@/public/svg/lockon.svg"

interface LookbookCategoryBoxProps {
	title: string
	publicState: boolean
}

export default function LookbookCategoryBox({
	title,
	publicState,
}: LookbookCategoryBoxProps) {
	return (
		<div className="flex flex-col justify-between items-center w-full text-[12px] font-textBoxFont">
			<div className="flex flex-col justify-center items-center w-full after:pb-[100%] rounded-[10px] bg-[#D9D9D9] relative">
				<div className="absolute w-full h-full grid grid-cols-2 grid-rows-2 p-[3px]">
					<div className="flex justify-center items-center overflow-hidden m-[3px]">
						<img
							src="/image/lookbookExampleImg.png"
							alt="img1"
							className="w-full h-full object-cover"
						/>
					</div>

					<div className="flex justify-center items-center overflow-hidden  m-[3px]">
						<img
							src="/image/lookbookExampleImg.png"
							alt="img2"
							className="w-full h-full object-cover"
						/>
					</div>

					<div className="flex justify-center items-center overflow-hidden  m-[3px]">
						<img
							src="/image/lookbookExampleImg.png"
							alt="img3"
							className="w-full h-full object-cover"
						/>
					</div>

					<div className="flex justify-center items-center overflow-hidden m-[3px]">
						<img
							src="/image/lookbookExampleImg.png"
							alt="img4"
							className="w-full h-full object-cover"
						/>
					</div>
				</div>
			</div>

			<div className="flex flex-col justify-between items-start w-full h-[30px] mt-[5px]">
				<div className="flex flex-row flex-nowrap justify-start items-center w-full h-[12px] font-semibold">
					{title}
				</div>
				{publicState ? null : (
					<div className="flex flex-row flex-nowrap justify-start items-center w-full h-[12px] font-normal">
						<Lockon /> <div className="ml-[2.5px]">비공개</div>
					</div>
				)}
			</div>
		</div>
	)
}
