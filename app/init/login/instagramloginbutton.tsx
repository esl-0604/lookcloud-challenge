// "use client"

// import Link from "next/link"

// export default function InstagramLoginButton() {
// 	const CODE_REQUEST_URL = `https://api.instagram.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_INSTAGRAM_REDIRECT_URL}&scope=user_profile,user_media&response_type=code`

// 	return (
// 		<Link href={CODE_REQUEST_URL} className="cursor-pointer">
// 			<div className="flex justify-center items-center w-[320px] h-[52px] rounded-[29px] bg-[#D9D9D9]">
// 				<div className="flex justify-center items-center w-[316px] h-[48px] rounded-[29px] bg-[#707070] text-white text-[14px] font-loginBoxFont">
// 					<span className="font-loginBoxFont ">instagram</span>
// 					<span>&nbsp;계정 연결하기</span>
// 				</div>
// 			</div>
// 		</Link>
// 	)
// }
