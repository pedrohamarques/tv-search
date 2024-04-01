import React from "react";
import { RenderOptions, render } from "@testing-library/react-native";

import { AppStore, RootState, setupStore } from "@stores/store";
import { Provider } from "react-redux";

type ExtendedRenderOptions = Omit<RenderOptions, "queries"> & {
    preloadedState?: Partial<RootState>;
    store?: AppStore;
};

export function renderWithProviders(
    ui: React.ReactElement,
    extendedRenderOptions: ExtendedRenderOptions = {},
) {
    const {
        preloadedState = {},
        store = setupStore(preloadedState),
        ...renderOptions
    } = extendedRenderOptions;

    const Wrapper = ({ children }: React.PropsWithChildren) => {
        return <Provider store={store}>{children}</Provider>;
    };

    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    };
}
