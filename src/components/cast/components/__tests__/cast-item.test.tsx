import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { CastItem } from "../cast-item";

const mockValues = {
    personName: "Keanu",
    characterName: "Neo",
    imagePath: "someImage",
    handlePress: jest.fn(),
};

describe("components/cast/components/cast-item/<CastItem />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly", () => {
        render(<CastItem {...mockValues} />);

        expect(screen.getByText("Neo")).toBeTruthy();
        expect(screen.getByText("Keanu")).toBeTruthy();
        expect(
            screen.getByTestId("components.cast.components.cast-item.image"),
        ).toBeTruthy();
    });

    it("renders component properly when personName and/or characterName length is bigger than 10 characters", () => {
        render(
            <CastItem
                {...mockValues}
                personName='Keanu Reeves'
                characterName='Neo, the Chosen One'
            />,
        );

        expect(screen.getByText("Neo, the C...")).toBeTruthy();
        expect(screen.getByText("Keanu Reev...")).toBeTruthy();
        expect(
            screen.getByTestId("components.cast.components.cast-item.image"),
        ).toBeTruthy();
    });

    it("calls handlePress when component is pressed", () => {
        render(<CastItem {...mockValues} />);

        fireEvent.press(
            screen.getByTestId("components.cast.components.cast-item.image"),
        );

        expect(mockValues.handlePress).toHaveBeenCalledTimes(1);
    });
});
