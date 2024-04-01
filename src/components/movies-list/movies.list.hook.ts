import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { UpcomingMovieResults } from "@typings/data";
import { RootStackParamsList, RouteStackList } from "@typings/route";

export function useMoviesList() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    function handlePress(movie: UpcomingMovieResults) {
        navigation.push(RouteStackList.MOVIE, { movieId: movie.id });
    }

    return {
        handlePress,
    };
}
