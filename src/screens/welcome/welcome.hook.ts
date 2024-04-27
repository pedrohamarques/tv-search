import { useNavigation } from "@react-navigation/native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PublicStackList, PublicStackParamsList } from "@typings/route";

export function useWelcomeScreen() {
    const navigation =
        useNavigation<NativeStackNavigationProp<PublicStackParamsList>>();

    function handleSignInPress() {
        navigation.navigate(PublicStackList.SIGN_IN);
    }

    function handleSignUpPress() {
        navigation.navigate(PublicStackList.SIGN_UP);
    }
    return {
        handleSignInPress,
        handleSignUpPress,
    };
}
