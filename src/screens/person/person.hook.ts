import { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamsList, RouteStackList } from "@typings/route";
import { useRequests } from "@services/use-request";
import { CastDetails, CastMovies } from "@typings/data";

export function usePersonScreen() {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [personMovies, setPersonMovies] = useState<CastMovies[]>([]);
    const [personDetails, setPersonDetails] = useState<CastDetails | null>(
        null,
    );

    const { fetchPersonDetails, fetchPersonMovies } = useRequests();

    const route =
        useRoute<RouteProp<RootStackParamsList, RouteStackList.PERSON>>();

    const cast = route.params.cast;

    const navigation =
        useNavigation<
            NativeStackNavigationProp<
                RootStackParamsList,
                RouteStackList.PERSON
            >
        >();

    function handleFavoritePress() {
        setIsFavorite(currentState => !currentState);
    }

    function handleBackPress() {
        navigation.goBack();
    }

    const getCastDetails = async () => {
        const data = await fetchPersonDetails(cast!.id);
        if (data) {
            setPersonDetails(data);
        }
    };

    const getCastMovies = async () => {
        const data = await fetchPersonMovies(cast!.id);
        if (data && data.cast) {
            setPersonMovies(data.cast);
        }
    };

    useEffect(() => {
        getCastDetails();
        getCastMovies();
        setIsLoading(false);
    }, []);

    return {
        handleFavoritePress,
        handleBackPress,
        isFavorite,
        isLoading,
        personMovies,
        personDetails,
    };
}
