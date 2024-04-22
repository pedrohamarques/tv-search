import React from "react";
import { Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { Loading } from "@components/loading";

import { styles } from "@themes/index";

import { MovieItem } from "./components";

import {
    CastMovies,
    SimilarMovieResult,
    TopRatedMovieResults,
    UpcomingMovieResults,
} from "@typings/data";

import { useMoviesList } from "./movies.list.hook";

type MoviesListProps = {
    title: string;
    data:
        | UpcomingMovieResults[]
        | TopRatedMovieResults[]
        | SimilarMovieResult[]
        | CastMovies[];
    hideSeeAll?: boolean;
    testID?: string;
    isLoading?: boolean;
    hasError: boolean;
    handleSeeAllPress: () => void;
};

export function MoviesList({
    title,
    isLoading,
    data,
    hideSeeAll = false,
    testID = "components.movie-list",
    hasError,
    handleSeeAllPress,
}: MoviesListProps) {
    const { handlePress } = useMoviesList();
    return (
        <View className='mb-8 space-y-4' testID={testID}>
            <View className='mx-4 flex-row justify-between items-center'>
                <Text className='text-white text-xl'>{title}</Text>
                {!hideSeeAll && (
                    <TouchableOpacity onPress={handleSeeAllPress}>
                        <Text style={styles.text} className='text-lg'>
                            See All
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            {isLoading ? (
                <Loading size={140} testID='components.movies-list.loading' />
            ) : hasError && !isLoading ? (
                <View className='justify-center items-center my-10'>
                    <Text className='text-white text-l align-center'>
                        There was some error when fetching data. Please try
                        again.
                    </Text>
                </View>
            ) : (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16 }}>
                    {data.map((item, index) => (
                        <MovieItem
                            key={index}
                            movieName={item.title}
                            imagePath={item.poster_path}
                            handlePress={() => handlePress(item)}
                            testID={`components.movie-list.movie-item-${index}`}
                        />
                    ))}
                </ScrollView>
            )}
        </View>
    );
}
