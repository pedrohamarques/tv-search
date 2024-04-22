import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { MoviesList } from "../movies-list";
import { DUMMY_MOVIES } from "./dummy";

const mockValues = {
    title: "Upcoming",
    data: DUMMY_MOVIES,
    isLoading: false,
    hasError: false,
    handleSeeAllPress: jest.fn(),
};

jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn(),
}));

describe("components/movies-list/<MoviesList />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly with see all button", () => {
        render(<MoviesList {...mockValues} />);

        expect(screen.getByText("Upcoming")).toBeTruthy();
        expect(screen.getByText("See All")).toBeTruthy();
        expect(
            screen.getByTestId("components.movie-list.movie-item-0"),
        ).toBeTruthy();
        expect(
            screen.getByTestId("components.movie-list.movie-item-1"),
        ).toBeTruthy();

        expect(
            screen.queryByTestId("components.movies-list.loading"),
        ).toBeNull();

        expect(
            screen.queryByText(
                "There was some error when fetching data. Please try again.",
            ),
        ).toBeNull();
    });

    it("renders component properly without see all button", () => {
        render(<MoviesList {...mockValues} hideSeeAll />);

        expect(screen.getByText("Upcoming")).toBeTruthy();

        expect(screen.queryByText("See All")).toBeNull();
        expect(
            screen.getByTestId("components.movie-list.movie-item-0"),
        ).toBeTruthy();
        expect(
            screen.getByTestId("components.movie-list.movie-item-1"),
        ).toBeTruthy();

        expect(
            screen.queryByTestId("components.movies-list.loading"),
        ).toBeNull();

        expect(
            screen.queryByText(
                "There was some error when fetching data. Please try again.",
            ),
        ).toBeNull();
    });

    it("renders component properly when isLoading is true", () => {
        render(<MoviesList {...mockValues} isLoading />);

        expect(screen.getByText("Upcoming")).toBeTruthy();

        expect(screen.getByText("See All")).toBeTruthy();
        expect(
            screen.queryByTestId("components.movie-list.movie-item-0"),
        ).toBeNull();
        expect(
            screen.queryByTestId("components.movie-list.movie-item-1"),
        ).toBeNull();

        expect(
            screen.getByTestId("components.movies-list.loading"),
        ).toBeTruthy();

        expect(
            screen.queryByText(
                "There was some error when fetching data. Please try again.",
            ),
        ).toBeNull();
    });

    it("renders component properly when isLoading is true", () => {
        render(<MoviesList {...mockValues} hasError />);

        expect(screen.getByText("Upcoming")).toBeTruthy();

        expect(screen.getByText("See All")).toBeTruthy();
        expect(
            screen.queryByTestId("components.movie-list.movie-item-0"),
        ).toBeNull();
        expect(
            screen.queryByTestId("components.movie-list.movie-item-1"),
        ).toBeNull();

        expect(
            screen.queryByTestId("components.movies-list.loading"),
        ).toBeNull();

        expect(
            screen.getByText(
                "There was some error when fetching data. Please try again.",
            ),
        ).toBeTruthy();
    });

    it("calls handleSeeAllPress when See All button is pressed", () => {
        render(<MoviesList {...mockValues} />);

        fireEvent.press(screen.getByText("See All"));

        expect(mockValues.handleSeeAllPress).toHaveBeenCalledTimes(1);
    });
});
