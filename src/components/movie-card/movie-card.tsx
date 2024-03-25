import React from "react";
import { Image, TouchableWithoutFeedback, Dimensions } from "react-native";

type MovieCardProps = {
    item: any;
    handleClick: () => void;
};

const { width, height } = Dimensions.get("window");
export function MovieCard({ item, handleClick }: MovieCardProps) {
    return (
        <TouchableWithoutFeedback onPress={handleClick}>
            <Image
                source={require("../../../assets/favicon.png")}
                style={{ width: width * 0.6, height: height * 0.4 }}
                className='rounded-3xl'
            />
        </TouchableWithoutFeedback>
    );
}
