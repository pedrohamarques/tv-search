import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "@stores/store";

import { toastConfig } from "@components/toast";

import { RootNavigation } from "@routes/stack-native";
import { PublicRoutes } from "@routes/public-stack";

import "./global.css";

export default function App() {
    const isAuthenticated = false;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style='light' />
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <NavigationContainer>
                        {!isAuthenticated ? (
                            <PublicRoutes />
                        ) : (
                            <RootNavigation />
                        )}
                        <Toast config={toastConfig} />
                    </NavigationContainer>
                </PersistGate>
            </Provider>
        </GestureHandlerRootView>
    );
}
