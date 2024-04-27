import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";

import { PublicBackground } from "@components/public-background";
import { Input } from "@components/input";
import { ConfirmButton } from "@components/confirm-button";

import { colors } from "@themes/index";
import { useSignInScreen } from "./sign-in.hook";

export function SignInScreen() {
    const {
        handlePasswordVisibility,
        handleCancelPress,
        handleLogin,
        setEmail,
        setPassword,
        isVisible,
        error,
    } = useSignInScreen();
    return (
        <PublicBackground testID='screens.sign-in.public-background'>
            <KeyboardAvoidingView
                className='flex-1'
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView
                    className='mx-10 overflow-visible'
                    contentContainerStyle={{
                        justifyContent: "flex-end",
                        flex: 1,
                    }}>
                    <View className='flex-1 justify-end items-center'>
                        <Input title='E-mail' theme='light' hasError={!!error}>
                            <Input.Field
                                keyboardType='email-address'
                                returnKeyType='next'
                                placeholder='example@email.com'
                                onChangeText={setEmail}
                                autoCapitalize='none'
                                autoCorrect={false}
                                theme='light'
                            />
                        </Input>
                        <View>
                            <Input
                                title='Password'
                                theme='light'
                                hasError={!!error}>
                                <Input.Field
                                    secureTextEntry={!isVisible}
                                    onChangeText={setPassword}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    theme='light'
                                />
                                <TouchableOpacity
                                    onPress={handlePasswordVisibility}
                                    testID='screens.sign-in.visibility-button'>
                                    {!isVisible ? (
                                        <EyeIcon
                                            color={colors.primary}
                                            strokeWidth={2.5}
                                        />
                                    ) : (
                                        <EyeSlashIcon
                                            color={colors.primary}
                                            strokeWidth={2.5}
                                        />
                                    )}
                                </TouchableOpacity>
                            </Input>
                            {error && (
                                <Text
                                    className='text-red-700 mb-4 font-semibold'
                                    testID='screens.sign-in.error-text'>
                                    {error.message}
                                </Text>
                            )}
                            <TouchableOpacity onPress={() => {}}>
                                <Text className='font-semibold underline'>
                                    Forgot Password?
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className='mx-10 h-14 flex-row justify-center items-center mt-10 mb-20 gap-6'>
                        <ConfirmButton
                            title='Cancel'
                            theme='light'
                            onPress={handleCancelPress}
                            testID='screens.sign-in.cancel-button'
                        />
                        <ConfirmButton
                            title='Login'
                            onPress={handleLogin}
                            testID='screens.sign-in.login-button'
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </PublicBackground>
    );
}
