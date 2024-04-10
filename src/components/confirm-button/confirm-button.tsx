import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import type { TouchableOpacityProps } from "react-native";

type ConfirmButtonProps = TouchableOpacityProps & {
    testID?: string;
};

export function ConfirmButton({
    testID = "components.confirm-button",
    disabled,
    ...rest
}: ConfirmButtonProps) {
    return (
        <TouchableOpacity
            {...rest}
            testID={testID}
            disabled={disabled}
            activeOpacity={disabled ? 1 : 0.7}>
            <View
                className={`flex-1 flex-row justify-center w-full rounded-lg ${disabled ? "bg-gray-700" : "bg-yellow-500 "}`}>
                <Text className='text-white font-bold py-4 text-xl'>
                    Update Profile
                </Text>
            </View>
        </TouchableOpacity>
    );
}
