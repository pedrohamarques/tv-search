import React from "react";
import { render, screen } from "@testing-library/react-native";

import { TrendingMovies } from "../trending-movies";
import { DUMMY_MOVIES } from "./dummy";

const mockValues = {
    data: DUMMY_MOVIES,
    isLoading: false,
};

jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn(),
}));

describe("components/trending-movies/<TrendingMovies />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly", () => {
        render(<TrendingMovies {...mockValues} />);

        expect(screen.getByText("Trending")).toBeTruthy();
        expect(
            screen.getByTestId("components.trending-movies.carousel"),
        ).toBeTruthy();

        expect(
            screen.queryByTestId("components.trending-movies.loading"),
        ).toBeNull();
    });

    it("renders component properly when it is loading", () => {
        render(<TrendingMovies {...mockValues} isLoading />);

        expect(screen.getByText("Trending")).toBeTruthy();
        expect(
            screen.queryByTestId("components.trending-movies.carousel"),
        ).toBeNull();

        expect(
            screen.getByTestId("components.trending-movies.loading"),
        ).toBeTruthy();
    });
});
