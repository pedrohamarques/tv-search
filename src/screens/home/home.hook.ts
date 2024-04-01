import { useEffect, useState } from "react";
import {
    CompositeNavigationProp,
    useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useRequests } from "@services/use-request";

import {
    TopRatedMovieResults,
    TrendingMoveResults,
    UpcomingMovieResults,
} from "@typings/data";
import {
    RootDrawerParamsList,
    RootStackParamsList,
    RouteDrawerList,
    RouteStackList,
} from "@typings/route";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type ManageHomeScreenNavigationProps = CompositeNavigationProp<
    DrawerNavigationProp<RootDrawerParamsList, RouteDrawerList.FAVORITE_MOVIES>,
    NativeStackNavigationProp<RootStackParamsList>
>;

export function useHomeScreen() {
    const [trendingMovies, setTrendingMovies] = useState<TrendingMoveResults[]>(
        [],
    );
    const [upcomingMovies, setUpcomingMovies] = useState<
        UpcomingMovieResults[]
    >([]);
    const [topRatedMovies, setTopRatedMovies] = useState<
        TopRatedMovieResults[]
    >([]);
    const [isLoading, setIsLoading] = useState(true);

    const { fetchTrendingMovies, fetchUpcomingMovies, fetchTopRatedMovies } =
        useRequests();

    const navigation = useNavigation<ManageHomeScreenNavigationProps>();

    function handleSearchPress() {
        navigation.navigate(RouteStackList.SEARCH);
    }

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        if (data && data.results) {
            setTrendingMovies(data.results);
        }
    };

    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        if (data && data.results) {
            setUpcomingMovies(data.results);
        }
    };

    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        if (data && data.results) {
            setTopRatedMovies(data.results);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
        setIsLoading(false);
    }, []);

    return {
        trendingMovies,
        upcomingMovies,
        topRatedMovies,
        isLoading,
        handleSearchPress,
    };
}
