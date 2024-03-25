import { useState } from "react";
import { Platform } from "react-native";

export function useHomeScreen() {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);

    const isIos = Platform.OS === "ios";

    return {
        isIos,
        trendingMovies,
        upcomingMovies,
        topRatedMovies,
    };
}
