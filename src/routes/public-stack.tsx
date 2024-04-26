import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "@screens/welcome";
import SignUpScreen from "@screens/sign-up";
import SignInScreen from "@screens/sign-in";

import { PublicStackList, type PublicStackParamsList } from "@typings/route";

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
            <Stack.Screen
                name={PublicStackList.SIGN_UP}
                component={SignUpScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
