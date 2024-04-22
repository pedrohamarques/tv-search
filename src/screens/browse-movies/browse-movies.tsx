import React, { useLayoutEffect } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";

import { styles } from "@themes/index";

import { imageURI } from "@constants/url";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamsList } from "@typings/route";

import { useBrowseMoviesScreen } from "./browse-movies.hook";

const { width, height } = Dimensions.get("window");

type BrowseMoviesScreenNavigationProps = {
    navigation: Pick<
        NativeStackNavigationProp<RootStackParamsList>,
        "setOptions"
    >;
};

export function BrowseMoviesScreen({
    navigation,
}: BrowseMoviesScreenNavigationProps) {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={handleGoBackPress}
                    style={[
                        styles.background,
                        { borderRadius: 12, padding: 4 },
                    ]}
                    className='rounded-full p-3 m-1 bg-neutral-500'>
                    <ChevronLeftIcon
                        size='24'
                        color='white'
                        strokeWidth='2.5'
                    />
                </TouchableOpacity>
            ),
            headerTitle: () => {
                if (routeFrom === "topRated") {
                    return (
                        <Text className='text-white text-3xl font-bold'>
                            <Text style={styles.text}>T</Text>op{" "}
                            <Text style={styles.text}>R</Text>ated
                        </Text>
                    );
                } else {
                    return (
                        <Text className='text-white text-3xl font-bold'>
                            <Text style={styles.text}>U</Text>pcoming
                        </Text>
                    );
                }
            },
        });
    }, []);
    const { handleGoBackPress, movies, routeFrom, handleItemPress } =
        useBrowseMoviesScreen();

    return (
        <View className='bg-neutral-900 flex-1 justify-center items-center px-4'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                className='space-y-3 mt-4'>
                <Text className='text-white font-semibold ml-1 mt-4'>
                    Results ({movies.length}){" "}
                </Text>
                <View className='flex-row justify-between flex-wrap mt-6'>
                    {movies.map((item, index) => (
                        <TouchableWithoutFeedback
                            onPress={() => handleItemPress(item)}
                            key={index}>
                            <View className='space-y-2 mb-4'>
                                <Image
                                    testID={`screens.browse-movies.image-${index}`}
                                    className='rounded-3xl'
                                    source={
                                        item.poster_path
                                            ? {
                                                  uri: `${imageURI}${item.poster_path}`,
                                              }
                                            : require("@assets/blank-movie.png")
                                    }
                                    style={{
                                        width: width * 0.44,
                                        height: height * 0.3,
                                    }}
                                />
                                <Text className='text-neutral-300 ml-1 mt-2 mb-2'>
                                    {item.title.length > 22
                                        ? item.title.slice(0, 22) + "..."
                                        : item.title}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
