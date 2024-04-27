import React from "react";
import { View, Text, TouchableWithoutFeedback, Platform } from "react-native";
import { AtSymbolIcon } from "react-native-heroicons/solid";

import { Logo } from "@components/logo";
import { Button } from "@components/button";
import { PublicBackground } from "@components/public-background";

import { GoogleLogo } from "@assets/google-logo";
import { AppleLogo } from "@assets/apple-logo";

import { colors } from "@themes/index";

import { useWelcomeScreen } from "./welcome.hook";

function EmailIcon() {
    return <AtSymbolIcon color={colors.primary} />;
}

export function WelcomeScreen() {
    const isIos = Platform.OS === "ios";

    const { handleSignInPress, handleSignUpPress } = useWelcomeScreen();
    return (
        <PublicBackground testID='screens.welcome.public-background'>
            <View className='h-1/2 my-10 justify-center'>
                <Logo testID='screens.welcome.logo' />
            </View>
            <View className='h-1/2 justify-center gap-4'>
                <Button
                    title='Sign up with Google'
                    Logo={GoogleLogo}
                    testID='screens.welcome.button-google'
                />
                {isIos && (
                    <Button
                        title='Sign up with Apple'
                        Logo={AppleLogo}
                        testID='screens.welcome.button-apple'
                    />
                )}
                <Button
                    title='Sign up with e-mail'
                    Logo={EmailIcon}
                    testID='screens.welcome.button-email'
                    onPress={handleSignUpPress}
                />

                <TouchableWithoutFeedback
                    onPress={handleSignInPress}
                    className='opacity-0'>
                    <Text className='font-semibold underline my-10'>
                        Already has an account? Sign In!
                    </Text>
                </TouchableWithoutFeedback>
            </View>
        </PublicBackground>
    );
}
