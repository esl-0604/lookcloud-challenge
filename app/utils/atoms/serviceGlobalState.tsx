import { atom } from "recoil"

export interface userProfileType {
	userToken: string | null
	nickname: string
	gender: string
	instagram: string | null
}

export const userProfileState = atom<userProfileType>({
	key: "userProfileState",
	default: {
		userToken: null,
		nickname: "",
		gender: "",
		instagram: null,
	},
})

export interface challengeInfoType {
	challengeId: string | null
	challengeName: string
	startDate: Date | null
	endDate: Date | null
	thumbnail: string
	comment: string
	participantsNum: number
}

export const challengeInfoList = atom<challengeInfoType[]>({
	key: "challengeInfoList",
	default: [
		{
			challengeId: "0",
			challengeName: "고연전",
			startDate: new Date("2023-09-09"),
			endDate: new Date("2023-09-20"),
			thumbnail: "/image/challenge_thumbnail_1_1.png",
			comment:
				"고연전을 최대로 즐기기 위해 준비한 오늘의 스타일로 고연전 패션왕에 도전하세요!",
			participantsNum: 0,
		},
		{
			challengeId: "1",
			challengeName: "소개팅",
			startDate: new Date("2023-10-09"),
			endDate: new Date("2023-10-20"),
			thumbnail: "/image/challenge_thumbnail_2_1.png",
			comment:
				"소개팅에서 가장 좋은 첫 인상을 남길 수 있는 스타일을 보여주세요!",
			participantsNum: 0,
		},
	],
})
export const userChallengeParticipantInfoState = atom({
	key: "userChallengeParticipantInfoState",
	default: {},
})
