import { styles } from "@themes/index";
import React from "react";
import { Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useMoviesList } from "./movies.list.hook";
import { MovieItem } from "./components";
import {
    CastMovies,
    SimilarMovieResult,
    TopRatedMovieResults,
    UpcomingMovieResults,
} from "@typings/data";

type MoviesListProps = {
    title: string;
    data:
        | UpcomingMovieResults[]
        | TopRatedMovieResults[]
        | SimilarMovieResult[]
        | CastMovies[];
    hideSeeAll?: boolean;
    testID?: string;
};

export function MoviesList({
    title,
    data,
    hideSeeAll = false,
    testID = "components.movie-list",
}: MoviesListProps) {
    const { handlePress } = useMoviesList();
    return (
        <View className='mb-8 space-y-4' testID={testID}>
            <View className='mx-4 flex-row justify-between items-center'>
                <Text className='text-white text-xl'>{title}</Text>
                {!hideSeeAll && (
                    <TouchableOpacity>
                        <Text style={styles.text} className='text-lg'>
                            See All
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
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
        </View>
    );
}
