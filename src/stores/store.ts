import { combineReducers, configureStore } from "@reduxjs/toolkit";

import favoriteReducer from "./favoritesSlice";

const rootReducer = combineReducers({
    favorites: favoriteReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
