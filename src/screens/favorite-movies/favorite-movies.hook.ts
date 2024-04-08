import { useNavigation } from "@react-navigation/native";

import { favoritesSelector } from "@stores/favoritesSlice";
import { useAppSelector } from "@stores/hooks";
import { FavoriteMoviesState } from "@stores/types";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { type RootStackParamsList, RouteStackList } from "@typings/route";

export function useFavoriteMoviesScreen() {
    const { movies } = useAppSelector(favoritesSelector);

    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamsList, RouteStackList.MOVIE>
        >();

    function handleMoviePress({ id }: FavoriteMoviesState) {
        navigation.navigate(RouteStackList.MOVIE, { movieId: id });
    }
    return { movies, handleMoviePress };
}
