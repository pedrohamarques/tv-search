import React, { useLayoutEffect } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

import { styles, theme } from "@themes/index";

import { MoviesList } from "@components/index";
import { Loading } from "@components/loading";

import { usePersonScreen } from "./person.hook";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "@typings/route";
import { imageURI } from "@constants/url";

type PersonScreenNavigationProps = {
    navigation: Pick<
        NativeStackNavigationProp<RootStackParamsList>,
        "setOptions"
    >;
};

const { width, height } = Dimensions.get("window");

export function PersonScreen({ navigation }: PersonScreenNavigationProps) {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    style={[
                        styles.background,
                        { padding: 1, borderRadius: 12 },
                    ]}
                    onPress={handleBackPress}>
                    <ChevronLeftIcon
                        size='28'
                        strokeWidth={2.5}
                        color='white'
                    />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={handleFavoritePress}>
                    <HeartIcon
                        size='35'
                        color={isFavorite ? theme.background : "white"}
                    />
                </TouchableOpacity>
            ),
        });
    });
    const {
        isFavorite,
        personMovies,
        isLoading,
        personDetails,
        handleFavoritePress,
        handleBackPress,
    } = usePersonScreen();
    return (
        <ScrollView
            className='flex-1 bg-neutral-900'
            contentContainerStyle={{ paddingBottom: 20 }}>
            {isLoading ? (
                <View className='pt-24 mt-24'>
                    <Loading testID='screens.person.loading' />
                </View>
            ) : (
                <View>
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
                                testID='screens.person.image'
                                source={
                                    personDetails?.profile_path
                                        ? {
                                              uri: `${imageURI}${personDetails.profile_path}`,
                                          }
                                        : require("@assets/avatar.png")
                                }
                                style={{
                                    height: height * 0.43,
                                    width: width * 0.74,
                                }}
                            />
                        </View>
                    </View>

                    <View
                        className='mt-6'
                        testID='screens.person.name-place-of-birth'>
                        <Text className='text-3xl text-white font-bold text-center'>
                            {personDetails?.name}
                        </Text>
                        <Text className='text-base text-neutral-400 text-center'>
                            {personDetails?.place_of_birth}
                        </Text>
                    </View>

                    <View className='mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full'>
                        <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                            <Text className='text-white font-semibold'>
                                Gender
                            </Text>
                            <Text className='text-neutral-300 text-sm '>
                                {personDetails?.gender}
                            </Text>
                        </View>
                        <View className='border-r-2 border-r-neutral-400 pr-4 items-center'>
                            <Text className='text-white font-semibold'>
                                Birthday
                            </Text>
                            <Text className='text-neutral-300 text-sm '>
                                {personDetails?.birthday}
                            </Text>
                        </View>
                        <View className='border-r-2 border-r-neutral-400 pr-4 items-center'>
                            <Text className='text-white font-semibold'>
                                Known for
                            </Text>
                            <Text className='text-neutral-300 text-sm '>
                                {personDetails?.known_for_department}
                            </Text>
                        </View>
                        <View className='pr-4 items-center'>
                            <Text className='text-white font-semibold'>
                                Popularity
                            </Text>
                            <Text className='text-neutral-300 text-sm '>
                                {personDetails?.popularity}%
                            </Text>
                        </View>
                    </View>

                    <View className='my-6 mx-4 space-y-2 mb-8'>
                        <Text className='text-white text-lg'>Biography</Text>
                        <Text className='text-neutral-400 tracking-wide mt-4'>
                            {personDetails?.biography}
                        </Text>
                    </View>

                    <MoviesList
                        data={personMovies}
                        title='Movies'
                        hideSeeAll
                        testID='screens.person.movies-list'
                    />
                </View>
            )}
        </ScrollView>
    );
}
