import { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { RootStackParamsList, RouteStackList } from "@typings/route";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export function useMovieScreen() {
    const [isFavorite, setIsFavorite] = useState(false);
    const [cast, setCats] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const route = useRoute<RouteProp<RootStackParamsList>>();

    const movieDetails = route.params?.movieDetails
        ? route.params.movieDetails
        : null;

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

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
        similarMovies,
        isLoading,
        movieDetails,
    };
}
