import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { favoritesSelector } from "@stores/favoritesSlice";

import { useAppSelector } from "@stores/hooks";

import type { FavoriteCastState } from "@stores/types";
import { type RootStackParamsList, RouteStackList } from "@typings/route";

export function useFavoriteCastScreen() {
    const { cast } = useAppSelector(favoritesSelector);

    const navigation =
        useNavigation<
            NativeStackNavigationProp<
                RootStackParamsList,
                RouteStackList.PERSON
            >
        >();

    function handleCastPress({ id }: FavoriteCastState) {
        navigation.navigate(RouteStackList.PERSON, { castId: id });
    }
    return {
        cast,
        handleCastPress,
    };
}
