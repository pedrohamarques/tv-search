import {
    fireEvent,
    render,
    screen,
    waitFor,
} from "@testing-library/react-native";
import React from "react";
import { CountriesDropDown } from "../countries-dropdown";
import { View } from "react-native";

const mockValues = {
    onItemPress: jest.fn(),
    country: {
        name: "Some Country",
        code: "SC",
    },
    isEditing: false,
};

jest.spyOn(View.prototype, "measureInWindow").mockImplementation(cb => {
    cb(18, 113, 357, 50);
});

describe("components/countries-dropdown/<CountriesDropDown />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly", () => {
        render(<CountriesDropDown {...mockValues} />);

        expect(
            screen.getByTestId("components.countries-dropdown"),
        ).toBeTruthy();
        expect(screen.getByText("Country")).toBeTruthy();
    });

    it("calls onItemPress when an item in the dropdown list is pressed", async () => {
        render(<CountriesDropDown {...mockValues} />);

        fireEvent.press(screen.getByTestId("components.countries-dropdown"));

        const chosenOption = screen.getByText("Afghanistan");

        await waitFor(() => expect(chosenOption).toBeDefined());

        fireEvent.press(chosenOption);

        await waitFor(() =>
            expect(mockValues.onItemPress).toHaveBeenCalledTimes(1),
        );

        expect(mockValues.onItemPress).toHaveBeenCalledWith(
            expect.objectContaining({ name: "Afghanistan", code: "AF" }),
        );
    });
});
