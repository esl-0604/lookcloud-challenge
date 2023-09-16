import React, { useContext, useEffect, useState } from "react"
import { ChallengeImgContext } from "../challenge/evaluate/main"

export default React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
	function Box(props, ref) {
		const { challengeImgList, currentImg, currentImgEvaluate } =
			useContext(ChallengeImgContext)

		return (
			<div
				{...props}
				ref={ref}
				className="h-full w-full cursor-move bg-black shadow-xl transition-[shadow,transform] active:scale-95 active:shadow-lg relative"
			>
				<div className="h-full w-full relative">
					<img
						width="300"
						height="450"
						src={challengeImgList[currentImg - 1]?.look?.imageUrl}
						alt="image"
						style={{ width: "100%", height: "100%" }}
					/>
					<div
						className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#333333] to-[#333333]"
						style={{
							zIndex: 10,
							height: "15%",
						}}
					>
						<div className="absolute bottom-3 ml-2">
							<span className="text-left text-xs text-white">
								{challengeImgList[currentImg - 1]?.look?.description}
							</span>
						</div>
					</div>
				</div>
			</div>
		)
	},
)
