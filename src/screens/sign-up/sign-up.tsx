import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline";

import { ConfirmButton } from "@components/confirm-button";
import { Input } from "@components/input";
import { PublicBackground } from "@components/public-background";

import { colors } from "@themes/index";

import { useSignUpScreen } from "./sign-up.hook";

export function SignUpScreen() {
    const {
        handleCancelPress,
        handlePasswordVisibility,
        setConfirmPassword,
        setEmail,
        setPassword,
        handleSignUpPress,
        isPasswordVisible,
        isConfirmPasswordVisible,
        handleConfirmPasswordVisibility,
        state,
    } = useSignUpScreen();
    return (
        <PublicBackground testID='screens.sign-up.public-background'>
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
                        <Input
                            title='E-mail'
                            theme='light'
                            hasError={state.email.hasError}>
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
                        {state.email.error.map((error, index) => (
                            <Text
                                testID={`screens.sign-up.e-mail-error-${index}`}
                                key={index}
                                className='self-start font-semibold color-red-700 items-start mb-4'>
                                {error}
                            </Text>
                        ))}
                        <View>
                            <Input
                                title='Password'
                                theme='light'
                                hasError={state.password.hasError}>
                                <Input.Field
                                    secureTextEntry={!isPasswordVisible}
                                    onChangeText={setPassword}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    theme='light'
                                />
                                <TouchableOpacity
                                    onPress={handlePasswordVisibility}
                                    testID='screens.sign-up.password-toggle'>
                                    {!isPasswordVisible ? (
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
                            {state.password.error.map((error, index) => (
                                <Text
                                    testID={`screens.sign-up.password-error-${index}`}
                                    key={index}
                                    className='self-start font-semibold color-red-700 items-start mb-4'>
                                    {error}
                                </Text>
                            ))}
                            <Input
                                title='Confirm Password'
                                theme='light'
                                hasError={state.confirmPassword.hasError}>
                                <Input.Field
                                    secureTextEntry={!isConfirmPasswordVisible}
                                    onChangeText={setConfirmPassword}
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    theme='light'
                                />
                                <TouchableOpacity
                                    onPress={handleConfirmPasswordVisibility}
                                    testID='screens.sign-up.confirm-password-toggle'>
                                    {!isConfirmPasswordVisible ? (
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

                            {state.confirmPassword.error.map((error, index) => (
                                <Text
                                    testID={`screens.sign-up.confirm-password-error-${index}`}
                                    key={index}
                                    className='self-start font-semibold color-red-700 items-start mb-4'>
                                    {error}
                                </Text>
                            ))}
                        </View>
                    </View>
                    <View className='mx-10 h-14 flex-row justify-center items-center mt-10 mb-20 gap-6'>
                        <ConfirmButton
                            title='Cancel'
                            theme='light'
                            onPress={handleCancelPress}
                            testID='screens.sign-up.cancel-button'
                        />
                        <ConfirmButton
                            title='Sign up'
                            onPress={handleSignUpPress}
                            testID='screens.sign-up.sign-up-button'
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </PublicBackground>
    );
}
