import React from "react";
import { Image, TouchableWithoutFeedback, Dimensions } from "react-native";

import { imageURI } from "@constants/url";

import { TrendingMoveResults } from "@typings/data";

type MovieCardProps = {
    item: TrendingMoveResults;
    handlePress: () => void;
    testID?: string;
};

const { width, height } = Dimensions.get("window");
export function MovieCard({ item, handlePress, testID }: MovieCardProps) {
    return (
        <TouchableWithoutFeedback onPress={handlePress} testID={testID}>
            <Image
                source={{ uri: `${imageURI}${item.poster_path}` }}
                style={{ width: width * 0.6, height: height * 0.4 }}
                className='rounded-3xl'
                testID='components.trending-movies.components.movie-card.image'
            />
        </TouchableWithoutFeedback>
    );
}
