export type RootStackParamsList = {
    [RouteStackList.HOME]: undefined;
    [RouteStackList.MOVIE]: { item: any };
};

export enum RouteStackList {
    HOME = "HomeScreen",
    MOVIE = "MovieScreen",
}
