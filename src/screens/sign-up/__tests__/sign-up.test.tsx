import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { SignUpScreen } from "../sign-up";

const mockUseSignUpScreen = jest.fn();

jest.mock("../sign-up.hook", () => ({
    useSignUpScreen: () => mockUseSignUpScreen(),
}));

const mockHookValues = {
    handleCancelPress: jest.fn(),
    handlePasswordVisibility: jest.fn(),
    handleConfirmPasswordVisibility: jest.fn(),
    setConfirmPassword: jest.fn(),
    setEmail: jest.fn(),
    setPassword: jest.fn(),
    isPasswordVisible: true,
    isConfirmPasswordVisible: true,
    handleSignUpPress: jest.fn(),
    state: {
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
    },
};

describe("screens/sign-up/<SignUpScreen />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseSignUpScreen.mockReturnValue(mockHookValues);
    });

    it("renders screen properly without any errors", () => {
        render(<SignUpScreen />);

        expect(
            screen.getByTestId("screens.sign-up.public-background"),
        ).toBeTruthy();

        expect(screen.getByText("E-mail")).toBeTruthy();
        expect(screen.getByPlaceholderText("example@email.com")).toBeTruthy();
        expect(
            screen.queryByTestId("screens.sign-up.e-mail-error-0"),
        ).toBeNull();

        expect(screen.getByText("Password")).toBeTruthy();
        expect(
            screen.queryByTestId("screens.sign-up.password-error-0"),
        ).toBeNull();

        expect(screen.getByText("Confirm Password")).toBeTruthy();
        expect(
            screen.queryByTestId("screens.sign-up.confirm-password-error-0"),
        ).toBeNull();

        expect(
            screen.getByTestId("screens.sign-up.cancel-button"),
        ).toBeTruthy();
        expect(
            screen.getByTestId("screens.sign-up.sign-up-button"),
        ).toBeTruthy();
    });

    it("calls handleCancelPress when cancel button is pressed", () => {
        render(<SignUpScreen />);

        fireEvent.press(screen.getByTestId("screens.sign-up.cancel-button"));

        expect(mockHookValues.handleCancelPress).toHaveBeenCalledTimes(1);
    });

    it("calls handleSignUpPress when sign up button is pressed", () => {
        render(<SignUpScreen />);

        fireEvent.press(screen.getByTestId("screens.sign-up.sign-up-button"));

        expect(mockHookValues.handleSignUpPress).toHaveBeenCalledTimes(1);
    });

    it("calls handlePasswordVisibility when password field visibility button is pressed", () => {
        render(<SignUpScreen />);

        fireEvent.press(screen.getByTestId("screens.sign-up.password-toggle"));

        expect(mockHookValues.handlePasswordVisibility).toHaveBeenCalledTimes(
            1,
        );
    });

    it("calls handleConfirmPasswordVisibility when confirm password field visibility button is pressed", () => {
        render(<SignUpScreen />);

        fireEvent.press(
            screen.getByTestId("screens.sign-up.confirm-password-toggle"),
        );

        expect(
            mockHookValues.handleConfirmPasswordVisibility,
        ).toHaveBeenCalledTimes(1);
    });

    it("shows the errors when credentials are not validated", () => {
        const mockNewHookValues = {
            ...mockHookValues,
            state: {
                confirmPassword: {
                    error: ["Some Error", "Some Other Error"],
                    hasError: true,
                },
                email: {
                    error: ["Some Error E-mail"],
                    hasError: true,
                },
                password: {
                    error: ["One more error"],
                    hasError: true,
                },
            },
        };

        mockUseSignUpScreen.mockReturnValueOnce(mockNewHookValues);

        render(<SignUpScreen />);

        expect(
            screen.getByTestId("screens.sign-up.e-mail-error-0"),
        ).toBeTruthy();
        expect(screen.getByText("Some Error E-mail")).toBeTruthy();

        expect(
            screen.getByTestId("screens.sign-up.password-error-0"),
        ).toBeTruthy();
        expect(screen.getByText("One more error")).toBeTruthy();

        expect(
            screen.getByTestId("screens.sign-up.confirm-password-error-0"),
        ).toBeTruthy();
        expect(
            screen.getByTestId("screens.sign-up.confirm-password-error-1"),
        ).toBeTruthy();
        expect(screen.getByText("Some Error")).toBeTruthy();
        expect(screen.getByText("Some Other Error")).toBeTruthy();
    });
});
