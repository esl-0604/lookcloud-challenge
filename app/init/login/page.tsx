import TitleIcon from "@/public/svg/LookCloudTitle.svg"
import FacebookLoginButton from "@/app/init/login/facebookloginbutton"
import KaKaoLoginButton from "./kakaologinbutton"

export default function Login() {
	return (
		<main className="flex flex-col justify-center items-center w-[100%] h-[100%] bg-black text-white">
			<div className="mt-[35px]">
				<TitleIcon width={"310"} height={"47"} color={"white"} />
			</div>
			<FacebookLoginButton />
			<KaKaoLoginButton />
		</main>
	)
}
