"use client"

import { challengeRankerType } from "@/app/utils/atoms/serviceGlobalState"

interface RankRowProps {
	ranker: challengeRankerType
}
export default function RankRow({ ranker }: RankRowProps) {
	return (
		<div className="flex flex-row justify-between items-center w-[100%] h-[40px] bg-[#242344] mt-1 rounded-md px-[8px]">
			<div className="flex flex-row items-center">
				<div className="flex justify-center items-center w-[30px] h-[30px] rounded-full overflow-hidden mr-[4px]">
					<img className="object-cover" src={ranker?.imageUrl} />
				</div>
				<div className="flex flex-col py-[8px]">
					<div className="flex flex-row items-center">
						{/* <img
							src={
								ranker?.organization === "고려대학교"
									? "/svg/KU.svg"
									: ranker?.organization === "연세대학교"
									? "/svg/YU.svg"
									: "/svg/KU.svg"
							}
							width="7.91px"
							height="10px"
							style={{ marginRight: 2.09 }}
						/> */}
						<span className="text-[8px]">{ranker?.nickName}</span>
					</div>
					<span className="text-[8px] leading-[8px]">
						{ranker && ranker.instagramUserName
							? "@" + ranker?.instagramUserName
							: ""}
					</span>
				</div>
			</div>
			<span>{ranker ? ranker?.lScore : 0}</span>
		</div>
	)
}
