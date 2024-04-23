import React from "react";
import { render, screen } from "@testing-library/react-native";

import { MovieDetails } from "../movie-details";
import { DUMMY_MOVIE_DETAILS } from "@constants/data";

const mockValues = {
    movie: DUMMY_MOVIE_DETAILS,
    isLoading: false,
    hasError: false,
};

describe("screens/movie/components/movie-details/<MovieDetails />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly", () => {
        render(<MovieDetails {...mockValues} />);

        expect(
            screen.getByTestId("screens.movie.component.movie-details.image"),
        ).toBeTruthy();
        expect(screen.getByText("Catch a Fire")).toBeTruthy();
        expect(screen.getByText("Released • 2006 • 101 min")).toBeTruthy();
        expect(screen.getByText("Action")).toBeTruthy();
        expect(
            screen.getByText(
                "The true story of anti-apartheid activists in South Africa, and particularly the life of Patrick Chamusso, a timid foreman at Secunda CTL, the largest synthetic fuel plant in the world. Patrick is wrongly accused, imprisoned and tortured for an attempt to bomb the plant, with the injustice transforming the apolitical worker into a radicalised insurgent, who then carries out his own successful sabotage mission.",
            ),
        ).toBeTruthy();

        expect(
            screen.queryByTestId("components.movie-details.loading"),
        ).toBeNull();
        expect(
            screen.queryByText(
                "There was some error when fetching data. Please try again.",
            ),
        ).toBeNull();
    });

    it("renders screen properly when it is loading", () => {
        render(<MovieDetails {...mockValues} isLoading />);

        expect(
            screen.queryByTestId("screens.movie.component.movie-details.image"),
        ).toBeNull();
        expect(screen.queryByText("Catch a Fire")).toBeNull();
        expect(screen.queryByText("Released • 2006 • 101 min")).toBeNull();
        expect(screen.queryByText("Action")).toBeNull();
        expect(
            screen.queryByText(
                "The true story of anti-apartheid activists in South Africa, and particularly the life of Patrick Chamusso, a timid foreman at Secunda CTL, the largest synthetic fuel plant in the world. Patrick is wrongly accused, imprisoned and tortured for an attempt to bomb the plant, with the injustice transforming the apolitical worker into a radicalised insurgent, who then carries out his own successful sabotage mission.",
            ),
        ).toBeNull();

        expect(
            screen.getByTestId("components.movie-details.loading"),
        ).toBeTruthy();
        expect(
            screen.queryByText(
                "There was some error when fetching data. Please try again.",
            ),
        ).toBeNull();
    });

    it("renders component properly when it has error", () => {
        render(<MovieDetails {...mockValues} hasError />);

        expect(
            screen.queryByTestId("screens.movie.component.movie-details.image"),
        ).toBeNull();
        expect(screen.queryByText("Catch a Fire")).toBeNull();
        expect(screen.queryByText("Released • 2006 • 101 min")).toBeNull();
        expect(screen.queryByText("Action")).toBeNull();
        expect(
            screen.queryByText(
                "The true story of anti-apartheid activists in South Africa, and particularly the life of Patrick Chamusso, a timid foreman at Secunda CTL, the largest synthetic fuel plant in the world. Patrick is wrongly accused, imprisoned and tortured for an attempt to bomb the plant, with the injustice transforming the apolitical worker into a radicalised insurgent, who then carries out his own successful sabotage mission.",
            ),
        ).toBeNull();

        expect(
            screen.queryByTestId("components.movie-details.loading"),
        ).toBeNull();
        expect(
            screen.getByText(
                "There was some error when fetching data. Please try again.",
            ),
        ).toBeTruthy();
    });
});
