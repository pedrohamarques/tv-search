import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TrendingMoveResults } from "@typings/data";
import { RootStackParamsList, RouteStackList } from "@typings/route";

export function useTrendingMovies() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    function handleCardPress(movie: TrendingMoveResults) {
        navigation.navigate(RouteStackList.MOVIE, { movieId: movie.id });
    }

    return {
        handleCardPress,
    };
}
