import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import type { TouchableOpacityProps } from "react-native";
import { SvgProps } from "react-native-svg";

type ButtonProps = TouchableOpacityProps & {
    title: string;
    Logo?: ({ width, height }: SvgProps) => JSX.Element;
    testID?: string;
};

export function Button({
    title,
    Logo,
    testID = "components.button",
    ...rest
}: ButtonProps) {
    return (
        <TouchableOpacity {...rest} className='opacity-5' testID={testID}>
            <View className='bg-white flex-row justify-between items-center p-4 rounded-md shadow-sm gap-4'>
                <Text className='font-semibold text-md'>{title}</Text>
                {Logo && (
                    <Logo
                        width={24}
                        height={24}
                        testID='components.button.logo'
                    />
                )}
            </View>
        </TouchableOpacity>
    );
}
