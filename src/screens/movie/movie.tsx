import React, { useLayoutEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

import { styles, theme } from "@themes/index";

import { Cast, MoviesList } from "@components/index";
import { Loading } from "@components/loading";

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
                        size='24'
                        strokeWidth={2.5}
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
        similarMovies,
        isLoading,
        movie,
        cast,
    } = useMovieScreen();

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className='flex-1 bg-neutral-900'>
            {isLoading ? (
                <View className='mt-24 pt-24'>
                    <Loading testID='screens.movie.loading' />
                </View>
            ) : (
                movie && (
                    <>
                        <MovieDetails
                            movie={movie}
                            testID='screens.movie.movie-details'
                        />

                        <Cast
                            cast={cast}
                            handleCastPress={handleCastPress}
                            testID='screens.movie.cast'
                        />

                        <MoviesList
                            title='Similar Movies'
                            data={similarMovies}
                            hideSeeAll
                            testID='screens.movie.movie-list'
                        />
                    </>
                )
            )}
        </ScrollView>
    );
}
