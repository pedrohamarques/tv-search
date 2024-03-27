import React from "react";
import { Dimensions, View } from "react-native";
import * as Progress from "react-native-progress";

import { theme } from "@themes/index";

const { width, height } = Dimensions.get("window");

type LoadingProps = {
    testID?: string;
};

export function Loading({ testID = "components.loading" }: LoadingProps) {
    return (
        <View
            testID={testID}
            style={{ height, width }}
            className='absolute flex-row justify-center items-center'>
            <Progress.CircleSnail
                thickness={12}
                size={160}
                color={theme.background}
                testID='components.loading.circle-snail'
            />
        </View>
    );
}
