import { useEffect, useState } from "react";
import {
    CompositeNavigationProp,
    RouteProp,
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import Toast from "react-native-toast-message";

import { useRequests } from "@services/use-request";

import { useAppDispatch, useAppSelector } from "@stores/hooks";
import {
    favoritesSelector,
    addFavoriteCast,
    removeFavoriteCast,
} from "@stores/favoritesSlice";

import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    type RootStackParamsList,
    RouteStackList,
    RouteDrawerList,
    RootDrawerParamsList,
} from "@typings/route";
import type { CastDetails, CastMovies } from "@typings/data";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type ManagePersonScreenNavigationProps = CompositeNavigationProp<
    DrawerNavigationProp<RootDrawerParamsList, RouteDrawerList.FAVORITE_CAST>,
    NativeStackNavigationProp<RootStackParamsList>
>;

export function usePersonScreen() {
    const route =
        useRoute<RouteProp<RootStackParamsList, RouteStackList.PERSON>>();

    const { castId } = route.params;

    const { cast } = useAppSelector(favoritesSelector);
    const dispatch = useAppDispatch();

    const favoriteCastIds = cast.map(item => item.id);
    const isFavoriteCast = favoriteCastIds.includes(castId);

    const [isFavorite, setIsFavorite] = useState(isFavoriteCast);
    const [isLoading, setIsLoading] = useState(true);
    const [personMovies, setPersonMovies] = useState<CastMovies[]>([]);
    const [personDetails, setPersonDetails] = useState<CastDetails | null>(
        null,
    );

    const { fetchPersonDetails, fetchPersonMovies } = useRequests();

    const navigation = useNavigation<ManagePersonScreenNavigationProps>();

    function handleToastPress() {
        navigation.navigate(RouteDrawerList.FAVORITE_CAST);
        Toast.hide();
    }

    function handleFavoritePress() {
        if (personDetails) {
            if (!isFavorite) {
                dispatch(
                    addFavoriteCast({
                        id: personDetails.id,
                        imagePath: personDetails.profile_path,
                        name: personDetails.name,
                    }),
                );
                Toast.show({
                    type: "success",
                    text1: "Cast added to favorites",
                    text2: "Press here to see all",
                    onPress: handleToastPress,
                }),
                    setIsFavorite(true);
            } else {
                dispatch(
                    removeFavoriteCast({
                        id: personDetails.id,
                        imagePath: personDetails.profile_path,
                        name: personDetails.name,
                    }),
                );
                Toast.show({
                    type: "success",
                    text1: "Cast removed from favorites",
                    text2: "Press here to see all",
                    onPress: handleToastPress,
                });
                setIsFavorite(false);
            }
        }
    }

    function handleBackPress() {
        navigation.goBack();
    }

    const getCastDetails = async () => {
        const data = await fetchPersonDetails(castId);
        if (data) {
            setPersonDetails(data);
        }
    };

    const getCastMovies = async () => {
        const data = await fetchPersonMovies(castId);
        if (data && data.cast) {
            setPersonMovies(data.cast);
        }
    };

    useEffect(() => {
        getCastDetails();
        getCastMovies();
        setIsLoading(false);
    }, [castId]);

    return {
        handleFavoritePress,
        handleBackPress,
        isFavorite,
        isLoading,
        personMovies,
        personDetails,
    };
}
