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
    isLoading: true,
    personMovies: DUMMY_PERSON_MOVIES.cast,
    personDetails: DUMMY_PERSON_DETAILS,
    handleFavoritePress: jest.fn(),
    handleBackPress: jest.fn(),
};

describe("screens/person/<PersonScreen />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUsePersonScreen.mockReturnValue(mockHookValues);
    });

    it("renders screen properly when it is loading", () => {
        render(<PersonScreen navigation={mockNavigation} />);

        expect(screen.getByTestId("screens.person.loading")).toBeTruthy();

        expect(screen.queryByTestId("screens.person.image")).toBeNull();
        expect(
            screen.queryByTestId("screens.person.name-place-of-birth"),
        ).toBeNull();
        expect(screen.queryByText("Gender")).toBeNull();
        expect(screen.queryByText("Birthday")).toBeNull();
        expect(screen.queryByText("Popularity")).toBeNull();
        expect(screen.queryByText("Known for")).toBeNull();
        expect(screen.queryByText("Biography")).toBeNull();
        expect(screen.queryByTestId("screens.person.movies-list")).toBeNull();
    });

    it("renders screen properly when it is not loading", () => {
        mockUsePersonScreen.mockReturnValue({
            ...mockHookValues,
            isLoading: false,
        });
        render(<PersonScreen navigation={mockNavigation} />);

        expect(screen.queryByTestId("screens.person.loading")).toBeNull();

        expect(screen.getByTestId("screens.person.image")).toBeTruthy();
        expect(
            screen.getByTestId("screens.person.name-place-of-birth"),
        ).toBeTruthy();
        expect(screen.getByText("Vito Annichiarico")).toBeTruthy();
        expect(screen.getByText("Grottaglie, Italy")).toBeTruthy();

        expect(screen.getByText("Gender")).toBeTruthy();
        expect(screen.getByText("2")).toBeTruthy();

        expect(screen.getByText("Birthday")).toBeTruthy();
        expect(screen.getByText("1934-02-26")).toBeTruthy();

        expect(screen.getByText("Popularity")).toBeTruthy();
        expect(screen.getByText("0.6%")).toBeTruthy();

        expect(screen.getByText("Known for")).toBeTruthy();
        expect(screen.getByText("Acting")).toBeTruthy();

        expect(screen.getByText("Biography")).toBeTruthy();

        expect(screen.getByTestId("screens.person.movies-list")).toBeTruthy();
    });
});
