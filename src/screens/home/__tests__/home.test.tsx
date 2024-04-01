import React from "react";
import { render, screen } from "@testing-library/react-native";

import { HomeScreen } from "../home";
import { DUMMY_MOVIES } from "./dummy";

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
    isLoading: true,
    trendingMovies: DUMMY_MOVIES.results,
    upcomingMovies: DUMMY_MOVIES.results,
    topRatedMovies: DUMMY_MOVIES.results,
    handleSearchPress: jest.fn(),
};

describe("screens/home/<Home />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseHomeScreen.mockReturnValue(mockHookValues);
    });

    it("renders screen properly when is loading", () => {
        render(<HomeScreen navigation={mockNavigation} />);

        expect(screen.getByTestId("screens.home.loading")).toBeTruthy();

        expect(screen.queryByTestId("screens.home.trending-movies")).toBeNull();
        expect(
            screen.queryByTestId("screens.home.movies-list.upcoming"),
        ).toBeNull();
        expect(
            screen.queryByTestId("screens.home.movies-list.top-rated"),
        ).toBeNull();
    });

    it("renders screen properly when is not loading", () => {
        mockUseHomeScreen.mockReturnValueOnce({
            ...mockHookValues,
            isLoading: false,
        });
        render(<HomeScreen navigation={mockNavigation} />);

        expect(screen.queryByTestId("screens.home.loading")).toBeNull();

        expect(screen.getByTestId("screens.home.trending-movies")).toBeTruthy();
        expect(
            screen.getByTestId("screens.home.movies-list.upcoming"),
        ).toBeTruthy();
        expect(
            screen.getByTestId("screens.home.movies-list.top-rated"),
        ).toBeTruthy();
    });
});
