import React, { useLayoutEffect } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    TextInput,
    TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import { Loading } from "@components/index";
import { imageURI } from "@constants/url";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "@typings/route";

import { useSearchScreen } from "./search.hook";
import { ChevronLeftIcon, XMarkIcon } from "react-native-heroicons/outline";
import { styles } from "@themes/index";

const { width, height } = Dimensions.get("window");

type SearchScreenNavigationProps = {
    navigation: Pick<
        NativeStackNavigationProp<RootStackParamsList>,
        "setOptions"
    >;
};

export function SearchScreen({ navigation }: SearchScreenNavigationProps) {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={handleClosePress}
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
        });
    }, []);
    const {
        handleClosePress,
        handleItemPress,
        isLoading,
        handleTextDebounce,
        searchedMovies,
    } = useSearchScreen();

    return (
        <View className='bg-neutral-900 flex-1 justify-center items-center px-4'>
            <View className='w-full items-center border border-neutral-500 rounded-full flex-row p-1.5 px-4 mt-6 justify-between'>
                <TextInput
                    placeholder='Search movie'
                    placeholderTextColor='lightgray'
                    className='pb-1 pl-4 text-base font-semibold text-white tracking-wider'
                    onChangeText={event => handleTextDebounce(event)}
                    testID='screens.search.text-input'
                />
                <TouchableOpacity>
                    <XMarkIcon
                        size={25}
                        strokeWidth='2'
                        color='rgba(115, 115, 115, 1)'
                    />
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <View className='flex-1 justify-center items-center pb-24'>
                    <Loading testID='screens.search.loading' />
                </View>
            ) : searchedMovies.length > 0 ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className='space-y-3 mt-4'>
                    <Text className='text-white font-semibold ml-1 mt-4'>
                        Results ({searchedMovies.length}){" "}
                    </Text>
                    <View className='flex-row justify-between flex-wrap mt-6'>
                        {searchedMovies.map((item, index) => (
                            <TouchableWithoutFeedback
                                onPress={() => handleItemPress(item)}
                                key={index}>
                                <View className='space-y-2 mb-4'>
                                    <Image
                                        testID={`screens.search.image-${index}`}
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
            ) : (
                <View className='flex-1 justify-center items-center mb-20 pb-20'>
                    <Image
                        source={require("@assets/search-empty.png")}
                        className='h-96 w-96'
                        testID='screens.search.no-search-image'
                    />
                    <Text className='tracking-wider text-2xl text-white'>
                        The movies you search will appear here
                    </Text>
                </View>
            )}
        </View>
    );
}
