"use client"

import ChallengeHeader from "@/app/service/challenge/header"
import Link from "next/link"
import { useRecoilState } from "recoil"
import {
	challengeInfoList,
	challengeInfoType,
} from "@/app/utils/atoms/serviceGlobalState"
import ChallengeCategoryBox from "@/app/service/challenge/categorybox"
import CommingSoon from "@/public/svg/commingsoon.svg"

export default function Challenge() {
	const [challengeDataList, setChallengeDataList] =
		useRecoilState<challengeInfoType[]>(challengeInfoList)

	return (
		<main className="flex flex-col justify-start items-center absolute w-[100%] min-h-[100%] bg-black">
			<ChallengeHeader />
			<div className="flex-1 flex flex-col justify-start items-center w-[100%] px-[20px] text-white">
				<div className="flex flex-col justify-center items-start w-[100%] h-[64px] text-[12px] font-textBoxFont leading-[20px] font-normal">
					<span>
						나만의 스타일링을 선보일 수 있는 다양한 챌린지에 참여해보세요!
					</span>
					<span>
						챌린지 기한 종료시 결과를 통해 지급되는 보상을 받아보세요!
					</span>
				</div>
				<div className="flex flex-col justify-between items-center w-[100%]">
					{challengeDataList.map((challenge, i) => {
						return (
							<Link
								key={i}
								className={`${
									challenge.state < 0 ? "pointer-events-none" : null
								}`}
								href={{
									pathname: "/service/challenge/leaderboard",
									query: { id: challenge.challengeId },
								}}
							>
								<ChallengeCategoryBox
									challengeId={challenge.challengeId}
									challengeName={challenge.challengeName}
									startedAt={challenge.startedAt}
									endedAt={challenge.endedAt}
									state={challenge.state}
									thumbnailUrl={challenge.thumbnailUrl}
									comment={challenge.comment}
									totalCount={challenge.totalCount}
								/>
							</Link>
						)
					})}
				</div>
				<div className="flex justify-center items-center w-[100%] mt-[6px] mb-[50px]">
					<CommingSoon />
				</div>
			</div>
		</main>
	)
}
