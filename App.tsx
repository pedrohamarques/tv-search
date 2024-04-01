import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";

import { setupStore } from "@stores/store";

import { toastConfig } from "@components/toast";

import { RootNavigation } from "@routes/stack-native";

import "./global.css";

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={setupStore()}>
                <NavigationContainer>
                    <RootNavigation />
                    <Toast config={toastConfig} />
                </NavigationContainer>
            </Provider>
        </GestureHandlerRootView>
    );
}
