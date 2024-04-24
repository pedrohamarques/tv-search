import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Logo } from "../logo";

describe("components/logo/<Logo />", () => {
    beforeEach(() => {
        jest.clearAllMocks;
    });

    it("renders component properly", () => {
        render(<Logo />);

        expect(screen.getByText("T")).toBeTruthy();
        expect(screen.getByText("S")).toBeTruthy();
    });
});
