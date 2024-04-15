import React from "react";
import { render, screen } from "@testing-library/react-native";

import { Input } from "../input";

const mockValues = {
    title: "SomeTitle",
};

describe("components/input/<Input />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly", () => {
        render(
            <Input {...mockValues}>
                <Input.Field placeholder='Placeholder' />
            </Input>,
        );

        expect(screen.getByTestId("components.input")).toBeTruthy();
        expect(screen.getByText("SomeTitle")).toBeTruthy();

        expect(screen.getByTestId("components.input.input-field")).toBeTruthy();
        expect(screen.getByPlaceholderText("Placeholder")).toBeTruthy();
    });
});
