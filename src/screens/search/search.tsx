import React from "react";
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
import { XMarkIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSearchScreen } from "./search.hook";
import { Loading } from "@components/index";

const results = [1, 2, 3, 4];

const { width, height } = Dimensions.get("window");

const movieName = "Ant Man and The Magic of Wazr";

export function SearchScreen() {
    const { handleClosePress, handleItemPress, isLoading } = useSearchScreen();
    return (
        <SafeAreaView className='bg-neutral-800 flex-1'>
            <View className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full'>
                <TextInput
                    placeholder='Search Movie'
                    placeholderTextColor={"lightgray"}
                    className='pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider'
                />
                <TouchableOpacity
                    onPress={handleClosePress}
                    className='rounded-full p-3 m-1 bg-neutral-500'>
                    <XMarkIcon size='25' color='white' />
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <Loading />
            ) : results.length > 0 ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                    className='space-y-3'>
                    <Text className='text-white font-semibold ml-1'>
                        Results ({results.length}){" "}
                    </Text>
                    <View className='flex-row justify-between flex-wrap'>
                        {results.map((item, index) => (
                            <TouchableWithoutFeedback
                                onPress={handleItemPress}
                                key={index}>
                                <View className='space-y-2 mb-4'>
                                    <Image
                                        className='rounded-3xl'
                                        source={require("../../../assets/favicon.png")}
                                        style={{
                                            width: width * 0.44,
                                            height: height * 0.3,
                                        }}
                                    />
                                    <Text className='text-neutral-300 ml-1'>
                                        {movieName.length > 22
                                            ? movieName.slice(0.22) + "..."
                                            : movieName}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        ))}
                    </View>
                </ScrollView>
            ) : (
                <View className='flex-row justify-center'>
                    <Image
                        source={require("../../../assets/favicon.png")}
                        className='h-96 w-96'
                    />
                </View>
            )}
        </SafeAreaView>
    );
}
