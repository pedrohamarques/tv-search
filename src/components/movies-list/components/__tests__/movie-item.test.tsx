import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { MovieItem } from "../movie-item";

const mockValues = {
    handlePress: jest.fn(),
    movieName: "Kung Fu",
    imagePath: "somePath",
};

describe("components/movie-list/components/movie-item/<MovieItem />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly", () => {
        render(<MovieItem {...mockValues} />);

        expect(screen.getByText("Kung Fu")).toBeTruthy();
        expect(
            screen.getByTestId(
                "components.movie-list.components.movie-item.image",
            ),
        ).toBeTruthy();
    });

    it("renders component properly when movieName length is bigger than 14 characters", () => {
        render(
            <MovieItem
                {...mockValues}
                movieName='Kung Fu Panda 4 and The Return'
            />,
        );

        expect(screen.getByText("Kung Fu Panda ...")).toBeTruthy();
        expect(
            screen.getByTestId(
                "components.movie-list.components.movie-item.image",
            ),
        ).toBeTruthy();
    });

    it("calls handlePress when component is pressed", () => {
        render(<MovieItem {...mockValues} />);

        fireEvent.press(
            screen.getByTestId(
                "components.movie-list.components.movie-item.image",
            ),
        );

        expect(mockValues.handlePress).toHaveBeenCalledTimes(1);
    });
});
