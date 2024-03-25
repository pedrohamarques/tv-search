import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useRequests } from "@services/use-request";

import { TrendingMoveResults } from "@typings/data";
import { RootStackParamsList, RouteStackList } from "@typings/route";

export function useHomeScreen() {
    const [trendingMovies, setTrendingMovies] = useState<TrendingMoveResults[]>(
        [],
    );
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { fetchTrendingMovies } = useRequests();

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    const isIos = Platform.OS === "ios";

    function handleSearchPress() {
        navigation.navigate(RouteStackList.SEARCH);
    }

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        if (data && data.results) {
            setTrendingMovies(data.results);
        }
    };

    useEffect(() => {
        getTrendingMovies();
    }, []);

    return {
        isIos,
        trendingMovies,
        upcomingMovies,
        topRatedMovies,
        isLoading,
        handleSearchPress,
    };
}
