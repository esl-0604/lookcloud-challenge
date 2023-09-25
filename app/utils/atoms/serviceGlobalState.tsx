import { atom } from "recoil"

// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------

export interface userTutorialType {
	complete: boolean
}

export const userTutorial = atom<userTutorialType>({
	key: "userTutorial",
	default: {
		complete: false,
	},
})

// ---------------------------------------------------------------------------

export interface challengeInfoType {
	challengeId: number
	challengeName: string
	startedAt: Date | null
	endedAt: Date | null
	state: number
	thumbnailUrl: string
	middleThumbnailUrl: string
	smallThumbnailUrl: string
	comment: string
	totalCount: number
}

export const challengeInfoList = atom<challengeInfoType[]>({
	key: "challengeInfoList",
	default: [
		// {
		// 	challengeId: 0,
		// 	challengeName: "고연전",
		// 	startedAt: new Date("2023-09-09"),
		// 	endedAt: new Date("2023-09-20"),
		// 	state: 3,
		// 	thumbnailUrl: "/image/challenge_thumbnail_1_1.png",
		// 	middleThumbnailUrl: "/image/challenge_thumbnail_1_2.png",
		// 	smallThumbnailUrl: "/image/challenge_thumbnail_1_3.png",
		// 	comment:
		// 		"고연전을 최대로 즐기기 위해 준비한 오늘의 스타일로 고연전 패션왕에 도전하세요!",
		// 	totalCount: 7,
		// },
		// {
		// 	challengeId: 1,
		// 	challengeName: "소개팅",
		// 	startedAt: new Date("2023-10-09"),
		// 	endedAt: new Date("2023-10-20"),
		// 	state: -1,
		// 	thumbnailUrl: "/image/challenge_thumbnail_2_1.png",
		// 	middleThumbnailUrl: "/image/challenge_thumbnail_1_2.png",
		// 	smallThumbnailUrl: "/image/challenge_thumbnail_1_3.png",
		// 	comment:
		// 		"소개팅에서 가장 좋은 첫 인상을 남길 수 있는 스타일을 보여주세요!",
		// 	totalCount: 0,
		// },
	],
})

// ---------------------------------------------------------------------------

export interface challengeRankerType {
	nickName: string
	gender: "MALE" | "FEMALE"
	lScore: number
	ranking: number
	imageUrl: string
	instagramUserName: string
}
export interface challengeParticipantsType {
	[challengeId: string]: {
		totalCount: number
		users: challengeRankerType[]
		// updateTime: Date
	}
}

export const challengeParticipantsInfo = atom<challengeParticipantsType>({
	key: "challengeParticipantsInfo",
	default: {
		// "0": {
		// 	totalCount: 7,
		// 	users: [
		// 		// {
		// 		// 	nickName: "이은상",
		// 		// 	gender: "MALE",
		// 		// 	lScore: 14,
		// 		// 	ranking: 2,
		// 		// 	imageUrl:
		// 		// 		"https://lookcloud-prod.s3.ap-northeast-2.amazonaws.com/challenge_participation_image_1693962535375_%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%8F%C3%A1%C2%85%C2%B3%C3%A1%C2%84%C2%85%C3%A1%C2%85%C2%B5%C3%A1%C2%86%C2%AB%C3%A1%C2%84%C2%89%C3%A1%C2%85%C2%A3%C3%A1%C2%86%C2%BA%202023-06-18%20%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%92%C3%A1%C2%85%C2%AE%204.15.26.png",
		// 		// 	instagramUserName: "eslee850",
		// 		// },
		// 	],
		// 	// updateTime: new Date("2023-09-17T12:00:00"),
		// },
		// "1": {
		// 	totalCount: 0,
		// 	users: [],
		// 	// updateTime: new Date("2023-09-17T12:00:00"),
		// },
	},
})

// ---------------------------------------------------------------------------
export interface partType {
	index: number
	part: string
	brand: string
	name: string
}
export interface userChallengeParticipateType {
	[challengeId: string]: {
		participationId: string
		lScore: number
		ranking: number
		look: {
			imageUrl: string
			// thumbnailUrl: string
			description: string
			parts: partType[]
		}
	}
}

export const userChallengeParticipateInfo = atom<userChallengeParticipateType>({
	key: "userChallengeParticipantInfoState",
	default: {
		// "0": {
		// 	participationId: 0,
		// 	lScore: 100,
		// 	ranking: 1,
		// 	look: {
		// 		imageUrl: "/image/challenge_participate_img.png",
		// 		// thumbnailUrl: "/image/challenge_participate_thumbnail.png",
		// 		description: "멋진 옷을 입었어요.",
		// 		parts: [
		// 			{
		// 				index: 0,
		// 				part: "상의",
		// 				name: "여름 청 반팔 셔츠",
		// 				brand: "무신사스탠다드",
		// 			},
		// 			{
		// 				index: 1,
		// 				part: "하의",
		// 				name: "여름 청 반팔 셔츠",
		// 				brand: "무신사스탠다드",
		// 			},
		// 			{
		// 				index: 2,
		// 				part: "모자",
		// 				name: "여름 청 반팔 셔츠",
		// 				brand: "무신사스탠다드",
		// 			},
		// 		],
		// 	},
		// },
	},
})

// ---------------------------------------------------------------------------

export interface lookbookInfoType {
	lookbookId: number
	title: string
	publicState: boolean
}

export const lookbookList = atom<lookbookInfoType[]>({
	key: "lookbookList",
	default: [
		{
			lookbookId: 0,
			title: "내가 평가한 룩",
			publicState: false,
		},
		{
			lookbookId: 1,
			title: "저장한 룩",
			publicState: false,
		},
	],
})

// ---------------------------------------------------------------------------

export interface lookbookImgType {
	participationId: string
	lScore: number
	likes: number
	dislikes: number
	rating: number
	user: {
		userId: string
		nickName: string
		instagramUserName: string
		gender: string
	}
	look: {
		imageUrl: string
		// thumbnailUrl: string
		description: string
		parts: partType[]
	}
}

export interface lookbookImgListType {
	[lookbookId: string]: {
		title: string
		comment: string
		publicState: boolean
		imgList: lookbookImgType[]
	}
}

export const lookbookImgList = atom<lookbookImgListType>({
	key: "lookbookImgList",
	default: {
		"0": {
			title: "내가 평가한 룩",
			comment: "챌린지에서 평가했던 룩들을 다시 볼 수 있습니다.",
			publicState: false,
			imgList: [
				{
					participationId: "1234567890abcdefg",
					user: {
						userId: "1234567890abcdefg",
						nickName: "룩클라우드",
						instagramUserName: "lookcloud_official",
						gender: "FEMALE",
					},
					look: {
						imageUrl: "/image/lookbookExampleImg.png",
						description: "룩 설명",
						parts: [
							{
								part: "상의",
								name: "블랙 티셔츠",
								brand: "무신사",
								index: 0,
							},
						],
					},
					likes: 123,
					dislikes: 123,
					lScore: 123,
					rating: 1,
				},
				{
					participationId: "1234567890abcdefg",
					user: {
						userId: "1234567890abcdefg",
						nickName: "룩클라우드",
						instagramUserName: "lookcloud_official",
						gender: "FEMALE",
					},
					look: {
						imageUrl: "/image/image.png",
						description: "룩 설명",
						parts: [
							{
								part: "상의",
								name: "블랙 티셔츠",
								brand: "무신사",
								index: 0,
							},
						],
					},
					likes: 123,
					dislikes: 123,
					lScore: 123,
					rating: 1,
				},
				{
					participationId: "1234567890abcdefg",
					user: {
						userId: "1234567890abcdefg",
						nickName: "룩클라우드",
						instagramUserName: "lookcloud_official",
						gender: "FEMALE",
					},
					look: {
						imageUrl: "/image/lookbookExampleImg.png",
						description: "룩 설명",
						parts: [
							{
								part: "상의",
								name: "블랙 티셔츠",
								brand: "무신사",
								index: 0,
							},
						],
					},
					likes: 123,
					dislikes: 123,
					lScore: 123,
					rating: 0,
				},
				{
					participationId: "1234567890abcdefg",
					user: {
						userId: "1234567890abcdefg",
						nickName: "룩클라우드",
						instagramUserName: "lookcloud_official",
						gender: "FEMALE",
					},
					look: {
						imageUrl: "/image/lookbookExampleImg.png",
						description: "룩 설명",
						parts: [
							{
								part: "상의",
								name: "블랙 티셔츠",
								brand: "무신사",
								index: 0,
							},
						],
					},
					likes: 123,
					dislikes: 123,
					lScore: 123,
					rating: 1,
				},
				{
					participationId: "1234567890abcdefg",
					user: {
						userId: "1234567890abcdefg",
						nickName: "룩클라우드",
						instagramUserName: "lookcloud_official",
						gender: "FEMALE",
					},
					look: {
						imageUrl: "/image/lookbookExampleImg.png",
						description: "룩 설명",
						parts: [
							{
								part: "상의",
								name: "블랙 티셔츠",
								brand: "무신사",
								index: 0,
							},
						],
					},
					likes: 123,
					dislikes: 123,
					lScore: 123,
					rating: 0,
				},
			],
		},
		"1": {
			title: "저장한 룩",
			comment: "내가 저장한 룩들을 다시 볼 수 있습니다. ",
			publicState: false,
			imgList: [],
		},
	},
})

// ---------------------------------------------------------------------------
