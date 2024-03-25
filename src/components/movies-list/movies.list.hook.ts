import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList, RouteStackList } from "@typings/route";

export function useMoviesList() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    function handlePress() {
        navigation.push(RouteStackList.MOVIE, { item: [] });
    }

    return {
        handlePress,
    };
}
