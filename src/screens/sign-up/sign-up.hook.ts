import { useReducer, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { z } from "zod";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PublicStackParamsList } from "@typings/route";

import { ErrorState, PathActionKind, errorSignUpReducer } from "./reducer";
import { supabase } from "@services/supabase";
import Toast from "react-native-toast-message";
import { useAppDispatch } from "@stores/hooks";
import { login } from "@stores/authenticationSlice";

const initialErrorState: ErrorState = {
    confirmPassword: {
        error: [],
        hasError: false,
    },
    email: {
        error: [],
        hasError: false,
    },
    password: {
        error: [],
        hasError: false,
    },
};

export function useSignUpScreen() {
    const navigation =
        useNavigation<NativeStackNavigationProp<PublicStackParamsList>>();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
        useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");

    const reduxDispatch = useAppDispatch();

    const [state, dispatch] = useReducer(errorSignUpReducer, initialErrorState);

    const signUpSchema = z
        .object({
            email: z.string().email().trim(),
            password: z.string().min(8).trim(),
            confirmPassword: z.string(),
        })
        .superRefine(({ password, confirmPassword }, ctx) => {
            if (confirmPassword !== password) {
                ctx.addIssue({
                    code: "custom",
                    message: "The passwords did not match",
                    path: ["password", "confirmPassword"],
                });
            }
        });

    function handleCancelPress() {
        navigation.goBack();
    }

    function handlePasswordVisibility() {
        setIsPasswordVisible(visibility => !visibility);
    }

    function handleConfirmPasswordVisibility() {
        setIsConfirmPasswordVisible(visibility => !visibility);
    }

    async function handleSignUpPress() {
        const validation = signUpSchema.safeParse({
            email,
            password,
            confirmPassword,
        });
        if (!validation.success) {
            dispatch({ type: PathActionKind.CLEAR_ERRORS });
            const messageErrors: string[] = JSON.parse(
                validation.error.message,
                //@ts-expect-error too lazy to type it
            ).map(error => error.message);
            for (let i = 0; i < messageErrors.length; i++) {
                if (messageErrors[i] === "Invalid email") {
                    dispatch({ type: PathActionKind.INVALID_EMAIL });
                } else if (
                    messageErrors[i] ===
                    "String must contain at least 8 character(s)"
                ) {
                    dispatch({ type: PathActionKind.SMALL_PASSWORD });
                } else if (messageErrors[i] === "The passwords did not match") {
                    dispatch({ type: PathActionKind.PASSWORDS_DONT_MATCH });
                }
            }
        } else {
            const { error, data } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error?.message) {
                Toast.show({
                    text1: "There was some error when signing up",
                    text2: "Please try again later",
                    onPress: () => Toast.hide(),
                });
            } else if (data.session) {
                reduxDispatch(
                    login({ email, password, isAuthenticated: true }),
                );
            }
        }
    }

    return {
        handleCancelPress,
        handlePasswordVisibility,
        handleConfirmPasswordVisibility,
        isConfirmPasswordVisible,
        isPasswordVisible,
        setEmail,
        setPassword,
        setConfirmPassword,
        handleSignUpPress,
        state,
    };
}
