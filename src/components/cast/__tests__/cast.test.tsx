import React from "react";

import { Cast } from "../cast";
import { render, screen } from "@testing-library/react-native";
import { DUMMY_CAST } from "./dummy";

const mockValues = {
    cast: DUMMY_CAST,
    handleCastPress: () => {},
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
    });
});
