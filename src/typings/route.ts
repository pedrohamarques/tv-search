import { TopRatedMovieResults, UpcomingMovieResults } from "./data";

export enum RouteDrawerList {
    HOME = "HomeScreen",
    FAVORITE_MOVIES = "FavoriteMoviesScreen",
    FAVORITE_CAST = "FavoriteCastScreen",
}

export enum RouteStackList {
    DRAWER = "DrawerContainer",
    MOVIE = "MovieScreen",
    PERSON = "PersonScreen",
    SEARCH = "SearchScreen",
    PROFILE = "ProfileScreen",
    BROWSE_MOVIES = "BrowseMoviesScreen",
}

export enum PublicStackList {
    WELCOME = "WelcomeScreen",
}

export type RootDrawerParamsList = {
    [RouteDrawerList.HOME]: undefined;
    [RouteDrawerList.FAVORITE_MOVIES]: undefined;
    [RouteDrawerList.FAVORITE_CAST]: undefined;
};

export type RootStackParamsList = {
    [RouteStackList.DRAWER]: undefined;
    [RouteStackList.MOVIE]: {
        movieId: number;
    };
    [RouteStackList.PERSON]: {
        castId: number;
    };
    [RouteStackList.SEARCH]: undefined;
    [RouteStackList.PROFILE]: undefined;
    [RouteStackList.BROWSE_MOVIES]: {
        movies: UpcomingMovieResults[] | TopRatedMovieResults[];
        route: "upcoming" | "topRated";
    };
};

export type PublicStackParamsList = {
    [PublicStackList.WELCOME]: undefined;
};
