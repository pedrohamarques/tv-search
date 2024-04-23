import React from "react";
import { render, screen } from "@testing-library/react-native";

import { DUMMY_PERSON_DETAILS } from "@constants/data";

import { CastDetails } from "../cast-details";

const mockValues = {
    cast: DUMMY_PERSON_DETAILS,
    hasError: false,
    isLoading: false,
};

describe("screens/person/components/cast-details/<CastDetails />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly", () => {
        render(<CastDetails {...mockValues} />);

        expect(
            screen.queryByTestId(
                "screens.person.components.cast-details.loading",
            ),
        ).toBeNull();

        expect(
            screen.queryByText(
                "There was some error when fetching data. Please try again.",
            ),
        ).toBeNull();

        expect(
            screen.getByTestId("screens.person.components.cast-details.image"),
        ).toBeTruthy();
        expect(
            screen.getByTestId("screens.person.name-place-of-birth"),
        ).toBeTruthy();
        expect(screen.getByText("Vito Annichiarico")).toBeTruthy();
        expect(screen.getByText("Grottaglie, Italy")).toBeTruthy();

        expect(screen.getByText("Gender")).toBeTruthy();
        expect(screen.getByText("Male")).toBeTruthy();

        expect(screen.getByText("Birthday")).toBeTruthy();
        expect(screen.getByText("1934-02-26")).toBeTruthy();

        expect(screen.getByText("Popularity")).toBeTruthy();
        expect(screen.getByText("0.6%")).toBeTruthy();

        expect(screen.getByText("Known for")).toBeTruthy();
        expect(screen.getByText("Acting")).toBeTruthy();

        expect(screen.getByText("Biography")).toBeTruthy();
    });

    it("renders component properly when it is loading", () => {
        render(<CastDetails {...mockValues} isLoading />);

        expect(
            screen.getByTestId(
                "screens.person.components.cast-details.loading",
            ),
        ).toBeTruthy();

        expect(
            screen.queryByText(
                "There was some error when fetching data. Please try again.",
            ),
        ).toBeNull();

        expect(
            screen.queryByTestId(
                "screens.person.components.cast-details.image",
            ),
        ).toBeNull();
        expect(
            screen.queryByTestId("screens.person.name-place-of-birth"),
        ).toBeNull();
        expect(screen.queryByText("Vito Annichiarico")).toBeNull();
        expect(screen.queryByText("Grottaglie, Italy")).toBeNull();

        expect(screen.queryByText("Gender")).toBeNull();
        expect(screen.queryByText("Male")).toBeNull();

        expect(screen.queryByText("Birthday")).toBeNull();
        expect(screen.queryByText("1934-02-26")).toBeNull();

        expect(screen.queryByText("Popularity")).toBeNull();
        expect(screen.queryByText("0.6%")).toBeNull();

        expect(screen.queryByText("Known for")).toBeNull();
        expect(screen.queryByText("Acting")).toBeNull();
    });

    it("renders component properly when it has error for not fetching data", () => {
        render(<CastDetails {...mockValues} hasError />);

        expect(
            screen.queryByTestId(
                "screens.person.components.cast-details.loading",
            ),
        ).toBeNull();

        expect(
            screen.getByText(
                "There was some error when fetching data. Please try again.",
            ),
        ).toBeTruthy();

        expect(
            screen.queryByTestId(
                "screens.person.components.cast-details.image",
            ),
        ).toBeNull();
        expect(
            screen.queryByTestId("screens.person.name-place-of-birth"),
        ).toBeNull();
        expect(screen.queryByText("Vito Annichiarico")).toBeNull();
        expect(screen.queryByText("Grottaglie, Italy")).toBeNull();

        expect(screen.queryByText("Gender")).toBeNull();
        expect(screen.queryByText("Male")).toBeNull();

        expect(screen.queryByText("Birthday")).toBeNull();
        expect(screen.queryByText("1934-02-26")).toBeNull();

        expect(screen.queryByText("Popularity")).toBeNull();
        expect(screen.queryByText("0.6%")).toBeNull();

        expect(screen.queryByText("Known for")).toBeNull();
        expect(screen.queryByText("Acting")).toBeNull();
    });
});
