import { act, renderHook, waitFor } from "@testing-library/react-native";

import { useSignInScreen } from "../sign-in.hook";
import { supabase } from "@services/supabase";
import { AuthError } from "@supabase/supabase-js";

const mockUseSelector = jest.fn();
const mockUseDispatch = jest.fn();

jest.mock("react-redux", () => ({
    useSelector: (callback: () => void) => mockUseSelector(callback),
    useDispatch: () => () => mockUseDispatch(),
}));

const mockGoBack = jest.fn();

jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        goBack: mockGoBack,
    }),
}));

const supabaseSpyOn = jest.spyOn(supabase.auth, "signInWithPassword");

describe("screens/sign-in/useSignInScreen", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        supabaseSpyOn.mockResolvedValue({
            //@ts-expect-error too lazy to mock the answer
            data: { user: "1", session: { user: "1" } },
            error: null,
        });
    });

    it("toggles isVisible when handlePasswordVisibility is called", () => {
        const { result } = renderHook(() => useSignInScreen());

        expect(result.current.isVisible).toBe(false);

        act(() => result.current.handlePasswordVisibility());

        expect(result.current.isVisible).toBe(true);

        act(() => result.current.handlePasswordVisibility());

        expect(result.current.isVisible).toBe(false);
    });

    it("navigates to previous screen when handleCancelPress is called", () => {
        const { result } = renderHook(() => useSignInScreen());

        act(() => result.current.handleCancelPress());

        expect(mockGoBack).toHaveBeenCalledTimes(1);
    });

    it("handles login successfully when correct credentials are provided", async () => {
        const { result } = renderHook(() => useSignInScreen());

        await act(() => result.current.handleLogin());

        waitFor(() => expect(mockUseDispatch).toHaveBeenCalledTimes(1));
    });

    it("sets error to true when incorrect credentials are provided", async () => {
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

        const { result } = renderHook(() => useSignInScreen());

        await act(() => result.current.handleLogin());

        waitFor(() => expect(mockUseDispatch).not.toHaveBeenCalled());

        expect(result.current.error).toEqual({
            code: undefined,
            message: "Invalid login credentials",
            name: "AuthApiError",
            status: 400,
        });
    });
});
