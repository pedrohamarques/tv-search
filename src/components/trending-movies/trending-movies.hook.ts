import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList, RouteStackList } from "@typings/route";

export function useTrendingMovies() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    function handleCardPress() {
        navigation.navigate(RouteStackList.MOVIE, { item: [] });
    }

    return {
        handleCardPress,
    };
}
