import React from "react"

export default React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
	function TutorialMovingBox(props, ref) {
		return (
			<div
				{...props}
				ref={ref}
				className="h-full w-full cursor-move bg-white shadow-xl transition-[shadow,transform] active:scale-95 active:shadow-lg relative"
			>
				<div className="h-full w-full relative">
					<img
						width="300"
						height="450"
						src="/image/image.png"
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
						<div className="absolute bottom-3 ml-2 ring-1 ring-white">
							<span className="p-2 text-center text-xs text-white">
								고연전을 즐기기위한 편한 무지 티를 기반으로 만든 룩
							</span>
						</div>
					</div>
				</div>
			</div>
		)
	},
)
