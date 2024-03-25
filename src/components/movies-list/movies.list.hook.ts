import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamsList, RouteStackList } from "@typings/route";

export function useMoviesList() {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

    function handlePress() {
        navigation.navigate(RouteStackList.MOVIE);
    }

    return {
        handlePress,
    };
}
