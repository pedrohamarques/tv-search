import React from "react";
import {
    Dimensions,
    Image,
    Platform,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { styles, theme } from "@themes/index";
import { useMovieScreen } from "./movie.hook";
import { Cast, Loading, MoviesList } from "@components/index";

const { width, height } = Dimensions.get("window");

const topMargin = Platform.OS === "ios" ? "" : "mt-3";

const movieName = "AntMan and Other Stuff";

export function MovieScreen() {
    const {
        handleBackPress,
        handleFavoritePress,
        handleCastPress,
        isFavorite,
        similarMovies,
        isLoading,
    } = useMovieScreen();

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className='flex-1 bg-neutral-900'>
            <SafeAreaView className='absolute z-20 w-full'>
                <View
                    className={
                        "w-full flex-row justify-between items-center px-4" +
                        topMargin
                    }>
                    <TouchableOpacity
                        style={styles.background}
                        className='rounded-xl p-1'
                        onPress={handleBackPress}>
                        <ChevronLeftIcon
                            size='28'
                            strokeWidth={2.5}
                            color='white'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleFavoritePress}>
                        <HeartIcon
                            size='35'
                            color={isFavorite ? theme.background : "white"}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {isLoading ? (
                <Loading />
            ) : (
                <View>
                    <Image
                        source={require("../../../assets/favicon.png")}
                        style={{ width: width, height: height * 0.55 }}
                    />
                    <LinearGradient
                        colors={[
                            "transparent",
                            "rgba(23,23,23, 0.8)",
                            " rgba(23,23,23,1)",
                        ]}
                        style={{ width, height: height * 0.4 }}
                        start={{ x: 0.5, y: 1 }}
                        className='absolute bottom-0'
                    />
                </View>
            )}

            <View style={{ marginTop: -(height * 0.08) }} className='space-y-3'>
                <Text className='text-white text-center text-3xl font-bold tracking-wider'>
                    {movieName}
                </Text>
                <Text className='text-neutral-400 font-semibold text-base text-center'>
                    Released in 2020 of 170 min
                </Text>

                <View className='flex-row justify-center mx-4 space-x-2'>
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
                    Description
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
