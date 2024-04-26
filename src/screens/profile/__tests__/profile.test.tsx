import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { ProfileScreen } from "../profile";
import { DUMMY_PROFILE_STATE } from "./dummy";

const mockNavigation = {
    setOptions: jest.fn(),
};

jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn(),
}));

const mockUseProfileScreen = jest.fn();

jest.mock("../profile.hook", () => ({
    useProfileScreen: () => mockUseProfileScreen(0),
}));

const mockHookValues = {
    isUpdating: false,
    profileState: { ...DUMMY_PROFILE_STATE },
    updatingName: false,
    handleUpdateProfile: jest.fn(),
    handleBackPress: jest.fn(),
    handlePickImage: jest.fn(),
    handleEditingNamePress: jest.fn(),
    handleChooseCountry: jest.fn(),
    handleChangeName: jest.fn(),
    email: "john@test.com",
};

describe("screens/profile/<ProfileScreen />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseProfileScreen.mockReturnValue(mockHookValues);
    });

    it("renders screen properly", () => {
        render(<ProfileScreen navigation={mockNavigation} />);

        expect(screen.getByText("Profile")).toBeTruthy();
        expect(screen.getByTestId("screens.profile.avatar")).toBeTruthy();
        expect(screen.getByTestId("screens.profile.input-name")).toBeTruthy();
        expect(screen.getByTestId("screens.profile.input-email")).toBeTruthy();
        expect(screen.getByDisplayValue("john@test.com")).toBeTruthy();

        expect(
            screen.getByTestId("screens.profile.countries-dropdown"),
        ).toBeTruthy();
        expect(
            screen.getByTestId("screens.profile.confirm-button"),
        ).toBeTruthy();

        expect(
            screen.queryByTestId("screens.profile.input-pencil-icon"),
        ).toBeNull();
    });

    it("calls handlePickImage when avatar is pressed", () => {
        render(<ProfileScreen navigation={mockNavigation} />);

        fireEvent(
            screen.getByTestId("screens.profile.avatar"),
            "onAvatarPress",
        );

        expect(mockHookValues.handlePickImage).toHaveBeenCalledTimes(1);
    });

    it("shows the icon when is updating the name", () => {
        render(<ProfileScreen navigation={mockNavigation} />);

        fireEvent.press(
            screen.getByTestId("screens.profile.input.edit-button"),
        );

        expect(mockHookValues.handleEditingNamePress).toHaveBeenCalledTimes(1);

        expect(
            screen.getByTestId("screens.profile.input.pencil-icon"),
        ).toBeTruthy();
    });

    it("calls handleChangeName when name input is filled", () => {
        const mockNewHookValues = {
            ...mockHookValues,
            updatingName: true,
        };
        mockUseProfileScreen.mockReturnValueOnce(mockNewHookValues);

        render(<ProfileScreen navigation={mockNavigation} />);

        fireEvent.changeText(
            screen.getByPlaceholderText("Insert your name"),
            "some Name",
        );
        expect(mockNewHookValues.handleChangeName).toHaveBeenCalledTimes(1);
        expect(mockNewHookValues.handleChangeName).toHaveBeenCalledWith(
            "some Name",
        );
    });

    it("calls handleChooseCountry when the user selects a country in the list", () => {
        render(<ProfileScreen navigation={mockNavigation} />);

        fireEvent(
            screen.getByTestId("screens.profile.countries-dropdown"),
            "onItemPress",
        );

        expect(mockHookValues.handleChooseCountry).toHaveBeenCalledTimes(1);
    });

    it("does not call handleUpdateProfile when the confirmation button is pressed when it is not editing", () => {
        render(<ProfileScreen navigation={mockNavigation} />);

        fireEvent.press(screen.getByTestId("screens.profile.confirm-button"));

        expect(mockHookValues.handleUpdateProfile).not.toHaveBeenCalled();
    });

    it("calls handleUpdateProfile when the confirmation button is pressed when it is editing", () => {
        const mockNewHookValues = {
            ...mockHookValues,
            isUpdating: true,
        };

        mockUseProfileScreen.mockReturnValueOnce(mockNewHookValues);

        render(<ProfileScreen navigation={mockNavigation} />);

        fireEvent.press(screen.getByTestId("screens.profile.confirm-button"));

        expect(mockHookValues.handleUpdateProfile).toHaveBeenCalledTimes(1);
    });
});
