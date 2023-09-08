import { atom } from "recoil";

export const userProfileState = atom({
    key: "userProfileState",
    default: {
        nickname: "",
        instagram: null,
        gender: "",
        organ: "",
    },
});
