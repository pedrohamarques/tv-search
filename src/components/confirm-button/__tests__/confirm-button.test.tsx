import React from "react";
import { render, screen } from "@testing-library/react-native";

import { ConfirmButton } from "../confirm-button";

describe("components/confirm-button/<ConfirmButton />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly", () => {
        render(<ConfirmButton />);

        expect(screen.getByTestId("components.confirm-button")).toBeTruthy();
        expect(screen.getByText("Update Profile")).toBeTruthy();
    });
});
