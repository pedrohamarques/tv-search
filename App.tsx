import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { RootNavigation } from "@routes/stack-native";

import "./global.css";

export default function App() {
    return (
        <NavigationContainer>
            <RootNavigation />
        </NavigationContainer>
    );
}
