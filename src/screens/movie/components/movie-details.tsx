import React from "react";
import { Dimensions, Image, Text, View } from "react-native";

import { imageURI } from "@constants/url";

import { MovieDetailsResponse } from "@typings/data";

const { width, height } = Dimensions.get("window");

type MovieDetailsProps = {
    movie: MovieDetailsResponse;
    testID?: string;
};

export function MovieDetails({
    movie,
    testID = "screens.movie.components.movie-details",
}: MovieDetailsProps) {
    return (
        <>
            <View testID={testID}>
                <Image
                    source={{
                        uri: `${imageURI}${movie.poster_path}`,
                    }}
                    style={{
                        width: width * 0.85,
                        height: height * 0.55,
                    }}
                    className='rounded-2xl self-center mt-4'
                    testID='screens.movie.component.movie-details.image'
                />
            </View>
            <View className='space-y-3 my-10'>
                <Text className='text-white text-center text-3xl font-bold tracking-wider'>
                    {movie.title}
                </Text>
                <Text className='text-neutral-400 font-semibold text-base text-center mt-2'>
                    {movie.status} • {movie.release_date.split("-")[0]} •{" "}
                    {movie.runtime} min
                </Text>

                <View className='flex-row justify-center mx-4 space-x-2 my-4'>
                    {movie.genres.map((item, index) => (
                        <Text
                            key={index}
                            className='text-neutral-400 font-semibold text-base text-center'>
                            {item.name}{" "}
                            {index !== movie.genres.length - 1 && "• "}
                        </Text>
                    ))}
                </View>

                <Text className='text-neutral-400 mx-4 tracking-wide mt-4'>
                    {movie.overview}
                </Text>
            </View>
        </>
    );
}
