import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

import { FavoriteMoviesState } from "./types";

type FavoritesState = {
    movies: FavoriteMoviesState[];
};

const initialState: FavoritesState = {
    movies: [],
};

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavoriteMovie: (
            state,
            action: PayloadAction<FavoriteMoviesState>,
        ) => {
            state.movies.push(action.payload);
        },
        removeFavoriteMovie: (
            state,
            action: PayloadAction<FavoriteMoviesState>,
        ) => {
            state.movies.splice(state.movies.indexOf(action.payload), 1);
        },
    },
});

export const { addFavoriteMovie, removeFavoriteMovie } = favoritesSlice.actions;

export const favoritesSelector = (state: RootState) => state.favorites;

export default favoritesSlice.reducer;
