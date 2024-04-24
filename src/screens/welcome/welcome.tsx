import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
    ImageBackground,
    View,
    StyleSheet,
    StatusBar,
    Text,
    TouchableWithoutFeedback,
    Platform,
} from "react-native";
import { AtSymbolIcon } from "react-native-heroicons/solid";

import { Logo } from "@components/logo";
import { Button } from "@components/button";

import { GoogleLogo } from "@assets/google-logo";
import { AppleLogo } from "@assets/apple-logo";

import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@themes/index";

function EmailIcon() {
    return <AtSymbolIcon color={colors.primary} />;
}

export function WelcomeScreen() {
    const isIos = Platform.OS === "ios";
    return (
        <>
            <StatusBar barStyle={"light-content"} />
            <LinearGradient
                style={{ flex: 1 }}
                colors={["rgba(38, 38, 38, 1)", "#fff"]}>
                <ImageBackground
                    source={require("@assets/welcome-background.jpeg")}
                    resizeMode='cover'
                    imageStyle={styles.backgroundImage}
                    className='flex-1 justify-center'
                    testID='screens.welcome.image-background'>
                    <SafeAreaView style={styles.rootContainer}>
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
                            />

                            <TouchableWithoutFeedback
                                onPress={() => {}}
                                className='opacity-0'>
                                <Text className='font-semibold underline underline-offset-2 my-10'>
                                    Already has an account? Sign In!
                                </Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        opacity: 0.25,
    },
    rootContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
});
