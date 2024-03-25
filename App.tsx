import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { RootNavigation } from "@routes/stack-native";

import "./global.css";

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <RootNavigation />
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}
