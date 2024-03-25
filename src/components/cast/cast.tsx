import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CastItem } from "./components/cast-item";

type CastProps = {
    cast: [];
    handleCastPress: () => void;
};

let personName = "Keanu Reeves";
let characterName = "John Wick";

export function Cast({ cast, handleCastPress }: CastProps) {
    return (
        <View className='my-6'>
            <Text className=' text-white text-lg mx-4 mb-5'>Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}>
                {cast &&
                    cast.map((person, index) => (
                        <CastItem
                            key={index}
                            personName={personName}
                            characterName={characterName}
                            handlePress={handleCastPress}
                        />
                    ))}
            </ScrollView>
        </View>
    );
}
