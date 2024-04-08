import { useEffect, useState } from "react";
import {
    CompositeNavigationProp,
    RouteProp,
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useRequests } from "@services/use-request";

import { useAppDispatch, useAppSelector } from "@stores/hooks";
import {
    addFavoriteMovie,
    favoritesSelector,
    removeFavoriteMovie,
} from "@stores/favoritesSlice";

import {
    RootDrawerParamsList,
    RootStackParamsList,
    RouteDrawerList,
    RouteStackList,
} from "@typings/route";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
    CastType,
    MovieDetailsResponse,
    SimilarMovieResult,
} from "@typings/data";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type ManageMovieScreenNavigationProps = CompositeNavigationProp<
    DrawerNavigationProp<RootDrawerParamsList, RouteDrawerList.FAVORITE_MOVIES>,
    NativeStackNavigationProp<RootStackParamsList>
>;

export function useMovieScreen() {
    const route =
        useRoute<RouteProp<RootStackParamsList, RouteStackList.MOVIE>>();

    const movieId = route.params.movieId;

    const { movies } = useAppSelector(favoritesSelector);
    const dispatch = useAppDispatch();

    const favoriteMoviesIds = movies.map(item => item.id);
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

    const navigation = useNavigation<ManageMovieScreenNavigationProps>();

    function handleBackPress() {
        navigation.goBack();
    }

    function handleToastPress() {
        navigation.navigate(RouteDrawerList.FAVORITE_MOVIES);
        Toast.hide();
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
                    addFavoriteMovie({
                        id: movie.id,
                        imagePath: movie.poster_path,
                        title: movie.title,
                    }),
                );
                Toast.show({
                    type: "success",
                    text1: "Movie added to favorites",
                    text2: "Press here to see all",
                    onPress: handleToastPress,
                }),
                    setIsFavorite(true);
            } else {
                dispatch(
                    removeFavoriteMovie({
                        id: movie.id,
                        imagePath: movie.poster_path,
                        title: movie.title,
                    }),
                );
                Toast.show({
                    type: "success",
                    text1: "Movie removed from favorites",
                    text2: "Press here to see all",
                    onPress: handleToastPress,
                }),
                    setIsFavorite(false);
            }
        }
    }

    function handleCastPress(cast: CastType) {
        navigation.replace(RouteStackList.PERSON, { castId: cast.id });
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
