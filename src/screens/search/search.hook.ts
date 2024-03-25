import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList, RouteStackList } from "@typings/route";
import { useState } from "react";

export function useSearchScreen() {
    const [isLoading, setIsloading] = useState(false);

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    function handleClosePress() {
        navigation.navigate(RouteStackList.HOME);
    }

    function handleItemPress() {
        navigation.push(RouteStackList.MOVIE, { item: [] });
    }

    return {
        handleClosePress,
        handleItemPress,
        isLoading,
    };
}
