import React from "react";

import { useAppSelector } from "@stores/hooks";
import { authenticationSelector } from "@stores/authenticationSlice";

import { PublicRoutes } from "./public-stack";
import { RootNavigation } from "./stack-native";

export function Routes() {
    const { isAuthenticated } = useAppSelector(authenticationSelector);

    if (!isAuthenticated) {
        return <PublicRoutes />;
    } else {
        return <RootNavigation />;
    }
}
