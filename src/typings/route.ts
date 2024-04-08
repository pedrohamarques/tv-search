export type RootStackParamsList = {
    [RouteStackList.DRAWER]: undefined;
    [RouteStackList.MOVIE]: {
        movieId: number;
    };
    [RouteStackList.PERSON]: {
        castId: number;
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
    [RouteDrawerList.FAVORITE_CAST]: undefined;
};

export enum RouteDrawerList {
    HOME = "HomeScreen",
    FAVORITE_MOVIES = "FavoriteMoviesScreen",
    FAVORITE_CAST = "FavoriteCastScreen",
}
