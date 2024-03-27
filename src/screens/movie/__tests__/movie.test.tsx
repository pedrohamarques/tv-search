import React from "react";
import { render, screen } from "@testing-library/react-native";

import { MovieScreen } from "../movie";
import {
    DUMMY_MOVIE_CREDITS,
    DUMMY_MOVIE_DETAILS,
    DUMMY_SIMILAR_MOVIES,
} from "./dummy";

const mockNavigation = {
    setOptions: jest.fn(),
};

jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn(),
}));

const mockUseMovieScreen = jest.fn();

jest.mock("../movie.hook", () => ({
    useMovieScreen: () => mockUseMovieScreen(),
}));

const mockHookValues = {
    handleBackPress: jest.fn(),
    handleFavoritePress: jest.fn(),
    handleCastPress: jest.fn(),
    isFavorite: true,
    similarMovies: DUMMY_SIMILAR_MOVIES.results,
    isLoading: true,
    movie: DUMMY_MOVIE_DETAILS,
    cast: DUMMY_MOVIE_CREDITS.cast,
};

describe("screens/movie/<MovieScreen />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseMovieScreen.mockReturnValue(mockHookValues);
    });

    it("renders screen properly when it is loading", () => {
        render(<MovieScreen navigation={mockNavigation} />);

        expect(screen.getByTestId("screens.movie.loading")).toBeTruthy();

        expect(screen.queryByTestId("screens.movie.movie-details")).toBeNull();
        expect(screen.queryByTestId("screens.movie.cast")).toBeNull();
        expect(screen.queryByTestId("screens.movie.movie-list")).toBeNull();
    });

    it("renders screen properly when it is not loading", () => {
        mockUseMovieScreen.mockReturnValueOnce({
            ...mockHookValues,
            isLoading: false,
        });
        render(<MovieScreen navigation={mockNavigation} />);

        expect(screen.queryByTestId("screens.movie.loading")).toBeNull();

        expect(screen.getByTestId("screens.movie.movie-details")).toBeTruthy();
        expect(screen.getByTestId("screens.movie.cast")).toBeTruthy();
        expect(screen.getByTestId("screens.movie.movie-list")).toBeTruthy();
    });
});
