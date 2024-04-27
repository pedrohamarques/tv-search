import { act, renderHook, waitFor } from "@testing-library/react-native";
import Toast from "react-native-toast-message";

import { supabase } from "@services/supabase";

import { useSignUpScreen } from "../sign-up.hook";
import { AuthError } from "@supabase/supabase-js";

const mockGoBack = jest.fn();

jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        goBack: mockGoBack,
    }),
}));

const mockUseSelector = jest.fn();
const mockUseDispatch = jest.fn();

jest.mock("react-redux", () => ({
    useSelector: (callback: () => void) => mockUseSelector(callback),
    useDispatch: () => () => mockUseDispatch(),
}));

const supabaseSpyOn = jest.spyOn(supabase.auth, "signUp");

const toastSpy = jest.spyOn(Toast, "show");

describe("screens/sign-up/useSignUpScreen", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        supabaseSpyOn.mockResolvedValue({
            //@ts-expect-error too lazy to mock the answer
            data: { user: "1", session: { user: "1" } },
            error: null,
        });
    });

    it("navigates to previous screen when handleCancelPress is called", () => {
        const { result } = renderHook(() => useSignUpScreen());

        act(() => result.current.handleCancelPress());

        expect(mockGoBack).toHaveBeenCalledTimes(1);
    });

    it("toggles isPasswordVisible when handlePasswordVisibility is called", () => {
        const { result } = renderHook(() => useSignUpScreen());

        expect(result.current.isPasswordVisible).toBe(false);

        act(() => result.current.handlePasswordVisibility());

        expect(result.current.isPasswordVisible).toBe(true);

        act(() => result.current.handlePasswordVisibility());

        expect(result.current.isPasswordVisible).toBe(false);
    });

    it("toggles isConfirmPasswordVisible when handleConfirmPasswordVisibility is called", () => {
        const { result } = renderHook(() => useSignUpScreen());

        expect(result.current.isConfirmPasswordVisible).toBe(false);

        act(() => result.current.handleConfirmPasswordVisibility());

        expect(result.current.isConfirmPasswordVisible).toBe(true);

        act(() => result.current.handleConfirmPasswordVisibility());

        expect(result.current.isConfirmPasswordVisible).toBe(false);
    });

    it("shows a toast when all the credentials are valid but there was some error when signing up", async () => {
        supabaseSpyOn.mockResolvedValueOnce({
            error: {
                code: undefined,
                message: "Invalid login credentials",
                name: "AuthApiError",
                status: 400,
            } as AuthError,
            data: {
                session: null,
                user: null,
            },
        });

        const { result } = renderHook(() => useSignUpScreen());

        act(() => result.current.setEmail("test@email.com"));
        act(() => result.current.setPassword("12345678"));
        act(() => result.current.setConfirmPassword("12345678"));

        await act(() => result.current.handleSignUpPress());

        waitFor(() => expect(toastSpy).toHaveBeenCalledTimes(1));
        expect(toastSpy).toHaveBeenCalledWith({
            text1: "There was some error when signing up",
            text2: "Please try again later",
            onPress: expect.any(Function),
        });
    });

    it("creates the user when all the credentials are valid and dispatches an action to login in", async () => {
        const { result } = renderHook(() => useSignUpScreen());

        act(() => result.current.setEmail("test@email.com"));
        act(() => result.current.setPassword("12345678"));
        act(() => result.current.setConfirmPassword("12345678"));

        await act(() => result.current.handleSignUpPress());

        waitFor(() => expect(toastSpy).not.toHaveBeenCalled());

        expect(mockUseDispatch).toHaveBeenCalledTimes(1);
    });

    it("does not create the user when some of the credentials are invalid and updates the error state", async () => {
        const { result } = renderHook(() => useSignUpScreen());

        act(() => result.current.setEmail("test"));
        act(() => result.current.setPassword("1234"));
        act(() => result.current.setConfirmPassword("123"));

        await act(() => result.current.handleSignUpPress());

        waitFor(() => expect(toastSpy).not.toHaveBeenCalled());

        expect(mockUseDispatch).not.toHaveBeenCalled();

        expect(result.current.state).toEqual({
            confirmPassword: {
                error: [
                    "Password must contain at least 8 characters",
                    "The passwords did not match",
                ],
                hasError: true,
            },
            email: {
                error: ["Invalid E-mail"],
                hasError: true,
            },
            password: {
                error: [
                    "Password must contain at least 8 characters",
                    "The passwords did not match",
                ],
                hasError: true,
            },
        });
    });
});
