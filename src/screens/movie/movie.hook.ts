import { useEffect, useState } from "react";
import { Platform } from "react-native";
import {
    NavigationProp,
    RouteProp,
    useNavigation,
    useRoute,
} from "@react-navigation/native";

import { RootStackParamsList, RouteStackList } from "@typings/route";

export function useMovieScreen() {
    const [isFavorite, setIsFavorite] = useState(false);
    const route = useRoute<RouteProp<RootStackParamsList>>();
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

    function handleBackPress() {
        navigation.goBack();
    }

    useEffect(() => {
        // call the api
    });

    function handleFavoritePress() {
        setIsFavorite(currentState => !currentState);
    }

    function handleCastPress() {
        navigation.navigate(RouteStackList.PERSON);
    }

    return {
        handleBackPress,
        handleFavoritePress,
        handleCastPress,
        isFavorite,
    };
}
