import React from "react";
import { ScrollView, Text, View } from "react-native";
import { CastItem } from "./components/cast-item";

import { CastType } from "@typings/data";

type CastProps = {
    cast: CastType[];
    handleCastPress: (cast: CastType) => void;
};

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
                            personName={person.name}
                            characterName={person.character}
                            imagePath={person.profile_path}
                            handlePress={() => handleCastPress(person)}
                        />
                    ))}
            </ScrollView>
        </View>
    );
}
