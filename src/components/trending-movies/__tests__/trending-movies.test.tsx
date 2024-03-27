import { render, screen } from "@testing-library/react-native";
import React from "react";
import { TrendingMovies } from "../trending-movies";
import { DUMMY_MOVIES } from "./dummy";

const mockValues = {
    data: DUMMY_MOVIES,
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
    });
});
