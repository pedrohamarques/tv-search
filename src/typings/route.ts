import {
    CastType,
    TopRatedMovieResults,
    TrendingMoveResults,
    UpcomingMovieResults,
} from "./data";

export type RootStackParamsList = {
    [RouteStackList.HOME]: undefined;
    [RouteStackList.MOVIE]: {
        movieDetails:
            | TrendingMoveResults
            | UpcomingMovieResults
            | TopRatedMovieResults;
    };
    [RouteStackList.PERSON]: {
        cast: CastType;
    };
    [RouteStackList.SEARCH]: undefined;
};

export enum RouteStackList {
    HOME = "HomeScreen",
    MOVIE = "MovieScreen",
    PERSON = "PersonScreen",
    SEARCH = "SearchScreen",
}
