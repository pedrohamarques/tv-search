import React from "react";
import { ScrollView, Text, View } from "react-native";

import { Loading } from "@components/loading";

import { CastItem } from "./components/cast-item";

import type { CastType } from "@typings/data";

type CastProps = {
    cast: CastType[];
    handleCastPress: (cast: CastType) => void;
    testID?: string;
    isLoading?: boolean;
    hasError: boolean;
};

export function Cast({
    cast,
    handleCastPress,
    testID = "components.cast",
    isLoading,
    hasError,
}: CastProps) {
    return (
        <View className='my-6' testID={testID}>
            <Text className=' text-white text-lg mx-4 mb-5'>Top Cast</Text>
            {isLoading ? (
                <View className={"-mt-10"}>
                    <Loading size={80} testID='components.cast.loading' />
                </View>
            ) : hasError && !isLoading ? (
                <View className='justify-center items-center my-6'>
                    <Text className='text-white text-l align-center'>
                        There was some error when fetching data. Please try
                        again.
                    </Text>
                </View>
            ) : (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 6 }}>
                    {cast &&
                        cast.map((person, index) => (
                            <CastItem
                                key={index}
                                personName={person.name}
                                characterName={person.character}
                                imagePath={person.profile_path}
                                handlePress={() => handleCastPress(person)}
                                testID={`components.cast.cast-item-${index}`}
                            />
                        ))}
                </ScrollView>
            )}
        </View>
    );
}
