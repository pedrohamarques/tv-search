import { styles, theme } from "@themes/index";
import React from "react";
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    Text,
    View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePersonScreen } from "./person.hook";
import { Loading, MoviesList } from "@components/index";

const ios = Platform.OS === "ios";
const { width, height } = Dimensions.get("window");

const verticalMargin = ios ? "" : "my-3";
export function PersonScreen() {
    const {
        isFavorite,
        personMovies,
        isLoading,
        handleFavoritePress,
        handleBackPress,
    } = usePersonScreen();
    return (
        <ScrollView
            className='flex-1 bg-neutral-900'
            contentContainerStyle={{ paddingBottom: 20 }}>
            <SafeAreaView
                className={
                    "z-20 w-full flex-row justify-between items-center px-4 " +
                    verticalMargin
                }>
                <TouchableOpacity
                    onPress={handleBackPress}
                    style={styles.background}
                    className='rounded-xl'>
                    <ChevronLeftIcon
                        size='28'
                        strokeWidth={2.5}
                        color='white'
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFavoritePress}>
                    <HeartIcon
                        size='35'
                        color={isFavorite ? theme.background : "white"}
                    />
                </TouchableOpacity>
            </SafeAreaView>

            {isLoading ? (
                <Loading />
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
                                source={require("../../../assets/favicon.png")}
                                style={{
                                    height: height * 0.43,
                                    width: width * 0.74,
                                }}
                            />
                        </View>
                    </View>

                    <View className='mt-6'>
                        <Text className='text-3xl text-white font-bold text-center'>
                            Keanu Reeves
                        </Text>
                        <Text className='text-base text-neutral-400 text-center'>
                            London, United Kingdom
                        </Text>
                    </View>

                    <View className='mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full'>
                        <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                            <Text className='text-white font-semibold'>
                                Gender
                            </Text>
                            <Text className='text-neutral-300 text-sm '>
                                Male
                            </Text>
                        </View>
                        <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                            <Text className='text-white font-semibold'>
                                Birthday
                            </Text>
                            <Text className='text-neutral-300 text-sm '>
                                1964/09-02
                            </Text>
                        </View>
                        <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                            <Text className='text-white font-semibold'>
                                Known for
                            </Text>
                            <Text className='text-neutral-300 text-sm '>
                                Acting
                            </Text>
                        </View>
                        <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                            <Text className='text-white font-semibold'>
                                Popularity
                            </Text>
                            <Text className='text-neutral-300 text-sm '>
                                64.23
                            </Text>
                        </View>
                    </View>

                    <View className='my-6 mx-4 space-y-2'>
                        <Text className='text-white text-lg'>Biography</Text>
                        <Text className='text-neutral-400 tracking-wide'>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Id voluptatem autem fuga beatae quis quos
                            dolore? Quae quos maxime accusamus, odio
                            perspiciatis aut. Necessitatibus, vel. Tenetur
                            itaque et ducimus blanditiis.
                        </Text>
                    </View>

                    <MoviesList data={[1, 2, 3]} title='Movies' hideSeeAll />
                </View>
            )}
        </ScrollView>
    );
}
