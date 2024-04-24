import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { Button } from "../button";
import { UserIcon } from "react-native-heroicons/outline";

const mockValues = {
    title: "SomeTitle",
    Logo: () => <UserIcon />,
    onPress: jest.fn(),
};

describe("components/button/<Button />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly when there is some icon", () => {
        render(<Button {...mockValues} />);

        expect(screen.getByText("SomeTitle")).toBeTruthy();
        expect(screen.getByTestId("components.button.logo")).toBeTruthy();
    });

    it("renders component properly when there is no icon", () => {
        render(<Button {...mockValues} Logo={undefined} />);

        expect(screen.getByText("SomeTitle")).toBeTruthy();
        expect(screen.queryByTestId("components.button.logo")).toBeNull();
    });

    it("calls onPress when button is pressed", () => {
        render(<Button {...mockValues} />);

        fireEvent.press(screen.getByText("SomeTitle"));

        expect(mockValues.onPress).toHaveBeenCalledTimes(1);
    });
});
