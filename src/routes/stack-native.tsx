import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "@screens/home";

import { RouteStackList, type RootStackParamsList } from "@typings/route";

const Stack = createNativeStackNavigator<RootStackParamsList>();

export function RootNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={RouteStackList.HOME} component={Home} />
        </Stack.Navigator>
    );
}
