import { CountryProps } from "@typings/constants";

export enum ActionKind {
    IS_EDITING_NAME = "IS_EDITING_NAME",
    IS_EDITING_AVATAR = "IS_EDITING_AVATAR",
    IS_EDITING_COUNTRY = "IS_EDITING_COUNTRY",
    SAVING_NAME = "SAVING_NAME",
    SAVING_AVATAR = "SAVING_AVATAR",
    SAVING_COUNTRY = "SAVING_COUNTRY",
    SAVING = "SAVING",
}

type EditingAction = {
    type:
        | ActionKind.IS_EDITING_AVATAR
        | ActionKind.IS_EDITING_NAME
        | ActionKind.IS_EDITING_COUNTRY
        | ActionKind.SAVING;
};

type SavingNameAction = {
    type: ActionKind.SAVING_NAME;
    payload: string;
};

type SavingAvatarAction = {
    type: ActionKind.SAVING_AVATAR;
    payload: string;
};

type SavingCountryAction = {
    type: ActionKind.SAVING_COUNTRY;
    payload: CountryProps;
};

type Action =
    | SavingAvatarAction
    | SavingCountryAction
    | SavingNameAction
    | EditingAction;

type ProfileField<T> = {
    isEditing: boolean;
    data: T | null;
};

export type ProfileDataState = {
    name: ProfileField<string>;
    avatar: ProfileField<string>;
    country: ProfileField<CountryProps>;
};

export function isEditingReducer(
    state: ProfileDataState,
    action: Action,
): ProfileDataState {
    switch (action.type) {
        case ActionKind.IS_EDITING_AVATAR:
            return {
                ...state,
                avatar: {
                    ...state.avatar,
                    isEditing: true,
                },
            };
        case ActionKind.IS_EDITING_COUNTRY:
            return {
                ...state,
                country: {
                    ...state.country,
                    isEditing: true,
                },
            };
        case ActionKind.IS_EDITING_NAME:
            return {
                ...state,
                name: {
                    ...state.name,
                    isEditing: true,
                },
            };
        case ActionKind.SAVING:
            return {
                avatar: {
                    ...state.avatar,
                    isEditing: false,
                },
                country: {
                    ...state.country,
                    isEditing: false,
                },
                name: {
                    ...state.name,
                    isEditing: false,
                },
            };
        case ActionKind.SAVING_AVATAR: {
            return {
                ...state,
                avatar: {
                    ...state.avatar,
                    data: action.payload,
                },
            };
        }
        case ActionKind.SAVING_NAME: {
            return {
                ...state,
                name: {
                    ...state.name,
                    data: action.payload,
                },
            };
        }
        case ActionKind.SAVING_COUNTRY: {
            return {
                ...state,
                country: {
                    ...state.country,
                    data: action.payload,
                },
            };
        }
        default:
            return state;
    }
}
