import React from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { Loading } from "@components/loading";

import { MovieCard } from "./components/movie-card";

import type { TrendingMovieResults } from "@typings/data";

import { useTrendingMovies } from "./trending-movies.hook";

type TrendingMoviesProps = {
    data: TrendingMovieResults[];
    testID?: string;
    isLoading: boolean;
};

const { width, height } = Dimensions.get("window");

export function TrendingMovies({
    data,
    isLoading,
    testID = "components.trending-movies",
}: TrendingMoviesProps) {
    const { handleCardPress } = useTrendingMovies();
    return (
        <View className='mb-8' testID={testID}>
            <Text className='text-white text-xl mx-4 mb-5'>Trending</Text>
            {isLoading ? (
                <Loading
                    size={140}
                    testID='components.trending-movies.loading'
                />
            ) : (
                <Carousel
                    testID='components.trending-movies.carousel'
                    data={data}
                    width={width}
                    height={height * 0.4}
                    mode='horizontal-stack'
                    modeConfig={{
                        showLength: 10,
                        opacityInterval: 0,
                    }}
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                    loop
                    scrollAnimationDuration={1500}
                    autoPlay={true}
                    renderItem={({ item }) => (
                        <MovieCard
                            item={item}
                            handlePress={() => handleCardPress(item)}
                        />
                    )}
                />
            )}
        </View>
    );
}
