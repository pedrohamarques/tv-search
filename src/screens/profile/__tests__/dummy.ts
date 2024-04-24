import { COUNTRIES } from "@constants/countries";
import { ProfileDataState } from "../reducer";

export const DUMMY_PROFILE_STATE: ProfileDataState = {
    avatar: {
        isEditing: false,
        data: "someImage",
    },
    country: {
        isEditing: false,
        data: { code: COUNTRIES[0].code, name: COUNTRIES[0].name },
    },
    name: {
        isEditing: false,
        data: null,
    },
};
