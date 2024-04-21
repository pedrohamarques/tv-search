import React from "react";
import { render, screen } from "@testing-library/react-native";

import { MovieDetails } from "../movie-details";
import { DUMMY_MOVIE_DETAILS } from "@constants/data";

describe("screens/movie/components/movie-details/<MovieDetails />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly", () => {
        render(<MovieDetails movie={DUMMY_MOVIE_DETAILS} />);

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
    });
});
