import React, { useLayoutEffect } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

import { styles, theme } from "@themes/index";

import { Cast, Loading, MoviesList } from "@components/index";

import { imageURI } from "@constants/url";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "@typings/route";

import { useMovieScreen } from "./movie.hook";

const { width, height } = Dimensions.get("window");

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
                        strokeWidth={2.5}
                        color='white'
                    />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={handleFavoritePress}>
                    <HeartIcon
                        size='35'
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
                <Loading />
            ) : (
                movie && (
                    <>
                        <View>
                            <Image
                                source={{
                                    uri: `${imageURI}${movie.poster_path}`,
                                }}
                                style={{
                                    width: width * 0.85,
                                    height: height * 0.55,
                                }}
                                className='rounded-2xl self-center mt-4'
                            />
                        </View>
                        <View className='space-y-3 my-10'>
                            <Text className='text-white text-center text-3xl font-bold tracking-wider'>
                                {movie.title}
                            </Text>
                            <Text className='text-neutral-400 font-semibold text-base text-center mt-2'>
                                {movie.status} •{" "}
                                {movie.release_date.split("-")[0]} •{" "}
                                {movie.runtime} min
                            </Text>

                            <View className='flex-row justify-center mx-4 space-x-2 my-4'>
                                {movie.genres.map((item, index) => (
                                    <Text
                                        key={index}
                                        className='text-neutral-400 font-semibold text-base text-center'>
                                        {item.name}{" "}
                                        {index !== movie.genres.length - 1 &&
                                            "• "}
                                    </Text>
                                ))}
                            </View>

                            <Text className='text-neutral-400 mx-4 tracking-wide mt-4'>
                                {movie.overview}
                            </Text>
                        </View>

                        <Cast cast={cast} handleCastPress={handleCastPress} />

                        <MoviesList
                            title='Similar Movies'
                            data={similarMovies}
                            hideSeeAll
                        />
                    </>
                )
            )}
        </ScrollView>
    );
}
