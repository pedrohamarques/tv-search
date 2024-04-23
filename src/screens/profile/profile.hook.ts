import { useReducer } from "react";
import { z } from "zod";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

import { COUNTRIES } from "@constants/countries";

import type { CountryProps } from "@typings/constants";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { type RootStackParamsList, RouteStackList } from "@typings/route";
import { ActionKind, isEditingReducer, type ProfileDataState } from "./reducer";
import { Alert } from "react-native";

const initialProfileState: ProfileDataState = {
    avatar: {
        isEditing: false,
        data: null,
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

export function useProfileScreen() {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamsList, RouteStackList>
        >();

    const [state, dispatch] = useReducer(isEditingReducer, initialProfileState);

    function handleBackPress() {
        if (isUpdating) {
            Alert.alert(
                "Unsaved changes",
                "Are you sure you want to go back? There are unsaved changes!",
                [
                    {
                        text: "Yes, I want to go back",
                        style: "default",
                        onPress: () =>
                            navigation.replace(RouteStackList.DRAWER),
                    },
                    {
                        text: "Cancel",
                        style: "destructive",
                    },
                ],
            );
        } else {
            navigation.replace(RouteStackList.DRAWER);
        }
    }

    const nameSchema = z.string().trim().min(3);

    async function handlePickImage() {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.7,
            });

            if (!result.canceled) {
                dispatch({ type: ActionKind.IS_EDITING_AVATAR });
                dispatch({
                    type: ActionKind.SAVING_AVATAR,
                    payload: result.assets[0].uri,
                });
            }
        } catch (e) {
            console.log(e);
            Toast.show({
                type: "error",
                text1: "Couldn't pick image",
                text2: "Try again later",
                onPress: () => Toast.hide(),
            });
        }
    }

    function handleEditingNamePress() {
        dispatch({ type: ActionKind.IS_EDITING_NAME });
    }

    function handleChangeName(name: string) {
        dispatch({ type: ActionKind.SAVING_NAME, payload: name });
    }

    function handleChooseCountry({ code, name }: CountryProps) {
        const changedCountry = {
            code,
            name,
        };

        if (
            JSON.stringify(changedCountry) !==
            JSON.stringify(initialProfileState.country.data)
        ) {
            dispatch({ type: ActionKind.IS_EDITING_COUNTRY });
            dispatch({
                type: ActionKind.SAVING_COUNTRY,
                payload: { code, name },
            });
        }
    }

    function handleUpdateProfile() {
        const confirmPress = nameSchema.safeParse(state.name.data);
        if (!confirmPress.success) {
            Toast.show({
                type: "error",
                text1: "Please, try another name",
                text2: "Name must be at least 3 characters long",
                onPress: () => Toast.hide(),
            });
        } else {
            console.log("salvo");
            dispatch({ type: ActionKind.SAVING });
            Toast.show({
                type: "success",
                text1: "Profile updated successfully",
                onPress: () => Toast.hide(),
            });
        }
    }

    const isUpdating =
        state.avatar.isEditing ||
        state.country.isEditing ||
        state.name.isEditing;

    const updatingName = state.name.isEditing;

    return {
        handleBackPress,
        handlePickImage,
        handleEditingNamePress,
        handleChooseCountry,
        handleUpdateProfile,
        handleChangeName,
        isUpdating,
        updatingName,
        profileState: state,
    };
}
