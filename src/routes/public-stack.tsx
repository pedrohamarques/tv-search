import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "@screens/welcome";

import { PublicStackList, type PublicStackParamsList } from "@typings/route";
import SignInScreen from "@screens/sign-in";

const Stack = createNativeStackNavigator<PublicStackParamsList>();

export function PublicRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={PublicStackList.WELCOME}
                component={WelcomeScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={PublicStackList.SIGN_IN}
                component={SignInScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
