import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { favoritesSelector } from "@stores/favoritesSlice";
import { useAppSelector } from "@stores/hooks";
import { FavoriteMoviesState } from "@stores/types";
import { RootStackParamsList, RouteStackList } from "@typings/route";

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
