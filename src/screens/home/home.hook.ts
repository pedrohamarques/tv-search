import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList, RouteStackList } from "@typings/route";
import { useState } from "react";
import { Platform } from "react-native";

export function useHomeScreen() {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    const isIos = Platform.OS === "ios";

    function handleSearchPress() {
        navigation.navigate(RouteStackList.SEARCH);
    }

    return {
        isIos,
        trendingMovies,
        upcomingMovies,
        topRatedMovies,
        isLoading,
        handleSearchPress,
    };
}
