import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "@screens/home";
import FavoriteMoviesScreen from "@screens/favorite-movies";

import { RootDrawerParamsList, RouteDrawerList } from "@typings/route";
import { HomeIcon, StarIcon, UserIcon } from "react-native-heroicons/solid";
import { FavoriteCastScreen } from "@screens/favorite-cast";

const Drawer = createDrawerNavigator<RootDrawerParamsList>();

export function DrawerContainer() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "rgba(38, 38, 38, 1)" },
                drawerStyle: { backgroundColor: "rgba(38, 38, 38, 1)" },
                drawerInactiveTintColor: "white",
                drawerActiveTintColor: "lightgray",
            }}>
            <Drawer.Screen
                name={RouteDrawerList.HOME}
                component={HomeScreen}
                options={{
                    drawerLabel: "Home",
                    headerTintColor: "white",
                    headerShadowVisible: false,
                    drawerIcon: ({ color, focused }) => (
                        <HomeIcon
                            size={20}
                            color={focused ? "yellow" : color}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name={RouteDrawerList.FAVORITE_MOVIES}
                component={FavoriteMoviesScreen}
                options={{
                    headerTitle: "",
                    headerTintColor: "white",
                    drawerLabel: "Favorite Movies",
                    headerShadowVisible: false,
                    drawerIcon: ({ color, focused }) => (
                        <StarIcon
                            size={20}
                            color={focused ? "yellow" : color}
                        />
                    ),
                }}
            />

            <Drawer.Screen
                name={RouteDrawerList.FAVORITE_CAST}
                component={FavoriteCastScreen}
                options={{
                    headerTitle: "",
                    headerTintColor: "white",
                    drawerLabel: "Favorite Cast",
                    headerShadowVisible: false,
                    drawerIcon: ({ color, focused }) => (
                        <UserIcon
                            size={20}
                            color={focused ? "yellow" : color}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}
