import React from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    Bars3CenterLeftIcon,
    MagnifyingGlassIcon,
} from "react-native-heroicons/outline";

import { styles } from "@themes/index";

import { Loading, MoviesList, TrendingMovies } from "@components/index";

import { useHomeScreen } from "./home.hook";

export function HomeScreen() {
    const {
        isIos,
        isLoading,
        trendingMovies,
        upcomingMovies,
        topRatedMovies,
        handleSearchPress,
    } = useHomeScreen();
    return (
        <View className='flex-1 bg-neutral-800'>
            <SafeAreaView className={isIos ? "-mb-2" : "mb-3"}>
                <StatusBar style='light' />
                <View className='flex-row justify-between items-center mx-4'>
                    <Bars3CenterLeftIcon
                        size='30'
                        strokeWidth={2}
                        color='white'
                    />
                    <Text className='text-white text-3xl font-bold'>
                        <Text style={styles.text}>M</Text>ovies
                    </Text>
                    <TouchableOpacity onPress={handleSearchPress}>
                        <MagnifyingGlassIcon
                            size='30'
                            strokeWidth={2}
                            color='white'
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {isLoading ? (
                <Loading testID='screens.home.loading' />
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 10 }}>
                    <TrendingMovies
                        data={trendingMovies}
                        testID='screens.home.trending-movies'
                    />

                    <MoviesList
                        title='Upcoming'
                        data={upcomingMovies}
                        testID='screens.home.movies-list.upcoming'
                    />

                    <MoviesList
                        title='Top Rated'
                        data={topRatedMovies}
                        testID='screens.home.movies-list.top-rated'
                    />
                </ScrollView>
            )}
        </View>
    );
}
