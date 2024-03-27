import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { imageURI } from "@constants/url";

type CastItemProps = {
    personName: string;
    characterName: string;
    handlePress: () => void;
    imagePath: string | undefined;
    testID?: string;
};

export function CastItem({
    personName,
    imagePath,
    characterName,
    handlePress,
    testID = "components.cast.components.cast-item",
}: CastItemProps) {
    return (
        <TouchableOpacity
            className='mr-4 items-center'
            onPress={handlePress}
            testID={testID}>
            <View className='overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500 mx-2'>
                <Image
                    testID='components.cast.components.cast-item.image'
                    className='rounded-2xl h-24 w-20'
                    source={
                        imagePath
                            ? { uri: `${imageURI}${imagePath}` }
                            : require("../../../assets/avatar.png")
                    }
                />
            </View>
            <Text className='text-white text-xs mt-1 ml-4'>
                {characterName.length > 10
                    ? characterName.slice(0, 10) + "..."
                    : characterName}
            </Text>
            <Text className='text-neutral-400 text-xs mt-1 ml-4'>
                {personName.length > 10
                    ? personName.slice(0, 10) + "..."
                    : personName}
            </Text>
        </TouchableOpacity>
    );
}
