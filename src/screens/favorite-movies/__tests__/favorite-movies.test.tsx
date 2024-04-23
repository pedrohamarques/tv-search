import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { FavoriteMoviesScreen } from "../favorite-movies";
import { DUMMY_MOVIES } from "@constants/data";

const mockNavigation = {
    setOptions: jest.fn(),
};

jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn(),
}));
const mockHookValues = {
    handleMoviePress: jest.fn(),
    movies: DUMMY_MOVIES,
};

const mockUseFavoriteMoviesScreen = jest.fn();

jest.mock("../favorite-movies.hook", () => ({
    useFavoriteMoviesScreen: () => mockUseFavoriteMoviesScreen(),
}));

describe("screens/favorite-movies/<FavoriteMoviesScreen />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseFavoriteMoviesScreen.mockReturnValue(mockHookValues);
    });

    it("renders screen properly when there is favorited movies", () => {
        render(<FavoriteMoviesScreen navigation={mockNavigation} />);

        expect(screen.getByText("Results (2)")).toBeTruthy();

        expect(
            screen.getByTestId("screens.favorite-movies.image-0"),
        ).toBeTruthy();
        expect(
            screen.getByTestId("screens.favorite-movies.image-1"),
        ).toBeTruthy();

        expect(screen.getAllByText("Kung Fu Panda 4")).toHaveLength(2);

        expect(
            screen.queryByTestId("screens.favorite-movies.no-favorites-image"),
        ).toBeNull();
        expect(
            screen.queryByText(
                "The movies you mark as favorite will appear here",
            ),
        ).toBeNull();
    });

    it("renders screen properly when there is no favorited movies", () => {
        mockUseFavoriteMoviesScreen.mockReturnValueOnce({
            ...mockHookValues,
            movies: [],
        });
        render(<FavoriteMoviesScreen navigation={mockNavigation} />);

        expect(screen.queryByText("Results (2)")).toBeNull();

        expect(
            screen.queryByTestId("screens.favorite-movies.image-0"),
        ).toBeNull();
        expect(
            screen.queryByTestId("screens.favorite-movies.image-1"),
        ).toBeNull();

        expect(screen.queryByText("Kung Fu Panda 4")).toBeNull();

        expect(
            screen.getByTestId("screens.favorite-movie.no-favorites-image"),
        ).toBeTruthy();
        expect(
            screen.getByText(
                "The movies you mark as favorite will appear here",
            ),
        ).toBeTruthy();
    });

    it("calls handleMoviePress when movie is pressed", () => {
        render(<FavoriteMoviesScreen navigation={mockNavigation} />);

        fireEvent.press(screen.getByTestId("screens.favorite-movies.image-0"));

        expect(mockHookValues.handleMoviePress).toHaveBeenCalledTimes(1);
    });
});
