import React from "react";
import { Image, TouchableWithoutFeedback, Dimensions } from "react-native";

type MovieCardProps = {
    item: any;
    handlePress: () => void;
};

const { width, height } = Dimensions.get("window");
export function MovieCard({ item, handlePress }: MovieCardProps) {
    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <Image
                source={require("../../../assets/favicon.png")}
                style={{ width: width * 0.6, height: height * 0.4 }}
                className='rounded-3xl'
            />
        </TouchableWithoutFeedback>
    );
}
