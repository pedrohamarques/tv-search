import React from "react";
import { Image, Text, View, Dimensions } from "react-native";

import { Loading } from "@components/loading";
import { imageURI } from "@constants/url";

import { returnGender } from "@utils/data-formatter";

import { CastDetails as CastDetailsType } from "@typings/data";

const { width, height } = Dimensions.get("window");

type CastDetailsProps = {
    cast: CastDetailsType;
    testID?: string;
    hasError: boolean;
    isLoading?: boolean;
};

export function CastDetails({
    cast,
    hasError,
    isLoading,
    testID = "screens.movie.components.cast-details",
}: CastDetailsProps) {
    return (
        <>
            {isLoading ? (
                <View className='mb-10 justify-center items-center flex-1'>
                    <Loading
                        size={140}
                        testID='screens.person.components.cast-details.loading'
                    />
                </View>
            ) : hasError && !isLoading ? (
                <View className='justify-center items-center my-20'>
                    <Text className='text-white text-l align-center'>
                        There was some error when fetching data. Please try
                        again.
                    </Text>
                </View>
            ) : cast ? (
                <View testID={testID}>
                    <View
                        className='flex-row justify-center'
                        style={{
                            shadowColor: "gray",
                            shadowRadius: 40,
                            shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 1,
                        }}>
                        <View className='items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-400'>
                            <Image
                                testID='screens.person.components.cast-details.image'
                                source={
                                    cast.profile_path
                                        ? {
                                              uri: `${imageURI}${cast.profile_path}`,
                                          }
                                        : require("@assets/avatar.png")
                                }
                                style={{
                                    height: height * 0.4,
                                    width: width * 0.65,
                                }}
                            />
                        </View>
                    </View>

                    <View
                        className='mt-6'
                        testID='screens.person.name-place-of-birth'>
                        <Text className='text-3xl text-white font-bold text-center'>
                            {cast.name}
                        </Text>
                        <Text className='text-base text-neutral-400 text-center'>
                            {cast.place_of_birth
                                ? cast.place_of_birth
                                : "Not Avaiable"}
                        </Text>
                    </View>

                    <View className='mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full'>
                        <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                            <Text className='text-white font-semibold'>
                                Gender
                            </Text>
                            <Text className='text-neutral-300 text-sm '>
                                {cast.gender
                                    ? returnGender(cast.gender)
                                    : "Not Avaiable"}
                            </Text>
                        </View>
                        <View className='border-r-2 border-r-neutral-400 pr-4 items-center'>
                            <Text className='text-white font-semibold'>
                                Birthday
                            </Text>
                            <Text className='text-neutral-300 text-sm '>
                                {cast.birthday}
                            </Text>
                        </View>
                        <View className='border-r-2 border-r-neutral-400 pr-4 items-center'>
                            <Text className='text-white font-semibold'>
                                Known for
                            </Text>
                            <Text className='text-neutral-300 text-sm '>
                                {cast.known_for_department}
                            </Text>
                        </View>
                        <View className='pr-4 items-center'>
                            <Text className='text-white font-semibold'>
                                Popularity
                            </Text>
                            <Text className='text-neutral-300 text-sm '>
                                {cast.popularity}%
                            </Text>
                        </View>
                    </View>

                    <View className='my-6 mx-4 space-y-2 mb-8'>
                        <Text className='text-white text-lg'>Biography</Text>
                        <Text className='text-neutral-400 tracking-wide mt-4'>
                            {cast.biography}
                        </Text>
                    </View>
                </View>
            ) : null}
        </>
    );
}
