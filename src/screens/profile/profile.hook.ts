import { useState } from "react";
import { z } from "zod";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamsList } from "@typings/route";

export function useProfileScreen() {
    const [avatar, setAvatar] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    function handleBackPress() {
        navigation.goBack();
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
                setAvatar(result.assets[0].uri);
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

    function handleEditingPress() {
        if (isEditing) {
            const confirmPress = nameSchema.safeParse(name);
            if (!confirmPress.success) {
                Toast.show({
                    type: "error",
                    text1: "Please, try other name",
                    text2: "Name must be at least 3 characters long",
                    onPress: () => Toast.hide(),
                });
            }
        }
        setIsEditing(previousState => !previousState);
    }
    return {
        handleBackPress,
        handlePickImage,
        avatar,
        isEditing,
        handleEditingPress,
        setName,
    };
}
