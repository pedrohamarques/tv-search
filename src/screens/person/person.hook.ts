import { useEffect, useReducer, useState } from "react";
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
import { DrawerNavigationProp } from "@react-navigation/drawer";
import {
    FetchActionKind,
    fetchCastScreenReducer,
    type FetchState,
} from "./reducer";

type ManagePersonScreenNavigationProps = CompositeNavigationProp<
    DrawerNavigationProp<RootDrawerParamsList, RouteDrawerList.FAVORITE_CAST>,
    NativeStackNavigationProp<RootStackParamsList>
>;

const screenState: FetchState = {
    personDetails: {
        data: null,
        error: "",
        isLoading: false,
    },
    personMovies: {
        data: [],
        error: "",
        isLoading: false,
    },
};

export function usePersonScreen() {
    const route =
        useRoute<RouteProp<RootStackParamsList, RouteStackList.PERSON>>();

    const { castId } = route.params;

    const { cast } = useAppSelector(favoritesSelector);
    const dispatch = useAppDispatch();

    const favoriteCastIds = cast.map(item => item.id);
    const isFavoriteCast = favoriteCastIds.includes(castId);

    const [isFavorite, setIsFavorite] = useState(isFavoriteCast);

    const { fetchPersonDetails, fetchPersonMovies } = useRequests();

    const navigation = useNavigation<ManagePersonScreenNavigationProps>();

    const [state, reducerDispatch] = useReducer(
        fetchCastScreenReducer,
        screenState,
    );

    function handleToastPress() {
        navigation.navigate(RouteDrawerList.FAVORITE_CAST);
        Toast.hide();
    }

    function handleFavoritePress() {
        const { data } = state.personDetails;
        if (data) {
            if (!isFavorite) {
                dispatch(
                    addFavoriteCast({
                        id: data.id,
                        imagePath: data.profile_path!,
                        name: data.name,
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
                        id: data.id,
                        imagePath: data.profile_path!,
                        name: data.name,
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
        reducerDispatch({ type: FetchActionKind.REQUEST_PERSON_DETAILS });
        const data = await fetchPersonDetails(castId);
        if (data) {
            reducerDispatch({
                type: FetchActionKind.RESOLVE_PERSON_DETAILS,
                payload: data,
            });
        } else {
            reducerDispatch({ type: FetchActionKind.ERROR_PERSON_DETAILS });
        }
    };

    const getCastMovies = async () => {
        reducerDispatch({ type: FetchActionKind.REQUEST_PERSON_MOVIES });
        const data = await fetchPersonMovies(castId);
        if (data && data.cast) {
            reducerDispatch({
                type: FetchActionKind.RESOLVE_PERSON_MOVIES,
                payload: data.cast,
            });
        } else {
            reducerDispatch({ type: FetchActionKind.ERROR_PERSON_MOVIES });
        }
    };

    useEffect(() => {
        getCastDetails();
        getCastMovies();
    }, [castId]);

    return {
        handleFavoritePress,
        handleBackPress,
        isFavorite,
        state,
    };
}
