import { render, screen } from "@testing-library/react-native";
import React from "react";
import { SearchScreen } from "../search";
import { DUMMY_SEARCH_RESULTS } from "./dummy";

const mockNavigation = {
    setOptions: jest.fn(),
};

jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn(),
}));

const mockUseSearchScreen = jest.fn();

jest.mock("../search.hook", () => ({
    useSearchScreen: () => mockUseSearchScreen(),
}));

const mockHookValues = {
    isLoading: true,
    handleTextDebounce: jest.fn(),
    searchedMovies: [],
    handleItemPress: jest.fn(),
    handleClosePress: jest.fn(),
};

describe("screens/search/SearchScreen", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseSearchScreen.mockReturnValue(mockHookValues);
    });

    it("renders screen properly when it is loading", () => {
        render(<SearchScreen navigation={mockNavigation} />);

        expect(screen.getByTestId("screens.search.text-input")).toBeTruthy();

        expect(screen.getByTestId("screens.search.loading")).toBeTruthy();

        expect(screen.queryByText("Results ")).toBeNull();
        expect(screen.queryByTestId("screens.search.image-0")).toBeNull();
        expect(screen.queryByText("Hulk")).toBeNull();

        expect(
            screen.queryByTestId("screens.search.no-search-image"),
        ).toBeNull();
        expect(
            screen.queryByText("The movies you search will appear here"),
        ).toBeNull();
    });

    it("renders screen properly when it is not loading and it was not searched anything", () => {
        mockUseSearchScreen.mockReturnValueOnce({
            ...mockHookValues,
            isLoading: false,
        });
        render(<SearchScreen navigation={mockNavigation} />);

        expect(screen.getByTestId("screens.search.text-input")).toBeTruthy();

        expect(screen.queryByTestId("screens.search.loading")).toBeNull();

        expect(screen.queryByText("Results ")).toBeNull();
        expect(screen.queryByTestId("screens.search.image-0")).toBeNull();
        expect(screen.queryByText("Hulk")).toBeNull();

        expect(
            screen.getByTestId("screens.search.no-search-image"),
        ).toBeTruthy();
        expect(
            screen.getByText("The movies you search will appear here"),
        ).toBeTruthy();
    });

    it("renders screen properly when it is not loading and it was searched something", () => {
        mockUseSearchScreen.mockReturnValueOnce({
            ...mockHookValues,
            isLoading: false,
            searchedMovies: DUMMY_SEARCH_RESULTS.results,
        });
        render(<SearchScreen navigation={mockNavigation} />);

        expect(screen.getByTestId("screens.search.text-input")).toBeTruthy();

        expect(screen.queryByTestId("screens.search.loading")).toBeNull();

        expect(screen.getByText("Results (2)")).toBeTruthy();

        expect(screen.getByTestId("screens.search.image-0")).toBeTruthy();
        expect(screen.getByTestId("screens.search.image-1")).toBeTruthy();

        expect(screen.getByText("Hulk")).toBeTruthy();
        expect(screen.getByText("The Incredible Hulk")).toBeTruthy();

        expect(
            screen.queryByTestId("screens.search.no-search-image"),
        ).toBeNull();
        expect(
            screen.queryByText("The movies you search will appear here"),
        ).toBeNull();
    });
});
