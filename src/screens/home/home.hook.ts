import { useEffect, useReducer } from "react";
import {
    type CompositeNavigationProp,
    useNavigation,
} from "@react-navigation/native";

import { useRequests } from "@services/use-request";

import {
    type RootDrawerParamsList,
    type RootStackParamsList,
    RouteDrawerList,
    RouteStackList,
} from "@typings/route";
import type { DrawerNavigationProp } from "@react-navigation/drawer";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { FetchActionKind, FetchState, fetchMoviesReducer } from "./reducer";

type ManageHomeScreenNavigationProps = CompositeNavigationProp<
    DrawerNavigationProp<RootDrawerParamsList, RouteDrawerList.FAVORITE_MOVIES>,
    NativeStackNavigationProp<RootStackParamsList>
>;

const moviesState: FetchState = {
    trending: {
        movies: [],
        error: "",
        isLoading: false,
    },
    upcoming: {
        movies: [],
        error: "",
        isLoading: false,
    },
    topRated: {
        movies: [],
        error: "",
        isLoading: false,
    },
};

export function useHomeScreen() {
    const { fetchTrendingMovies, fetchUpcomingMovies, fetchTopRatedMovies } =
        useRequests();

    const navigation = useNavigation<ManageHomeScreenNavigationProps>();

    function handleSearchPress() {
        navigation.navigate(RouteStackList.SEARCH);
    }

    const [state, dispatch] = useReducer(fetchMoviesReducer, moviesState);

    const getTrendingMovies = async () => {
        dispatch({ type: FetchActionKind.REQUEST_TRENDING });
        const data = await fetchTrendingMovies();
        if (data && data.results) {
            dispatch({
                type: FetchActionKind.RESOLVE_TRENDING,
                payload: data.results,
            });
        } else {
            dispatch({ type: FetchActionKind.ERROR_TRENDING });
        }
    };

    const getUpcomingMovies = async () => {
        dispatch({ type: FetchActionKind.REQUEST_UPCOMING });
        const data = await fetchUpcomingMovies();
        if (data && data.results) {
            dispatch({
                type: FetchActionKind.RESOLVE_UPCOMING,
                payload: data.results,
            });
        } else {
            dispatch({ type: FetchActionKind.ERROR_UPCOMING });
        }
    };

    const getTopRatedMovies = async () => {
        dispatch({ type: FetchActionKind.REQUEST_TOP_RATED });
        const data = await fetchTopRatedMovies();
        if (data && data.results) {
            dispatch({
                type: FetchActionKind.RESOLVE_TOP_RATED,
                payload: data.results,
            });
        } else {
            dispatch({ type: FetchActionKind.ERROR_TOP_RATED });
        }
    };

    function handleProfilePress() {
        navigation.navigate(RouteStackList.PROFILE);
    }

    function handleSeeAllPress(moviesCategory: "upcoming" | "topRated") {
        navigation.navigate(RouteStackList.BROWSE_MOVIES, {
            movies:
                moviesCategory === "upcoming"
                    ? state.upcoming.movies
                    : state.topRated.movies,
            route: moviesCategory,
        });
    }

    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, []);

    return {
        handleSearchPress,
        handleProfilePress,
        handleSeeAllPress,
        movies: state,
    };
}
