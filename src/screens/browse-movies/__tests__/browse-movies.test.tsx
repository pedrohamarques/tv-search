import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { BrowseMoviesScreen } from "../browse-movies";
import { DUMMY_MOVIES } from "@constants/data";

const mockNavigation = {
    setOptions: jest.fn(),
};

jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn(),
}));

const mockUseBrowseScreen = jest.fn();

jest.mock("../browse-movies.hook", () => ({
    useBrowseMoviesScreen: () => mockUseBrowseScreen(),
}));

const mockHookValues = {
    handleGoBackPress: jest.fn(),
    handleItemPress: jest.fn(),
    routeFrom: "topRated",
    movies: DUMMY_MOVIES,
};

describe("screens/browse-movies/BrowseMoviesScreen", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseBrowseScreen.mockReturnValue(mockHookValues);
    });

    it("renders screen properly", () => {
        render(<BrowseMoviesScreen navigation={mockNavigation} />);

        expect(screen.getByText("Results (2)")).toBeTruthy();
        expect(
            screen.getByTestId("screens.browse-movies.image-0"),
        ).toBeTruthy();
        expect(
            screen.getByTestId("screens.browse-movies.image-1"),
        ).toBeTruthy();

        expect(screen.getAllByText("Kung Fu Panda 4")).toHaveLength(2);
    });

    it("calls handleItemPress when movie item is pressed", () => {
        render(<BrowseMoviesScreen navigation={mockNavigation} />);

        fireEvent.press(screen.getByTestId("screens.browse-movies.image-0"));

        expect(mockHookValues.handleItemPress).toHaveBeenCalledTimes(1);
    });
});
