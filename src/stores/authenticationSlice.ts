import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./store";
import type { AuthenticationState } from "./types";

const initialState: AuthenticationState = {
    email: "",
    password: "",
    isAuthenticated: false,
};

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthenticationState>) => {
            return { ...action.payload };
        },
        logout: () => {
            return {
                ...initialState,
            };
        },
    },
});

export const { login, logout } = authenticationSlice.actions;

export const authenticationSelector = (state: RootState) =>
    state.authentication;

export default authenticationSlice.reducer;
