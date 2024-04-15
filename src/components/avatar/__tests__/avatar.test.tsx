import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { Avatar } from "../avatar";

const mockValues = {
    onAvatarPress: jest.fn(),
    image: "someImage",
};

describe("components/avatar/<Avatar />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly when there is some image to show", () => {
        render(<Avatar {...mockValues} />);

        expect(screen.getByTestId("components.avatar")).toBeTruthy();
        expect(screen.getByTestId("components.avatar.image")).toBeTruthy();

        expect(
            screen.queryByTestId("components.avatar.camera-icon"),
        ).toBeNull();
    });

    it("renders component properly when there is not an image to show", () => {
        render(<Avatar {...mockValues} image='' />);

        expect(screen.getByTestId("components.avatar")).toBeTruthy();
        expect(screen.queryByTestId("components.avatar.image")).toBeNull();

        expect(
            screen.getByTestId("components.avatar.camera-icon"),
        ).toBeTruthy();
    });

    it("calls onAvatarPress when the image or the icon is pressed", () => {
        render(<Avatar {...mockValues} />);

        fireEvent.press(screen.getByTestId("components.avatar.image"));

        expect(mockValues.onAvatarPress).toHaveBeenCalledTimes(1);
    });
});
