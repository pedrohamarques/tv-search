import { imageURI } from "@constants/url";
import React from "react";
import {
    Dimensions,
    Image,
    Text,
    View,
    TouchableWithoutFeedback,
} from "react-native";

type MovieItemProps = {
    handlePress: () => void;
    movieName: string;
    imagePath?: string;
    testID?: string;
};

const { width, height } = Dimensions.get("window");

export function MovieItem({
    handlePress,
    movieName,
    imagePath,
    testID = "components.movie-list.components.movie-item",
}: MovieItemProps) {
    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <>
                <View className='space-y-1 mr-4 my-4' testID={testID}>
                    <Image
                        source={{ uri: `${imageURI}${imagePath}` }}
                        className='rounded-3xl'
                        style={{ width: width * 0.33, height: height * 0.22 }}
                        testID='components.movie-list.components.movie-item.image'
                    />
                </View>
                <Text className='text-neutral-300 ml-1'>
                    {movieName.length > 14
                        ? movieName.slice(0, 14) + "..."
                        : movieName}
                </Text>
            </>
        </TouchableWithoutFeedback>
    );
}
