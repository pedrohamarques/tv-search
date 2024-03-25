import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type CastItemProps = {
    personName: string;
    characterName: string;
    handlePress: () => void;
};

export function CastItem({
    personName,
    characterName,
    handlePress,
}: CastItemProps) {
    return (
        <TouchableOpacity className='mr-4 items-center' onPress={handlePress}>
            <View className='overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500'>
                <Image
                    className='rounded-2xl h-24 w-20'
                    source={require("../../../../assets/favicon.png")}
                />
            </View>
            <Text className='text-white text-xs mt-1'>
                {characterName.length > 10
                    ? characterName.slice(0, 10) + "..."
                    : characterName}
            </Text>
            <Text className='text-neutral-400 text-xs mt-1'>
                {personName.length > 10
                    ? personName.slice(0, 10) + "..."
                    : personName}
            </Text>
        </TouchableOpacity>
    );
}
