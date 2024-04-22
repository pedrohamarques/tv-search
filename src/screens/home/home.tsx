import React, { useLayoutEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

import { styles } from "@themes/index";

import { MoviesList, TrendingMovies } from "@components/index";

import { useHomeScreen } from "./home.hook";
import type { CompositeNavigationProp } from "@react-navigation/native";
import type { DrawerNavigationProp } from "@react-navigation/drawer";
import type { RootDrawerParamsList, RootStackParamsList } from "@typings/route";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type HomeScreenNavigationProps = {
    navigation: Pick<
        CompositeNavigationProp<
            DrawerNavigationProp<RootDrawerParamsList>,
            NativeStackNavigationProp<RootStackParamsList>
        >,
        "setOptions"
    >;
};

export function HomeScreen({ navigation }: HomeScreenNavigationProps) {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View className='pr-4'>
                    <TouchableOpacity onPress={handleSearchPress}>
                        <MagnifyingGlassIcon
                            size='24'
                            strokeWidth={2}
                            color='white'
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerTitle: () => (
                <Text className='text-white text-3xl font-bold'>
                    <Text style={styles.text}>M</Text>ovies
                </Text>
            ),
        });
    }, [navigation]);
    const { movies, handleSearchPress, handleProfilePress, handleSeeAllPress } =
        useHomeScreen();
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
            className='pt-4 bg-neutral-800 '>
            <View className='flex-row items-center justify-end w-full pr-4 mb-4'>
                <TouchableOpacity onPress={handleProfilePress}>
                    <Text className='text-white text-xl'>Hello, Pedro</Text>
                </TouchableOpacity>
            </View>

            <TrendingMovies
                data={movies.trending.movies}
                testID='screens.home.trending-movies'
                isLoading={movies.trending.isLoading}
                hasError={!!movies.trending.error}
            />
            <MoviesList
                title='Upcoming'
                data={movies.upcoming.movies}
                testID='screens.home.movies-list.upcoming'
                isLoading={movies.upcoming.isLoading}
                hasError={!!movies.upcoming.error}
                handleSeeAllPress={() => handleSeeAllPress("upcoming")}
            />

            <MoviesList
                title='Top Rated'
                data={movies.topRated.movies}
                testID='screens.home.movies-list.top-rated'
                isLoading={movies.topRated.isLoading}
                hasError={!!movies.topRated.error}
                handleSeeAllPress={() => handleSeeAllPress("topRated")}
            />
        </ScrollView>
    );
}
