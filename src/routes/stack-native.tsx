import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "@screens/home";
import MovieScreen from "@screens/movie";
import PersonScreen from "@screens/person";
import SearchScreen from "@screens/search";

import { RouteStackList, type RootStackParamsList } from "@typings/route";

const Stack = createNativeStackNavigator<RootStackParamsList>();

export function RootNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={RouteStackList.HOME}
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={RouteStackList.MOVIE}
                component={MovieScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={RouteStackList.PERSON}
                component={PersonScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={RouteStackList.SEARCH}
                component={SearchScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
