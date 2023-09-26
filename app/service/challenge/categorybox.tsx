import { challengeInfoType } from "@/app/utils/atoms/serviceGlobalState"

export default function ChallengeCategoryBox({
	challengeId,
	challengeName,
	startedAt,
	endedAt,
	state,
	thumbnailUrl,
	middleThumbnailUrl,
	smallThumbnailUrl,
	comment,
	totalCount,
}: challengeInfoType) {
	return (
		<div
			className={`flex justify-center items-center relative w-[100%] max-w-[350px] h-[350px] mb-[24px] rounded-[20px] overflow-hidden ${
				state >= 0 ? "cursor-pointer" : null
			}`}
		>
			<img
				src={thumbnailUrl}
				alt="challengeImg"
				className="flex justify-center items-center w-[100%] h-[100%] object-cover"
			/>
			<div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-b from-[rgb(217,217,217,0)] via-[rgb(0,0,0,0.5)] to-[rgb(0,0,0,0.5)]" />
			<div className="flex flex-col justify-center items-start absolute bottom-[4px] w-[100%] h-[106px] text-white font-normal">
				<div className="w-[100%] px-[12px] h-[40px] font-semibold text-[30px]">
					{challengeName}
				</div>
				<div className="flex justify-start items-center w-[100%] px-[12px] h-[20px] text-[12px]">
					{state >= 0 ? (
						<>
							<div className="flex justify-end items-center h-[100%]">
								D-{state === 0 ? "Day" : state}
							</div>
							<div className="flex justify-end items-center w-[70px] h-[100%]">
								{totalCount}명 참가중
							</div>
							<div className="flex justify-end items-center w-[110px] h-[100%]">
								총 상금 100,000원
							</div>
						</>
					) : (
						<div className="flex justify-start items-center w-[100%] h-[100%] font-textBoxFont2">
							{state === -1 ? "comming soon" : "already end"}
						</div>
					)}
				</div>
				<div className="flex justify-start items-center w-[100%] h-[36px] px-[12px] text-[12px]">
					<div>{comment}</div>
				</div>
			</div>
		</div>
	)
}
