import { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { useRequests } from "@services/use-request";

import { useAppDispatch, useAppSelector } from "@stores/hooks";
import {
    addFavorite,
    favoritesSelector,
    removeFavorite,
} from "@stores/favoritesSlice";

import { RootStackParamsList, RouteStackList } from "@typings/route";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
    CastType,
    MovieDetailsResponse,
    SimilarMovieResult,
} from "@typings/data";

export function useMovieScreen() {
    const route =
        useRoute<RouteProp<RootStackParamsList, RouteStackList.MOVIE>>();

    const movieId = route.params.movieId;

    const favoriteMovies = useAppSelector(favoritesSelector);
    const dispatch = useAppDispatch();

    const favoriteMoviesIds = favoriteMovies.movies.map(item => item.id);
    const isFavoriteMovie = favoriteMoviesIds.includes(movieId);

    const [isFavorite, setIsFavorite] = useState(isFavoriteMovie);
    const [cast, setCast] = useState<CastType[]>([]);
    const [similarMovies, setSimilarMovies] = useState<SimilarMovieResult[]>(
        [],
    );
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState<MovieDetailsResponse | null>(null);

    const { fetchMovieDetails, fetchSimilarMovies, fetchMovieCredits } =
        useRequests();

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    function handleBackPress() {
        navigation.goBack();
    }

    const getMovieCredits = async () => {
        const data = await fetchMovieCredits(movieId);
        if (data && data.cast) {
            setCast(data.cast);
        }
    };

    const getMovieDetails = async () => {
        const data = await fetchMovieDetails(movieId);
        if (data) {
            setMovie(data);
        }
    };

    const getSimilarMovies = async () => {
        const data = await fetchSimilarMovies(movieId);
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
        if (movie) {
            if (!isFavorite) {
                dispatch(
                    addFavorite({
                        id: movie.id,
                        imagePath: movie.poster_path,
                        title: movie.title,
                    }),
                );
                setIsFavorite(true);
            } else {
                dispatch(
                    removeFavorite({
                        id: movie.id,
                        imagePath: movie.poster_path,
                        title: movie.title,
                    }),
                );
                setIsFavorite(false);
            }
        }
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
