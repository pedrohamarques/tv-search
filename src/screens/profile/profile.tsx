import React, { useLayoutEffect } from "react";
import {
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { FontAwesome6 } from "@expo/vector-icons";
import { PencilIcon, CheckIcon } from "react-native-heroicons/outline";

import { styles } from "@themes/index";

import { Avatar } from "@components/avatar";
import { Input } from "@components/input";
import { CountriesDropDown } from "@components/countries-dropdown";
import { ConfirmButton } from "@components/confirm-button";

import { useProfileScreen } from "./profile.hook";

import { RootStackParamsList } from "@typings/route";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type ProfileScreenNavigationProps = {
    navigation: Pick<
        NativeStackNavigationProp<RootStackParamsList>,
        "setOptions"
    >;
};

export function ProfileScreen({ navigation }: ProfileScreenNavigationProps) {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    style={[
                        styles.background,
                        { padding: 1, borderRadius: 10 },
                    ]}
                    onPress={handleBackPress}>
                    <ChevronLeftIcon
                        size='24'
                        strokeWidth={2.5}
                        color='white'
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const {
        avatar,
        isEditing,
        country,
        handleBackPress,
        handlePickImage,
        handleEditingPress,
        setName,
        handleChooseCountry,
    } = useProfileScreen();
    return (
        <KeyboardAvoidingView
            className='flex-1 bg-neutral-800 justify-start item-center'
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={150}>
            <ScrollView className='px-2 overflow-visible'>
                <View className='w-full px-4 mt-6 mb-8'>
                    <Text className='text-white text-3xl font-bold'>
                        Profile
                    </Text>
                </View>
                <View className=' justify-center items-center mb-4'>
                    <Avatar onAvatarPress={handlePickImage} image={avatar} />
                </View>

                <View className='mt-4 px-4'>
                    <Input title='Name' isEditing={isEditing}>
                        <FontAwesome6
                            name='user-circle'
                            size={20}
                            color={styles.background.backgroundColor}
                        />
                        <Input.Field
                            placeholder='Insert your name'
                            keyboardType='default'
                            autoCorrect={false}
                            editable={isEditing}
                            onChangeText={setName}
                            isEditing={isEditing}
                        />
                        <TouchableOpacity
                            onPress={handleEditingPress}
                            style={{ paddingRight: 4 }}>
                            {!isEditing ? (
                                <PencilIcon
                                    size={20}
                                    strokeWidth={2.5}
                                    color={styles.background.backgroundColor}
                                />
                            ) : (
                                <CheckIcon
                                    size={20}
                                    stroke={styles.background.backgroundColor}
                                    strokeWidth={2.5}
                                    color={styles.background.backgroundColor}
                                />
                            )}
                        </TouchableOpacity>
                    </Input>
                    <Input title='E-mail'>
                        <FontAwesome6
                            name='envelope-open'
                            size={20}
                            color={styles.background.backgroundColor}
                        />
                        <Input.Field
                            placeholder='Insert your e-mail'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            autoCorrect={false}
                            editable={false}
                        />
                    </Input>

                    <CountriesDropDown
                        onItemPress={handleChooseCountry}
                        country={country}
                    />
                </View>

                <View className='w-full self-center mt-6 flex-row justify-center items-center'>
                    <ConfirmButton
                        onPress={() => console.log("here2")}
                        disabled={false}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
