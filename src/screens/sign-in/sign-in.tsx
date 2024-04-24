import React from "react";
import { Text, View } from "react-native";

import { useSignInScreen } from "./sign-in.hook";
import { PublicBackground } from "@components/public-background";

export function SignInScreen() {
    return (
        <PublicBackground testID='screens.sign-in.public-background'>
            <Text>SignIn Screen</Text>
        </PublicBackground>
    );
}
