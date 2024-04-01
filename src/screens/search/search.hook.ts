import { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";

import { useRequests } from "@services/use-request";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList, RouteStackList } from "@typings/route";
import { searchMoviesResults } from "@typings/search";
import { TopRatedMovieResults } from "@typings/data";

export function useSearchScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [searchedMovies, setSearchedMovies] = useState<searchMoviesResults[]>(
        [],
    );

    const { searchMovies } = useRequests();

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    function handleClosePress() {
        navigation.navigate(RouteStackList.DRAWER);
    }

    function handleItemPress(movie: TopRatedMovieResults) {
        navigation.push(RouteStackList.MOVIE, { movieId: movie.id });
    }

    async function handleSearch(value: string) {
        if (value && value.length > 2) {
            setIsLoading(true);
            const data = await searchMovies({
                query: value,
                include_adult: "true",
                language: "en_US",
                page: "1",
            });

            if (data && data.results) {
                setSearchedMovies(data.results);
                setIsLoading(false);
            }
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 500), []);

    return {
        handleClosePress,
        handleItemPress,
        isLoading,
        handleTextDebounce,
        searchedMovies,
    };
}
