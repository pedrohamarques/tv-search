import React from "react";
import { render, screen } from "@testing-library/react-native";

import { MovieDetails } from "../movie-details";
import { DUMMY_MOVIE_DETAILS } from "@screens/movie/__tests__/dummy";

describe("screens/movie/components/movie-details/<MovieDetails />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly", () => {
        render(<MovieDetails movie={DUMMY_MOVIE_DETAILS} />);

        expect(
            screen.getByTestId("screens.movie.component.movie-details.image"),
        ).toBeTruthy();
        expect(screen.getByText("The Omega Man")).toBeTruthy();
        expect(screen.getByText("Released • 1971 • 98 min")).toBeTruthy();
        expect(screen.getByText("Science Fiction • ")).toBeTruthy();
        expect(screen.getByText("Action")).toBeTruthy();
        expect(
            screen.getByText(
                "Due to an experimental vaccine, Dr. Robert Neville is the only human survivor of an apocalyptic war waged with biological weapons. Besides him, only a few hundred deformed, nocturnal people remain - sensitive to light, and homicidally psychotic.",
            ),
        ).toBeTruthy();
    });
});
