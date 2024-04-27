import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { WelcomeScreen } from "../welcome";
import { Platform } from "react-native";

jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn(),
}));

const mockHookValues = {
    handleSignInPress: jest.fn(),
    handleSignUpPress: jest.fn(),
};

const setPlatform = function (platform: "android" | "ios") {
    Object.defineProperty(Platform, "OS", {
        get: jest.fn(() => platform),
    });
};

jest.mock("../welcome.hook", () => ({
    useWelcomeScreen: () => mockHookValues,
}));

describe("screens/welcome/<Welcome Screen />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("renders component properly when is a android device", () => {
        setPlatform("android");

        render(<WelcomeScreen />);

        expect(
            screen.getByTestId("screens.welcome.public-background"),
        ).toBeTruthy();
        expect(screen.getByTestId("screens.welcome.logo")).toBeTruthy();

        expect(
            screen.getByTestId("screens.welcome.button-google"),
        ).toBeTruthy();

        expect(screen.queryByTestId("screens.welcome.button-apple")).toBeNull();

        expect(screen.getByTestId("screens.welcome.button-email")).toBeTruthy();

        expect(
            screen.getByText("Already has an account? Sign In!"),
        ).toBeTruthy();
    });

    it("renders component properly when is a ios device", () => {
        setPlatform("ios");
        render(<WelcomeScreen />);

        expect(
            screen.getByTestId("screens.welcome.public-background"),
        ).toBeTruthy();
        expect(screen.getByTestId("screens.welcome.logo")).toBeTruthy();

        expect(
            screen.getByTestId("screens.welcome.button-google"),
        ).toBeTruthy();

        expect(screen.getByTestId("screens.welcome.button-apple")).toBeTruthy();

        expect(screen.getByTestId("screens.welcome.button-email")).toBeTruthy();

        expect(
            screen.getByText("Already has an account? Sign In!"),
        ).toBeTruthy();
    });

    it("calls handleSignInPress when text in the bottom is pressed", () => {
        setPlatform("android");
        render(<WelcomeScreen />);

        fireEvent.press(screen.getByText("Already has an account? Sign In!"));

        expect(mockHookValues.handleSignInPress).toHaveBeenCalledTimes(1);
    });

    it("calls handleSignUpPress when email button is pressed", () => {
        setPlatform("android");
        render(<WelcomeScreen />);

        fireEvent.press(screen.getByTestId("screens.welcome.button-email"));

        expect(mockHookValues.handleSignUpPress).toHaveBeenCalledTimes(1);
    });
});
