"use client"

import ChallengeProfileHeader from "./header"
import ProfileImg from "@/public/svg/profile.svg"
import {
	userProfileState,
	userProfileType,
} from "@/app/utils/atoms/serviceGlobalState"
import { useRecoilState } from "recoil"
import LocalStorage from "@/app/utils/localstorage"
import KaKaoLoginButton from "@/app/init/login/kakaologinbutton"
import { useRouter } from "next/navigation"

export default function Profile() {
	const router = useRouter()
	const [profileData, setProfileData] =
		useRecoilState<userProfileType>(userProfileState)
	const userProfile = LocalStorage.getItem("lookCloud-kakao-profile")
	// console.log(profileData)\

	const Logout = () => {
		LocalStorage.removeItem("lookCloud-user-token")
		LocalStorage.removeItem("lookCloud-kakao-Id")
		LocalStorage.removeItem("lookCloud-kakao-profile")
		setProfileData({
			userToken: null,
			nickname: "",
			gender: "",
			instagramUserName: null,
		})
		router.push("/")
	}

	return (
		<main className="flex flex-col justify-start items-center absolute w-[100%] min-h-[100%] bg-[#F5F5F5]">
			<ChallengeProfileHeader />
			<div className="flex-1 flex flex-col justify-start items-center w-[100%] text-black">
				<div className="mt-[86px]">
					{userProfile ? (
						<div className="flex justify-center items-center w-[180px] h-[180px] rounded-full overflow-hidden">
							<img className="object-cover" src={userProfile} alt="myProfile" />
						</div>
					) : (
						<ProfileImg width={"180"} height={"180"} />
					)}
				</div>
				<div className="flex justify-center items-center w-[100%] h-[52px] mt-[30px] text-[24px] font-textBoxFont">
					{profileData.nickname}
				</div>
				<div className="flex flex-col justify-start items-center w-[320px] h-[62px] mb-[10px] border-b-2 border-[#D9D9D9]">
					<div className="flex justify-start items-center w-[100%] px-[5px] h-[20px] text-[12px]">
						instagram ID
					</div>
					{profileData.instagramUserName ? (
						<div className="flex justify-start items-center w-[100%] px-[5px] h-[40px] text-[24px]">
							{profileData.instagramUserName}
						</div>
					) : (
						<div className="flex justify-start items-center w-[100%] px-[5px] h-[40px] text-[12px] text-[#6D6D6D] pt-[17px] pb-[3px]">
							instagram ID가 없습니다.
						</div>
					)}
				</div>
				<div className="flex flex-col justify-start items-center w-[320px] h-[62px] mb-[10px] border-b-2 border-[#D9D9D9]">
					<div className="flex justify-start items-center w-[100%] px-[5px] h-[20px] text-[12px]">
						성별
					</div>
					<div className="flex justify-start items-center w-[100%] px-[5px] h-[40px] text-[24px]">
						{profileData.gender}
					</div>
				</div>
				{/* <div className="flex flex-col justify-start items-center w-[320px] h-[62px] mb-[10px] border-b-2 border-[#D9D9D9]">
				<div className="flex justify-start items-center w-[100%] px-[5px] h-[20px] text-[12px]">
					학교
				</div>
				<div className="flex justify-start items-center w-[100%] px-[5px] h-[40px] text-[24px]">
					{profileData.organ}
				</div>
			</div> */}

				<div className="flex justify-center items-center w-[100%] my-[20px]">
					<div className="flex justify-center items-center w-[70%] max-w-[320px] cursor-pointer">
						<div
							className="flex justify-center items-center w-full h-[52px] rounded-[29px] bg-[#707070] text-white text-[14px] font-loginBoxFont border-[2px] border-[#D9D9D9]"
							onClick={Logout}
						>
							LOGOUT
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
