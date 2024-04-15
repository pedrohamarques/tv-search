import { styles } from "@themes/index";
import React from "react";
import { TextInput, type TextInputProps, View, Text } from "react-native";

type InputProps = React.PropsWithChildren & {
    testID?: string;
    title: string;
    isEditing?: boolean;
};

function Input({
    testID = "components.input",
    children,
    title,
    isEditing = false,
}: InputProps) {
    return (
        <View>
            <Text className='text-yellow-500 font-bold pl-2 mt-2'>{title}</Text>
            <View className='flex-row items-center'>
                <View
                    className={`w-full h-16 flex-row items-center my-2 p-2 pl-4 border border-gray-700 rounded-lg ${!isEditing ? "bg-gray-700" : "bg-gray-950"}`}
                    testID={testID}>
                    {children}
                </View>
            </View>
        </View>
    );
}

type FieldProps = TextInputProps & {
    isEditing?: boolean;
};

function Field({ editable, ...rest }: FieldProps) {
    return (
        <View className='flex-1'>
            <TextInput
                className={`flex-1 text-white justify-center text-lg pl-4 pb-2 ${!editable && "font-bold text-gray-900"}`}
                placeholderTextColor='gray'
                textAlignVertical='top'
                editable={editable}
                multiline={false}
                cursorColor={styles.background.backgroundColor}
                {...rest}
            />
        </View>
    );
}

Input.Field = Field;

export { Input };
