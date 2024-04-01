import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { TrendingMovieResults } from "@typings/data";
import { type RootStackParamsList, RouteStackList } from "@typings/route";

export function useTrendingMovies() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    function handleCardPress(movie: TrendingMovieResults) {
        navigation.navigate(RouteStackList.MOVIE, { movieId: movie.id });
    }

    return {
        handleCardPress,
    };
}
