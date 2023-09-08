export default function ThumbsDownBox() {
    return (
        <div className="h-full w-full relative">
            <img
                width="300"
                height="450"
                src="/image/image.png"
                alt="image"
                style={{ width: "100%", height: "100%" }}
            />

            <img
                src="/svg/thumbsdown.svg"
                alt="image"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
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
    );
}
