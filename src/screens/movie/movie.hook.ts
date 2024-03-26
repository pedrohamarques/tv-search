import { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { useRequests } from "@services/use-request";

import { RootStackParamsList, RouteStackList } from "@typings/route";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
    CastType,
    MovieDetailsResponse,
    SimilarMovieResult,
} from "@typings/data";

export function useMovieScreen() {
    const [isFavorite, setIsFavorite] = useState(true);
    const [cast, setCast] = useState<CastType[]>([]);
    const [similarMovies, setSimilarMovies] = useState<SimilarMovieResult[]>(
        [],
    );
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState<MovieDetailsResponse | null>(null);

    const route =
        useRoute<RouteProp<RootStackParamsList, RouteStackList.MOVIE>>();

    const { fetchMovieDetails, fetchSimilarMovies, fetchMovieCredits } =
        useRequests();

    const movieDetails = route.params?.movieDetails
        ? route.params.movieDetails
        : null;

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    function handleBackPress() {
        navigation.goBack();
    }

    const getMovieCredits = async () => {
        const data = await fetchMovieCredits(movieDetails!.id);
        if (data && data.cast) {
            setCast(data.cast);
        }
    };

    const getMovieDetails = async () => {
        const data = await fetchMovieDetails(movieDetails!.id);
        if (data) {
            setMovie(data);
        }
    };

    const getSimilarMovies = async () => {
        const data = await fetchSimilarMovies(movieDetails!.id);
        if (data && data.results) {
            setSimilarMovies(data.results);
        }
    };

    useEffect(() => {
        getMovieDetails();
        getSimilarMovies();
        getMovieCredits();
        setIsLoading(false);
    }, []);

    function handleFavoritePress() {
        setIsFavorite(currentState => !currentState);
    }

    function handleCastPress(cast: CastType) {
        navigation.navigate(RouteStackList.PERSON, { cast });
    }

    return {
        handleBackPress,
        handleFavoritePress,
        handleCastPress,
        isFavorite,
        similarMovies,
        isLoading,
        movie,
        cast,
    };
}
