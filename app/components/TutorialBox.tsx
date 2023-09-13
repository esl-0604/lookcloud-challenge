export default function TutorialBox() {
	return (
		<div className="h-full w-full relative">
			<img
				src="/image/image.png"
				alt="image"
				style={{ width: "300px", height: "450px" }}
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
						고연전을 즐기기위한 편한 무지 티를 기반으로 만든 룩
					</span>
				</div>
			</div>
		</div>
	)
}
