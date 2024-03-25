import React from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { MovieCard } from "@components/index";

import { useTrendingMovies } from "./trending-movies.hook";
import { TrendingMoveResults } from "@typings/data";

type TrendingMoviesProps = {
    data: TrendingMoveResults[];
};

const { width, height } = Dimensions.get("window");

export function TrendingMovies({ data }: TrendingMoviesProps) {
    const { handleCardPress } = useTrendingMovies();
    return (
        <View className='mb-8'>
            <Text className='text-white text-xl mx-4 mb-5'>Trending</Text>
            <Carousel
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
        </View>
    );
}
