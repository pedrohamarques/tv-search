import { TrendingMoveResults } from "./data";

export type RootStackParamsList = {
    [RouteStackList.HOME]: undefined;
    [RouteStackList.MOVIE]: { movieDetails: TrendingMoveResults };
    [RouteStackList.PERSON]: undefined;
    [RouteStackList.SEARCH]: undefined;
};

export enum RouteStackList {
    HOME = "HomeScreen",
    MOVIE = "MovieScreen",
    PERSON = "PersonScreen",
    SEARCH = "SearchScreen",
}
