import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { SignInScreen } from "../sign-in";

const mockUseSignInScreen = jest.fn();

jest.mock("../sign-in.hook", () => ({
    useSignInScreen: () => mockUseSignInScreen(),
}));

const mockHookValues = {
    handlePasswordVisibility: jest.fn(),
    handleCancelPress: jest.fn(),
    handleLogin: jest.fn(),
    setEmail: jest.fn(),
    setPassword: jest.fn(),
    isVisible: true,
    error: null,
};

describe("screens/sign-in/<SignInScreen", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseSignInScreen.mockReturnValue(mockHookValues);
    });

    it("renders screen properly without any error", () => {
        render(<SignInScreen />);

        expect(
            screen.getByTestId("screens.sign-in.public-background"),
        ).toBeTruthy();

        expect(screen.getByText("E-mail")).toBeTruthy();
        expect(screen.getByPlaceholderText("example@email.com")).toBeTruthy();

        expect(
            screen.getByTestId("screens.sign-in.visibility-button"),
        ).toBeTruthy();
        expect(screen.getByText("Password")).toBeTruthy();

        expect(screen.queryByTestId("screens.sign-in.error-text")).toBeNull();

        expect(screen.getByText("Forgot Password?")).toBeTruthy();

        expect(
            screen.getByTestId("screens.sign-in.cancel-button"),
        ).toBeTruthy();
        expect(screen.getByTestId("screens.sign-in.login-button")).toBeTruthy();
    });

    it("renders screen properly without an error", () => {
        const mockNewHookValues = {
            ...mockHookValues,
            error: { message: "Some Error" },
        };

        mockUseSignInScreen.mockReturnValueOnce(mockNewHookValues);

        render(<SignInScreen />);

        expect(
            screen.getByTestId("screens.sign-in.public-background"),
        ).toBeTruthy();

        expect(screen.getByText("E-mail")).toBeTruthy();
        expect(screen.getByPlaceholderText("example@email.com")).toBeTruthy();

        expect(
            screen.getByTestId("screens.sign-in.visibility-button"),
        ).toBeTruthy();
        expect(screen.getByText("Password")).toBeTruthy();

        expect(screen.getByTestId("screens.sign-in.error-text")).toBeTruthy();
        expect(screen.getByText("Some Error")).toBeTruthy();

        expect(screen.getByText("Forgot Password?")).toBeTruthy();

        expect(
            screen.getByTestId("screens.sign-in.cancel-button"),
        ).toBeTruthy();
        expect(screen.getByTestId("screens.sign-in.login-button")).toBeTruthy();
    });

    it("calls handleCancelPress when cancel button is pressed", () => {
        render(<SignInScreen />);

        fireEvent.press(screen.getByTestId("screens.sign-in.cancel-button"));

        expect(mockHookValues.handleCancelPress).toHaveBeenCalledTimes(1);
    });

    it("calls handleLogin when login button is pressed", () => {
        render(<SignInScreen />);

        fireEvent.press(screen.getByTestId("screens.sign-in.login-button"));

        expect(mockHookValues.handleLogin).toHaveBeenCalledTimes(1);
    });

    it("calls handlePasswordVisibility when eye button is pressed", () => {
        render(<SignInScreen />);

        fireEvent.press(
            screen.getByTestId("screens.sign-in.visibility-button"),
        );

        expect(mockHookValues.handlePasswordVisibility).toHaveBeenCalledTimes(
            1,
        );
    });
});
