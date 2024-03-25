import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "@typings/route";
import { useState } from "react";

export function usePersonScreen() {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [personMovies, setPersonMovies] = useState([]);

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    function handleFavoritePress() {
        setIsFavorite(currentState => !currentState);
    }

    function handleBackPress() {
        navigation.goBack();
    }

    return {
        handleFavoritePress,
        handleBackPress,
        isFavorite,
        isLoading,
        personMovies,
    };
}
