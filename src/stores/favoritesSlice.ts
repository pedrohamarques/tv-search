import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

import { FavoriteCastState, FavoriteMoviesState } from "./types";

type FavoritesState = {
    movies: FavoriteMoviesState[];
    cast: FavoriteCastState[];
};

const initialState: FavoritesState = {
    movies: [],
    cast: [],
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
        addFavoriteCast: (state, action: PayloadAction<FavoriteCastState>) => {
            state.cast.push(action.payload);
        },
        removeFavoriteCast: (
            state,
            action: PayloadAction<FavoriteCastState>,
        ) => {
            state.cast.splice(state.cast.indexOf(action.payload), 1);
        },
    },
});

export const {
    addFavoriteMovie,
    removeFavoriteMovie,
    addFavoriteCast,
    removeFavoriteCast,
} = favoritesSlice.actions;

export const favoritesSelector = (state: RootState) => state.favorites;

export default favoritesSlice.reducer;
