import React from "react";
import { TextInput, type TextInputProps, View, Text } from "react-native";

import { styles } from "@themes/index";

import { ThemeOptions } from "@typings/constants";

type InputProps = React.PropsWithChildren & {
    testID?: string;
    title: string;
    isEditing?: boolean;
    theme?: ThemeOptions;
    hasError?: boolean;
};

function Input({
    testID = "components.input",
    children,
    title,
    isEditing = false,
    theme = "dark",
    hasError,
}: InputProps) {
    return (
        <View>
            <Text
                className={`${theme === "dark" ? "text-yellow-500" : "text-gray-900"} font-bold pl-2 mt-2 ${hasError ? "text-red-700" : ""}`}>
                {title}
            </Text>
            <View className='flex-row items-center'>
                <View
                    className={`w-full h-16 flex-row items-center my-2 p-2 pl-4 border ${theme === "dark" ? "  border-gray-700" : "border-gray-100"} rounded-lg ${theme === "dark" ? (!isEditing ? "bg-gray-700" : "bg-gray-950") : "bg-white"} ${hasError ? "border-red-700" : ""}`}
                    testID={testID}>
                    {children}
                </View>
            </View>
        </View>
    );
}

type FieldProps = TextInputProps & {
    isEditing?: boolean;
    testID?: string;
    theme?: ThemeOptions;
};

function Field({
    editable,
    testID = "components.input.input-field",
    theme = "dark",
    ...rest
}: FieldProps) {
    return (
        <View className='flex-1' testID={testID}>
            <TextInput
                className={`flex-1 ${theme === "dark" ? "text-white " : "text-gray-900"} justify-center text-lg pl-4 pb-2 ${!editable && "font-semibold text-gray-900"}`}
                placeholderTextColor='#b7b7b7'
                textAlignVertical='top'
                editable={editable}
                multiline={false}
                cursorColor={styles.background.backgroundColor}
                {...rest}
            />
        </View>
    );
}

Input.Field = Field;

export { Input };
