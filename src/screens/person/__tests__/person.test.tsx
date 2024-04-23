import React from "react";
import { render, screen } from "@testing-library/react-native";

import { PersonScreen } from "../person";
import { DUMMY_PERSON_DETAILS, DUMMY_PERSON_MOVIES } from "@constants/data";

const mockNavigation = {
    setOptions: jest.fn(),
};

jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn(),
}));

const mockUsePersonScreen = jest.fn();

jest.mock("../person.hook", () => ({
    usePersonScreen: () => mockUsePersonScreen(),
}));

const mockHookValues = {
    isFavorite: true,
    state: {
        personDetails: {
            data: DUMMY_PERSON_DETAILS,
            error: "",
            isLoading: false,
        },
        personMovies: {
            data: DUMMY_PERSON_MOVIES.cast,
            error: "",
            isLoading: false,
        },
    },
    handleFavoritePress: jest.fn(),
    handleBackPress: jest.fn(),
};

describe("screens/person/<PersonScreen />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUsePersonScreen.mockReturnValue(mockHookValues);
    });

    it("renders screen properly", () => {
        render(<PersonScreen navigation={mockNavigation} />);

        expect(screen.getByTestId("screens.person.cast-details")).toBeTruthy();
        expect(screen.getByTestId("screens.person.movies-list")).toBeTruthy();
    });
});
