import React from "react";
import { Text } from "react-native";

import { colors } from "@themes/index";

type LogoProps = {
    testID?: string;
};

export function Logo({ testID = "components.logo" }: LogoProps) {
    return (
        <Text className='text-white text-7xl font-bold' testID={testID}>
            <Text style={{ color: colors.primary }}>T</Text>V{" "}
            <Text style={{ color: colors.primary }}>S</Text>
            earch
        </Text>
    );
}
