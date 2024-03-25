import React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

type MovieItemProps = {
    handlePress: () => void;
    movieName: string;
};

const { width, height } = Dimensions.get("window");

export function MovieItem({ handlePress, movieName }: MovieItemProps) {
    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View className='space-y-1 mr-4'>
                <Image
                    source={require("../../../../assets/favicon.png")}
                    className='rounded-3xl'
                    style={{ width: width * 0.33, height: height * 0.22 }}
                />
            </View>
            <Text className='text-neutral-300 ml-1'>
                {movieName.length > 14
                    ? movieName.slice(0, 14) + "..."
                    : movieName}
            </Text>
        </TouchableWithoutFeedback>
    );
}
