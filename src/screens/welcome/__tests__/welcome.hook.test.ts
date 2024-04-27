import { act, renderHook } from "@testing-library/react-native";
import { useWelcomeScreen } from "../welcome.hook";
import { PublicStackList } from "@typings/route";

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        navigate: mockNavigate,
    }),
}));

describe("screens/welcome/useWelcomeScreen", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("navigates to SignIn screen when handleSignInPress is called", () => {
        const { result } = renderHook(() => useWelcomeScreen());

        act(() => result.current.handleSignInPress());

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith(PublicStackList.SIGN_IN);
    });

    it("navigates to SignUp screen when handleSignUpPress is called", () => {
        const { result } = renderHook(() => useWelcomeScreen());

        act(() => result.current.handleSignUpPress());

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith(PublicStackList.SIGN_UP);
    });
});
