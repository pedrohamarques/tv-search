import React from "react";
import { View } from "react-native";
import * as Progress from "react-native-progress";

import { theme } from "@themes/index";

type LoadingProps = {
    testID?: string;
    size?: number;
};

export function Loading({
    testID = "components.loading",
    size = 160,
}: LoadingProps) {
    return (
        <View
            testID={testID}
            className='flex-row justify-center items-center mt-10'>
            <Progress.CircleSnail
                thickness={12}
                size={size}
                color={theme.background}
                testID='components.loading.circle-snail'
            />
        </View>
    );
}
