import { CastType } from "./data";

export type RootStackParamsList = {
    [RouteStackList.DRAWER]: undefined;
    [RouteStackList.MOVIE]: {
        movieId: number;
    };
    [RouteStackList.PERSON]: {
        cast: CastType;
    };
    [RouteStackList.SEARCH]: undefined;
};

export enum RouteStackList {
    DRAWER = "DrawerContainer",
    MOVIE = "MovieScreen",
    PERSON = "PersonScreen",
    SEARCH = "SearchScreen",
}

export type RootDrawerParamsList = {
    [RouteDrawerList.HOME]: undefined;
    [RouteDrawerList.FAVORITE_MOVIES]: undefined;
};

export enum RouteDrawerList {
    HOME = "HomeScreen",
    FAVORITE_MOVIES = "FavoriteMoviesScreen",
}
