import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { supabase } from "@services/supabase";

import { useAppDispatch } from "@stores/hooks";
import { login } from "@stores/authenticationSlice";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PublicStackParamsList } from "@typings/route";
import type { AuthError } from "@supabase/supabase-js";

export function useSignInScreen() {
    const navigation =
        useNavigation<NativeStackNavigationProp<PublicStackParamsList>>();

    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<AuthError | null>(null);

    const dispatch = useAppDispatch();

    function handlePasswordVisibility() {
        setIsVisible(visibility => !visibility);
    }

    function handleCancelPress() {
        navigation.goBack();
    }

    async function handleLogin() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        console.log(
            error?.code,
            error?.message,
            error?.name,
            error?.status,
            "error",
        );

        if (data.session) {
            dispatch(login({ email, password, isAuthenticated: true }));
        }
        if (error) {
            setError(error);
        }
    }

    return {
        handlePasswordVisibility,
        handleCancelPress,
        handleLogin,
        isVisible,
        setEmail,
        setPassword,
        error,
    };
}
