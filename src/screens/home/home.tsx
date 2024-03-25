import React from "react";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export function Home() {
    return (
        <View>
            <Text className='text-red-500'>
                {" "}
                1Open up App.tsx to start working on your app!
            </Text>
            <StatusBar style='auto' />
        </View>
    );
}
