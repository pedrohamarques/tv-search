import React from "react";
import { ImageBackground, StatusBar, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

type PublicBackgroundProps = React.PropsWithChildren & {
    testID?: string;
};

export function PublicBackground({
    testID = "components.public-background",
    children,
}: PublicBackgroundProps) {
    return (
        <View testID={testID}>
            <StatusBar barStyle={"light-content"} />
            <LinearGradient
                style={{ flex: 1 }}
                colors={["rgba(38, 38, 38, 1)", "#fff"]}
                testID='components.public-background.linear-gradient'>
                <ImageBackground
                    source={require("@assets/welcome-background.jpeg")}
                    resizeMode='cover'
                    imageStyle={styles.backgroundImage}
                    className='flex-1 justify-center'
                    testID='components.public-background.image-background'>
                    <SafeAreaView style={styles.rootContainer}>
                        {children}
                    </SafeAreaView>
                </ImageBackground>
            </LinearGradient>
        </View>
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
