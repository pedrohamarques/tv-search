import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { FavoriteCastScreen } from "../favorite-cast";
import { DUMMY_PERSON_DETAILS } from "@constants/data";

const mockHookValues = {
    handleCastPress: jest.fn(),
    cast: [DUMMY_PERSON_DETAILS],
};

const mockUseFavoriteCastScreen = jest.fn();

jest.mock("../favorite-cast.hook", () => ({
    useFavoriteCastScreen: () => mockUseFavoriteCastScreen(),
}));

describe("screens/favorite-movies/<FavoriteMoviesScreen />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseFavoriteCastScreen.mockReturnValue(mockHookValues);
    });

    it("renders screen properly when there is favorited cast", () => {
        render(<FavoriteCastScreen />);

        expect(screen.getByText("Favorite Cast (1)")).toBeTruthy();

        expect(
            screen.getByTestId("screens.favorite-cast.image-0"),
        ).toBeTruthy();

        expect(screen.getByText("Vito Annichiar...")).toBeTruthy();

        expect(
            screen.queryByTestId("screens.favorite-cast.no-favorite-image"),
        ).toBeNull();
        expect(
            screen.queryByText(
                "The cast you mark as favorite will appear here",
            ),
        ).toBeNull();
    });

    it("renders screen properly when there is no favorited cast", () => {
        mockUseFavoriteCastScreen.mockReturnValueOnce({
            ...mockHookValues,
            cast: [],
        });
        render(<FavoriteCastScreen />);

        expect(screen.queryByText("Favorite Casrt (1)")).toBeNull();

        expect(
            screen.queryByTestId("screens.favorite-cast.image-0"),
        ).toBeNull();

        expect(screen.queryByText("Vito Annichiar...")).toBeNull();

        expect(
            screen.getByTestId("screens.favorite-cast.no-favorite-image"),
        ).toBeTruthy();
        expect(
            screen.getByText("The cast you mark as favorite will appear here"),
        ).toBeTruthy();
    });

    it("calls handleCastPress when movie is pressed", () => {
        render(<FavoriteCastScreen />);

        fireEvent.press(screen.getByTestId("screens.favorite-cast.image-0"));

        expect(mockHookValues.handleCastPress).toHaveBeenCalledTimes(1);
    });
});
