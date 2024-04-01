import React, { useLayoutEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

import { styles } from "@themes/index";

import { Loading, MoviesList, TrendingMovies } from "@components/index";

import { useHomeScreen } from "./home.hook";
import { CompositeNavigationProp } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamsList, RootStackParamsList } from "@typings/route";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

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
    const {
        isLoading,
        trendingMovies,
        upcomingMovies,
        topRatedMovies,
        handleSearchPress,
    } = useHomeScreen();
    return (
        <View className='flex-1 bg-neutral-800'>
            {isLoading ? (
                <Loading testID='screens.home.loading' />
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 10 }}
                    className='pt-4'>
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
