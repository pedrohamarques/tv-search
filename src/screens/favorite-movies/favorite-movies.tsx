import React from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    View,
    Dimensions,
} from "react-native";

import { useFavoriteMoviesScreen } from "./favorite-movies.hook";
import { imageURI } from "@constants/url";

const { width, height } = Dimensions.get("window");

export function FavoriteMoviesScreen() {
    const { movies, handleMoviePress } = useFavoriteMoviesScreen();
    return (
        <View className='bg-neutral-800 flex-1 justify-center items-center px-4'>
            {movies.length > 0 ? (
                <>
                    <View className='w-full mt-4'>
                        <Text className='text-white font-semibold ml-2 mt-4'>
                            Favorite Movies ({movies.length}){" "}
                        </Text>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        className='space-y-3 mt-4 w-full'>
                        <View className='flex-row justify-between flex-wrap mt-4'>
                            {movies.map((item, index) => (
                                <TouchableWithoutFeedback
                                    onPress={() => handleMoviePress(item)}
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
                                                width: width * 0.4,
                                                height: height * 0.3,
                                            }}
                                        />
                                        <Text className='text-neutral-300 ml-1 mt-2 mb-2'>
                                            {item.title.length > 22
                                                ? item.title.slice(0, 22) +
                                                  "..."
                                                : item.title}
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
                        The movies you mark as favorite will appear here
                    </Text>
                </View>
            )}
        </View>
    );
}
