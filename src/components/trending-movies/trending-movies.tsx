import React from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { MovieCard } from "@components/index";

import { useTrendingMovies } from "./trending-movies.hook";

type TrendingMoviesProps = {
    data: [];
};

const { width } = Dimensions.get("window");

export function TrendingMovies({ data }: TrendingMoviesProps) {
    const { handleCardPress } = useTrendingMovies();
    return (
        <View className='mb-8'>
            <Text className='text-white text-xl mx-4 mb-5'>Trending</Text>
            <Carousel
                data={[1, 2, 3]}
                width={width}
                height={width / 2}
                style={{ display: "flex", alignItems: "center" }}
                loop
                scrollAnimationDuration={1000}
                autoPlay={false}
                renderItem={({ item }) => (
                    <MovieCard item={item} handlePress={handleCardPress} />
                )}
            />
        </View>
    );
}
