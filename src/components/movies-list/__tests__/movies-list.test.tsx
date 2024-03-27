import React from "react";
import { render, screen } from "@testing-library/react-native";

import { MoviesList } from "../movies-list";
import { DUMMY_MOVIES } from "./dummy";

const mockValues = {
    title: "Upcoming",
    data: DUMMY_MOVIES,
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
    });
});
