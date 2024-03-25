import { styles } from "@themes/index";
import React from "react";
import { Image, Text, View } from "react-native";
import {
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useMoviesList } from "./movies.list.hook";
import { MovieItem } from "./components";

type MoviesListProps = {
    title: string;
    data: [];
    hideSeeAll?: boolean;
};

const movieName = "Naruto";

export function MoviesList({ title, data, hideSeeAll }: MoviesListProps) {
    const { handlePress } = useMoviesList();
    return (
        <View className='mb-8 space-y-4'>
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
                        movieName={movieName}
                        handlePress={handlePress}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
