import { atom } from "recoil"

export interface userProfileType {
	userToken: string | null
	nickname: string
	gender: string
	instagramUserName: string | null
}

export const userProfileState = atom<userProfileType>({
	key: "userProfileState",
	default: {
		userToken: null,
		nickname: "",
		gender: "",
		instagramUserName: null,
	},
})

export interface challengeInfoType {
	challengeId: number | null
	challengeName: string
	startDate: Date | null
	endDate: Date | null
	state: number
	thumbnail: string
	comment: string
	participantsNum: number
}

export const challengeInfoList = atom<challengeInfoType[]>({
	key: "challengeInfoList",
	default: [
		{
			challengeId: 0,
			challengeName: "고연전",
			startDate: new Date("2023-09-09"),
			endDate: new Date("2023-09-20"),
			state: 3,
			thumbnail: "/image/challenge_thumbnail_1_1.png",
			comment:
				"고연전을 최대로 즐기기 위해 준비한 오늘의 스타일로 고연전 패션왕에 도전하세요!",
			participantsNum: 7,
		},
		{
			challengeId: 1,
			challengeName: "소개팅",
			startDate: new Date("2023-10-09"),
			endDate: new Date("2023-10-20"),
			state: -1,
			thumbnail: "/image/challenge_thumbnail_2_1.png",
			comment:
				"소개팅에서 가장 좋은 첫 인상을 남길 수 있는 스타일을 보여주세요!",
			participantsNum: 0,
		},
	],
})

export interface challengeRankerType {
	nickName: string
	gender: "MALE" | "FEMALE"
	lScore: number
	ranking: number
	imageUrl: string
	instagram: {
		userName: string
	}
}
export interface challengeParticipantsType {
	[challengeId: number]: {
		thumbnail_1: string
		thumbnail_2: string
		totalCount: number
		users: challengeRankerType[]
		updateTime: Date
	}
}

export const challengeParticipantsInfo = atom<challengeParticipantsType>({
	key: "challengeParticipantsInfo",
	default: {
		0: {
			thumbnail_1: "/image/challenge_thumbnail_1_2.png",
			thumbnail_2: "/image/challenge_thumbnail_1_3.png",
			totalCount: 7,
			users: [],
			updateTime: new Date("2023-09-17T12:00:00"),
		},
		1: {
			thumbnail_1: "",
			thumbnail_2: "",
			totalCount: 0,
			users: [],
			updateTime: new Date("2023-09-17T12:00:00"),
		},
	},
})

export interface userChallengeParticipateType {
	[challengeId: number]: {
		participationId: number
		lScore: number
		ranking: number
		imageUrl: string
		thumbnailUrl: string
		description: string
		parts: string
	}
}

export const userChallengeParticipateInfo = atom<userChallengeParticipateType>({
	key: "userChallengeParticipantInfoState",
	default: {
		// 0: {
		// 	participationId: 0,
		// 	lScore: 100,
		// 	ranking: 1,
		// 	imageUrl: "/image/challenge_participate_img.png",
		// 	thumbnailUrl: "/image/challenge_participate_thumbnail.png",
		// 	description: "멋진 옷을 입었어요.",
		// 	parts: `[
		// 		{
		// 		  "part": "상의",
		// 		  "name": "여름 청 반팔 셔츠",
		// 		  "brand": "무신사스탠다드"
		// 		},
		// 		{
		// 		  "part": "하의",
		// 		  "name": "여름 청 반팔 셔츠",
		// 		  "brand": "무신사스탠다드"
		// 		},
		// 		{
		// 		  "part": "겉옷",
		// 		  "name": "여름 청 반팔 셔츠",
		// 		  "brand": "무신사스탠다드"
		// 		}
		// 	  ]`,
		// },
	},
})
