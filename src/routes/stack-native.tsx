import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MovieScreen from "@screens/movie";
import PersonScreen from "@screens/person";
import SearchScreen from "@screens/search";
import ProfileScreen from "@screens/profile";
import BrowseMoviesScreen from "@screens/browse-movies";

import { RouteStackList, type RootStackParamsList } from "@typings/route";
import { DrawerContainer } from "./drawer";

const Stack = createNativeStackNavigator<RootStackParamsList>();

export function RootNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={RouteStackList.DRAWER}
                component={DrawerContainer}
                options={{
                    headerShown: false,
                    headerStyle: { backgroundColor: "rgba(23, 23, 23, 1)" },
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name={RouteStackList.MOVIE}
                component={MovieScreen}
                options={{
                    headerTitle: "",
                    headerBackTitleVisible: false,
                    headerStyle: { backgroundColor: "rgba(23, 23, 23, 1)" },
                }}
            />
            <Stack.Screen
                name={RouteStackList.PERSON}
                component={PersonScreen}
                options={{
                    headerTitle: "",
                    headerBackTitleVisible: false,
                    headerStyle: { backgroundColor: "rgba(23, 23, 23, 1)" },
                }}
            />
            <Stack.Screen
                name={RouteStackList.SEARCH}
                component={SearchScreen}
                options={{
                    headerTitle: "",
                    headerBackTitleVisible: false,
                    headerBackVisible: false,
                    headerStyle: { backgroundColor: "rgba(23, 23, 23, 1)" },
                }}
            />

            <Stack.Screen
                name={RouteStackList.PROFILE}
                component={ProfileScreen}
                options={{
                    headerTitle: "",
                    headerBackTitleVisible: false,
                    headerBackVisible: false,
                    headerStyle: { backgroundColor: "rgba(23, 23, 23, 1)" },
                }}
            />
            <Stack.Screen
                name={RouteStackList.BROWSE_MOVIES}
                component={BrowseMoviesScreen}
                options={{
                    headerTitle: "",
                    headerBackTitleVisible: false,
                    headerBackVisible: false,
                    headerStyle: { backgroundColor: "rgba(23, 23, 23, 1)" },
                }}
            />
        </Stack.Navigator>
    );
}
