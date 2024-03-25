export type RootStackParamsList = {
    [RouteStackList.HOME]: undefined;
    [RouteStackList.MOVIE]: { item: any };
    [RouteStackList.PERSON]: undefined;
    [RouteStackList.SEARCH]: undefined;
};

export enum RouteStackList {
    HOME = "HomeScreen",
    MOVIE = "MovieScreen",
    PERSON = "PersonScreen",
    SEARCH = "SearchScreen",
}
