import React from "react";
import { Text } from "react-native";
import { render, screen } from "@testing-library/react-native";

import { PublicBackground } from "../public-background";

describe("components/public-background/<PublicBackground />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly", () => {
        render(
            <PublicBackground>
                <Text>Hello World</Text>
            </PublicBackground>,
        );

        expect(screen.getByText("Hello World")).toBeTruthy();
        expect(
            screen.getByTestId("components.public-background.image-background"),
        ).toBeTruthy();
        expect(
            screen.getByTestId("components.public-background.linear-gradient"),
        ).toBeTruthy();
    });
});
