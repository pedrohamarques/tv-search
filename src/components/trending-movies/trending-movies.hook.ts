import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamsList, RouteStackList } from "@typings/route";

export function useTrendingMovies() {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

    function handleCardPress() {
        navigation.navigate(RouteStackList.MOVIE);
    }

    return {
        handleCardPress,
    };
}
