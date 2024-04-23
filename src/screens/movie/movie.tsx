import React, { useLayoutEffect } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

import { styles, theme } from "@themes/index";

import { Cast, MoviesList } from "@components/index";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "@typings/route";

import { useMovieScreen } from "./movie.hook";
import { MovieDetails } from "./components/movie-details";

type MovieScreenNavigationProps = {
    navigation: Pick<
        NativeStackNavigationProp<RootStackParamsList>,
        "setOptions"
    >;
};

export function MovieScreen({ navigation }: MovieScreenNavigationProps) {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    style={[
                        styles.background,
                        { padding: 1, borderRadius: 12 },
                    ]}
                    onPress={handleBackPress}>
                    <ChevronLeftIcon
                        size='28'
                        strokeWidth='2.5'
                        color='white'
                    />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={handleFavoritePress}>
                    <HeartIcon
                        size='24'
                        color={isFavorite ? theme.background : "white"}
                    />
                </TouchableOpacity>
            ),
        });
    });
    const {
        handleBackPress,
        handleFavoritePress,
        handleCastPress,
        isFavorite,
        state,
    } = useMovieScreen();

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className='flex-1 bg-neutral-900'>
            <>
                <MovieDetails
                    movie={state.movie.data!}
                    testID='screens.movie.movie-details'
                    isLoading={state.movie.isLoading}
                    hasError={!!state.movie.error}
                />

                <Cast
                    cast={state.cast.data!}
                    handleCastPress={handleCastPress}
                    testID='screens.movie.cast'
                    hasError={!!state.cast.error}
                    isLoading={state.cast.isLoading}
                />

                <MoviesList
                    title='Similar Movies'
                    data={state.similarMovies.data!}
                    hideSeeAll
                    testID='screens.movie.movie-list'
                    isLoading={state.similarMovies.isLoading}
                    hasError={!!state.similarMovies.error}
                />
            </>
        </ScrollView>
    );
}
