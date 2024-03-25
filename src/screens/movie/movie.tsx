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
        movieDetails,
    } = useMovieScreen();

    console.log(movieDetails);

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className='flex-1 bg-neutral-900'>
            {isLoading ? (
                <Loading />
            ) : (
                <View>
                    <Image
                        source={{
                            uri: `${imageURI}${movieDetails!.poster_path}`,
                        }}
                        style={{
                            width: width * 0.85,
                            height: height * 0.55,
                        }}
                        className='rounded-2xl self-center mt-4'
                    />
                </View>
            )}

            <View className='space-y-3 my-10'>
                <Text className='text-white text-center text-3xl font-bold tracking-wider'>
                    {movieDetails!.title}
                </Text>
                <Text className='text-neutral-400 font-semibold text-base text-center'>
                    {`Released in ${new Date(movieDetails!.release_date).getFullYear()}`}
                </Text>

                <View className='flex-row justify-center mx-4 space-x-2 my-4'>
                    <Text className='text-neutral-400 font-semibold text-base text-center'>
                        Action *
                    </Text>
                    <Text className='text-neutral-400 font-semibold text-base text-center'>
                        Thrill *
                    </Text>
                    <Text className='text-neutral-400 font-semibold text-base text-center'>
                        Comedy *
                    </Text>
                </View>

                <Text className='text-neutral-400 mx-4 tracking-wide'>
                    {movieDetails!.overview}
                </Text>
            </View>

            <Cast cast={[1, 2, 3]} handleCastPress={handleCastPress} />

            <MoviesList
                title='Similar Movies'
                data={similarMovies}
                hideSeeAll
            />
        </ScrollView>
    );
}
