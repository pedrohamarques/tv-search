import React from "react";

import { Cast } from "../cast";
import { render, screen } from "@testing-library/react-native";
import { DUMMY_CAST } from "./dummy";

const mockValues = {
    cast: DUMMY_CAST,
    handleCastPress: () => {},
    isLoading: false,
    hasError: false,
};

describe("components/cast/<Cast />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly", () => {
        render(<Cast {...mockValues} />);

        expect(screen.getByText("Top Cast")).toBeTruthy();
        expect(screen.getByTestId("components.cast.cast-item-0")).toBeTruthy();
        expect(screen.getByTestId("components.cast.cast-item-1")).toBeTruthy();

        expect(screen.queryByTestId("components.cast.loading")).toBeNull();
        expect(
            screen.queryByText(
                "There was some error when fetching data. Please try again.",
            ),
        ).toBeNull();
    });

    it("renders component properly when it is loading", () => {
        render(<Cast {...mockValues} isLoading />);

        expect(screen.getByText("Top Cast")).toBeTruthy();

        expect(screen.queryByTestId("components.cast.cast-item-0")).toBeNull();
        expect(screen.queryByTestId("components.cast.cast-item-1")).toBeNull();

        expect(screen.getByTestId("components.cast.loading")).toBeTruthy();

        expect(
            screen.queryByText(
                "There was some error when fetching data. Please try again.",
            ),
        ).toBeNull();
    });

    it("renders component properly when it has some error", () => {
        render(<Cast {...mockValues} hasError />);

        expect(screen.getByText("Top Cast")).toBeTruthy();

        expect(screen.queryByTestId("components.cast.cast-item-0")).toBeNull();
        expect(screen.queryByTestId("components.cast.cast-item-1")).toBeNull();
        expect(screen.queryByTestId("components.cast.loading")).toBeNull();

        expect(
            screen.getByText(
                "There was some error when fetching data. Please try again.",
            ),
        ).toBeTruthy();
    });
});
