import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "@screens/home";

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
        </Stack.Navigator>
    );
}
