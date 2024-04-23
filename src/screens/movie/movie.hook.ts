import { useEffect, useReducer, useState } from "react";
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

import { CastType } from "@typings/data";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
    FetchActionKind,
    FetchState,
    fetchMoviesScreenReducer,
} from "./reducer";

type ManageMovieScreenNavigationProps = CompositeNavigationProp<
    DrawerNavigationProp<RootDrawerParamsList, RouteDrawerList.FAVORITE_MOVIES>,
    NativeStackNavigationProp<RootStackParamsList>
>;

const screenState: FetchState = {
    cast: {
        data: [],
        error: "",
        isLoading: false,
    },
    similarMovies: {
        data: [],
        error: "",
        isLoading: false,
    },
    movie: {
        data: null,
        error: "",
        isLoading: false,
    },
};

export function useMovieScreen() {
    const route =
        useRoute<RouteProp<RootStackParamsList, RouteStackList.MOVIE>>();

    const movieId = route.params.movieId;

    const { movies } = useAppSelector(favoritesSelector);
    const dispatch = useAppDispatch();

    const favoriteMoviesIds = movies.map(item => item.id);
    const isFavoriteMovie = favoriteMoviesIds.includes(movieId);

    const [isFavorite, setIsFavorite] = useState(isFavoriteMovie);

    const { fetchMovieDetails, fetchSimilarMovies, fetchMovieCredits } =
        useRequests();

    const navigation = useNavigation<ManageMovieScreenNavigationProps>();

    const [state, reducerDispatch] = useReducer(
        fetchMoviesScreenReducer,
        screenState,
    );

    function handleBackPress() {
        navigation.goBack();
    }

    function handleToastPress() {
        navigation.navigate(RouteDrawerList.FAVORITE_MOVIES);
        Toast.hide();
    }

    const getMovieCredits = async () => {
        reducerDispatch({ type: FetchActionKind.REQUEST_CAST });
        const data = await fetchMovieCredits(movieId);
        if (data && data.cast) {
            reducerDispatch({
                type: FetchActionKind.RESOLVE_CAST,
                payload: data.cast,
            });
        } else {
            reducerDispatch({ type: FetchActionKind.ERROR_CAST });
        }
    };

    const getMovieDetails = async () => {
        reducerDispatch({ type: FetchActionKind.REQUEST_MOVIE });
        const data = await fetchMovieDetails(movieId);
        if (data) {
            reducerDispatch({
                type: FetchActionKind.RESOLVE_MOVIE,
                payload: data,
            });
        } else {
            reducerDispatch({ type: FetchActionKind.ERROR_MOVIE });
        }
    };

    const getSimilarMovies = async () => {
        reducerDispatch({ type: FetchActionKind.REQUEST_SIMILAR_MOVIES });
        const data = await fetchSimilarMovies(movieId);
        if (data && data.results) {
            reducerDispatch({
                type: FetchActionKind.RESOLVE_SIMILAR_MOVIES,
                payload: data.results,
            });
        } else {
            reducerDispatch({ type: FetchActionKind.ERROR_SIMILAR_MOVIES });
        }
    };

    useEffect(() => {
        getMovieDetails();
        getSimilarMovies();
        getMovieCredits();
    }, []);

    function handleFavoritePress() {
        const { data } = state.movie;
        if (data) {
            if (!isFavorite) {
                dispatch(
                    addFavoriteMovie({
                        id: data.id,
                        imagePath: data.poster_path,
                        title: data.title,
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
                        id: data.id,
                        imagePath: data.poster_path,
                        title: data.title,
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
        state,
    };
}
