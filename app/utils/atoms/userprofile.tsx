import { atom } from "recoil";

export const userProfileState = atom({
    key: "userProfileState",
    default: {
        userId: null,
        nickname: "",
        instagram: null,
        gender: "",
        organ: "",
    },
});
