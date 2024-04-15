import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { CameraIcon } from "react-native-heroicons/outline";

type AvatarProps = {
    onAvatarPress: () => void;
    image: string | null;
    testID?: string;
};

export function Avatar({
    onAvatarPress,
    image = "",
    testID = "components.avatar",
}: AvatarProps) {
    return (
        <>
            <View
                className='flex-row bg-black w-60 h-60 rounded-full absolute z-1'
                testID={testID}
            />
            <TouchableOpacity activeOpacity={0.7} onPress={onAvatarPress}>
                {!image ? (
                    <View className='flex-row bg-gray-400 w-56 h-56 rounded-full z-20 justify-center items-center'>
                        <CameraIcon
                            strokeWidth={2.5}
                            color='white'
                            size={40}
                            testID='components.avatar.camera-icon'
                        />
                    </View>
                ) : (
                    <Image
                        source={{ uri: image }}
                        className='h-56 w-56 rounded-full z-20'
                        testID='components.avatar.image'
                    />
                )}
            </TouchableOpacity>
        </>
    );
}
