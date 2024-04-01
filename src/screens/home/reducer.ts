import {
    TopRatedMovieResults,
    TrendingMovieResults,
    UpcomingMovieResults,
} from "@typings/data";

export enum FetchActionKind {
    REQUEST_TRENDING = "REQUEST_TRENDING",
    RESOLVE_TRENDING = "RESOLVE_TRENDING",
    ERROR_TRENDING = "ERROR_TRENDING",
    REQUEST_UPCOMING = "REQUEST_UPCOMING",
    RESOLVE_UPCOMING = "RESOLVE_UPCOMING",
    ERROR_UPCOMING = "ERROR_UPCOMING",
    REQUEST_TOP_RATED = "REQUEST_TOP_RATED",
    RESOLVE_TOP_RATED = "RESOLVE_TOP_RATED",
    ERROR_TOP_RATED = "ERROR_TOP_RATED",
}

type RequestTrendingAction = { type: FetchActionKind.REQUEST_TRENDING };
type RequestUpcomingAction = { type: FetchActionKind.REQUEST_UPCOMING };
type RequestTopRatedAction = { type: FetchActionKind.REQUEST_TOP_RATED };

type ResolveTrendingAction = {
    type: FetchActionKind.RESOLVE_TRENDING;
    payload: TrendingMovieResults[];
};
type ResolveUpcomingAction = {
    type: FetchActionKind.RESOLVE_UPCOMING;
    payload: UpcomingMovieResults[];
};
type ResolveTopRatedAction = {
    type: FetchActionKind.RESOLVE_TOP_RATED;
    payload: TopRatedMovieResults[];
};

type ErrorTrendingAction = {
    type: FetchActionKind.ERROR_TRENDING;
};
type ErrorUpcomingAction = {
    type: FetchActionKind.ERROR_UPCOMING;
};

type ErrorTopRatedAction = {
    type: FetchActionKind.ERROR_TOP_RATED;
};

export type Action =
    | RequestTrendingAction
    | RequestUpcomingAction
    | RequestTopRatedAction
    | ResolveTrendingAction
    | ResolveUpcomingAction
    | ResolveTopRatedAction
    | ErrorTopRatedAction
    | ErrorTrendingAction
    | ErrorUpcomingAction;

type MovieState<T> = {
    movies: T;
    error: string;
    isLoading: boolean;
};

export type FetchState = {
    trending: MovieState<TrendingMovieResults[]>;
    upcoming: MovieState<UpcomingMovieResults[]>;
    topRated: MovieState<TopRatedMovieResults[]>;
};

export function fetchMoviesReducer(
    state: FetchState,
    action: Action,
): FetchState {
    switch (action.type) {
        case FetchActionKind.REQUEST_TRENDING:
            return {
                ...state,
                trending: { ...state.trending, isLoading: true },
            };
        case FetchActionKind.RESOLVE_TRENDING:
            return {
                ...state,
                trending: {
                    ...state.trending,
                    movies: action.payload,
                    isLoading: false,
                },
            };
        case FetchActionKind.ERROR_TRENDING:
            return {
                ...state,
                trending: {
                    ...state.trending,
                    isLoading: false,
                    error: "There was some error when fetching data",
                },
            };
        case FetchActionKind.REQUEST_UPCOMING:
            return {
                ...state,
                upcoming: { ...state.upcoming, isLoading: true },
            };
        case FetchActionKind.RESOLVE_UPCOMING:
            return {
                ...state,
                upcoming: {
                    ...state.upcoming,
                    movies: action.payload,
                    isLoading: false,
                },
            };
        case FetchActionKind.ERROR_UPCOMING:
            return {
                ...state,
                upcoming: {
                    ...state.upcoming,
                    isLoading: false,
                    error: "There was some error when fetching data",
                },
            };
        case FetchActionKind.REQUEST_TOP_RATED:
            return {
                ...state,
                topRated: { ...state.topRated, isLoading: true },
            };
        case FetchActionKind.RESOLVE_TOP_RATED:
            return {
                ...state,
                topRated: {
                    ...state.topRated,
                    movies: action.payload,
                    isLoading: false,
                },
            };
        case FetchActionKind.ERROR_TOP_RATED:
            return {
                ...state,
                topRated: {
                    ...state.topRated,
                    isLoading: false,
                    error: "There was some error when fetching data",
                },
            };
        default:
            return state;
    }
}
