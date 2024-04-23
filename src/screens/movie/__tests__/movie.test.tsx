import React from "react";
import { render, screen } from "@testing-library/react-native";

import { MovieScreen } from "../movie";
import {
    DUMMY_MOVIE_CREDITS,
    DUMMY_MOVIE_DETAILS,
    DUMMY_SIMILAR_MOVIES,
} from "@constants/data";

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
    state: {
        movie: {
            data: DUMMY_MOVIE_DETAILS,
            isLoading: false,
            error: "",
        },
        cast: {
            data: DUMMY_MOVIE_CREDITS.cast,
            isLoading: false,
            error: "",
        },
        similarMovies: {
            data: DUMMY_SIMILAR_MOVIES.results,
            isLoading: false,
            error: "",
        },
    },
};

describe("screens/movie/<MovieScreen />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseMovieScreen.mockReturnValue(mockHookValues);
    });

    it("renders screen properly", () => {
        render(<MovieScreen navigation={mockNavigation} />);

        expect(screen.getByTestId("screens.movie.movie-details")).toBeTruthy();
        expect(screen.getByTestId("screens.movie.cast")).toBeTruthy();
        expect(screen.getByTestId("screens.movie.movie-list")).toBeTruthy();
    });
});
