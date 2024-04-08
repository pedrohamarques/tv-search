import React from "react";
import { render, screen } from "@testing-library/react-native";

import { HomeScreen } from "../home";
import { DUMMY_MOVIES } from "@constants/data";

const mockNavigation = {
    setOptions: jest.fn(),
};

jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn(),
}));
const mockUseHomeScreen = jest.fn();

jest.mock("../home.hook", () => ({
    useHomeScreen: () => mockUseHomeScreen(),
}));

const mockHookValues = {
    movies: {
        trending: {
            movies: DUMMY_MOVIES,
            isLoading: false,
        },
        upcoming: {
            movies: DUMMY_MOVIES,
            isLoading: false,
        },
        topRated: {
            movies: DUMMY_MOVIES,
            isLoading: false,
        },
    },
    handleSearchPress: jest.fn(),
};

describe("screens/home/<Home />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseHomeScreen.mockReturnValue(mockHookValues);
    });

    it("renders screen properly", () => {
        render(<HomeScreen navigation={mockNavigation} />);

        expect(screen.getByTestId("screens.home.trending-movies")).toBeTruthy();
        expect(
            screen.getByTestId("screens.home.movies-list.upcoming"),
        ).toBeTruthy();
        expect(
            screen.getByTestId("screens.home.movies-list.top-rated"),
        ).toBeTruthy();
    });
});
