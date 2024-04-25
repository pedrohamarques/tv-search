import { ThemeOptions } from "@typings/constants";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import type { TouchableOpacityProps } from "react-native";

type ConfirmButtonProps = TouchableOpacityProps & {
    testID?: string;
    title: string;
    theme?: ThemeOptions;
};

export function ConfirmButton({
    testID = "components.confirm-button",
    disabled,
    title,
    theme = "dark",
    ...rest
}: ConfirmButtonProps) {
    return (
        <TouchableOpacity
            {...rest}
            testID={testID}
            disabled={disabled}
            activeOpacity={disabled ? 1 : 0.7}>
            <View
                className={`flex-1 flex-row justify-center w-full items-center rounded-lg ${theme === "dark" ? (disabled ? "bg-gray-700" : "bg-yellow-500 ") : "bg-white"}`}>
                <Text
                    className={`${theme === "dark" ? "text-white font-bold" : "text-gray-900"}  py-4 text-xl`}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
