import React, { useLayoutEffect } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

import { styles, theme } from "@themes/index";

import { MoviesList } from "@components/index";

import { usePersonScreen } from "./person.hook";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "@typings/route";

import { CastDetails } from "./components/cast-details";

type PersonScreenNavigationProps = {
    navigation: Pick<
        NativeStackNavigationProp<RootStackParamsList>,
        "setOptions"
    >;
};

export function PersonScreen({ navigation }: PersonScreenNavigationProps) {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    style={[
                        styles.background,
                        { padding: 1, borderRadius: 12 },
                    ]}
                    onPress={handleBackPress}>
                    <ChevronLeftIcon
                        size='28'
                        strokeWidth={2.5}
                        color='white'
                    />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={handleFavoritePress}>
                    <HeartIcon
                        size='35'
                        color={isFavorite ? theme.background : "white"}
                    />
                </TouchableOpacity>
            ),
        });
    });
    const { isFavorite, state, handleFavoritePress, handleBackPress } =
        usePersonScreen();
    return (
        <ScrollView
            className='flex-1 bg-neutral-900'
            contentContainerStyle={{ paddingBottom: 20 }}>
            <CastDetails
                cast={state.personDetails.data!}
                hasError={!!state.personDetails.error}
                isLoading={state.personDetails.isLoading}
                testID='screens.person.cast-details'
            />
            <MoviesList
                data={state.personMovies.data!}
                title='Movies'
                hideSeeAll
                testID='screens.person.movies-list'
                isLoading={state.personMovies.isLoading}
                hasError={!!state.personMovies.error}
            />
        </ScrollView>
    );
}
