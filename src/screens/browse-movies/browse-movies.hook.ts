import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { TopRatedMovieResults, UpcomingMovieResults } from "@typings/data";
import { type RootStackParamsList, RouteStackList } from "@typings/route";

export function useBrowseMoviesScreen() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
    const route =
        useRoute<
            RouteProp<RootStackParamsList, RouteStackList.BROWSE_MOVIES>
        >();

    const { movies, route: routeFrom } = route.params;

    function handleGoBackPress() {
        navigation.goBack();
    }

    function handleItemPress(
        movie: TopRatedMovieResults | UpcomingMovieResults,
    ) {
        navigation.push(RouteStackList.MOVIE, { movieId: movie.id });
    }

    return {
        handleGoBackPress,
        movies,
        routeFrom,
        handleItemPress,
    };
}
