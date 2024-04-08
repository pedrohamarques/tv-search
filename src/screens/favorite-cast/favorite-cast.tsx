import React from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import { imageURI } from "@constants/url";

import { useFavoriteCastScreen } from "./favorite-cast.hook";

const { width, height } = Dimensions.get("window");

export function FavoriteCastScreen() {
    const { cast, handleCastPress } = useFavoriteCastScreen();
    return (
        <View className='bg-neutral-800 flex-1 justify-center items-center px-4'>
            {cast.length > 0 ? (
                <>
                    <View className='w-full mt-4'>
                        <Text className='text-white font-semibold ml-2 mt-2'>
                            Favorite Cast ({cast.length}){" "}
                        </Text>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        className='space-y-3 mt-4 w-full'>
                        <View className='flex-row justify-around flex-wrap mt-4'>
                            {cast.map((item, index) => (
                                <TouchableWithoutFeedback
                                    onPress={() => handleCastPress(item)}
                                    key={index}>
                                    <View className='space-y-2 mb-4 px-2'>
                                        <Image
                                            testID={`screens.search.image-${index}`}
                                            className='rounded-3xl'
                                            source={
                                                item.imagePath
                                                    ? {
                                                          uri: `${imageURI}${item.imagePath}`,
                                                      }
                                                    : require("@assets/blank-movie.png")
                                            }
                                            style={{
                                                width: width * 0.25,
                                                height: height * 0.2,
                                            }}
                                        />
                                        <Text className='text-neutral-300 ml-1 mt-2 mb-2'>
                                            {item.name.length > 14
                                                ? item.name.slice(0, 14) + "..."
                                                : item.name}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            ))}
                        </View>
                    </ScrollView>
                </>
            ) : (
                <View className='flex-1 justify-center items-center mb-20 pb-20'>
                    <Image
                        source={require("@assets/empty-list.png")}
                        className='h-96 w-96'
                        testID='screens.search.no-search-image'
                    />
                    <Text className='tracking-wider text-xl text-white'>
                        The cast you mark as favorite will appear here
                    </Text>
                </View>
            )}
        </View>
    );
}
