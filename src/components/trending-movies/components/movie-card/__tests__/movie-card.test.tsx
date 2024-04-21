import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { MovieCard } from "../movie-card";
import { DUMMY_MOVIES } from "@components/trending-movies/__tests__/dummy";

const mockValues = {
    item: DUMMY_MOVIES[0],
    handlePress: jest.fn(),
};

describe("components/trending-movies/components/movie-card/<MovieCard />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly", () => {
        render(<MovieCard {...mockValues} />);

        expect(
            screen.getByTestId(
                "components.trending-movies.components.movie-card.image",
            ),
        ).toBeTruthy();
    });

    it("calls handlePress when component is pressed", () => {
        render(<MovieCard {...mockValues} />);

        fireEvent.press(
            screen.getByTestId(
                "components.trending-movies.components.movie-card.image",
            ),
        );

        expect(mockValues.handlePress).toHaveBeenCalledTimes(1);
    });
});
