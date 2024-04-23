import {
    CastType,
    SimilarMovieResult,
    MovieDetailsResponse,
} from "@typings/data";

export enum FetchActionKind {
    REQUEST_SIMILAR_MOVIES = "REQUEST_SIMILAR_MOVIES",
    RESOLVE_SIMILAR_MOVIES = "RESOLVE_SIMILAR_MOVIES",
    ERROR_SIMILAR_MOVIES = "ERROR_SIMILAR_MOVIES",
    REQUEST_CAST = "REQUEST_CAST",
    RESOLVE_CAST = "RESOLVE_CAST",
    ERROR_CAST = "ERROR_CAST",
    REQUEST_MOVIE = "REQUEST_MOVIE",
    RESOLVE_MOVIE = "RESOLVE_MOVIE",
    ERROR_MOVIE = "ERROR_MOVIE",
}

type RequestSimilarMoviesAction = {
    type: FetchActionKind.REQUEST_SIMILAR_MOVIES;
};
type RequestCastAction = { type: FetchActionKind.REQUEST_CAST };
type RequestMovieAction = { type: FetchActionKind.REQUEST_MOVIE };

type ResolveSimilarMoviesAction = {
    type: FetchActionKind.RESOLVE_SIMILAR_MOVIES;
    payload: SimilarMovieResult[];
};
type ResolveCastAction = {
    type: FetchActionKind.RESOLVE_CAST;
    payload: CastType[];
};
type ResolveMovieAction = {
    type: FetchActionKind.RESOLVE_MOVIE;
    payload: MovieDetailsResponse;
};

type ErrorSimilarMoviesAction = {
    type: FetchActionKind.ERROR_SIMILAR_MOVIES;
};
type ErrorCastAction = {
    type: FetchActionKind.ERROR_CAST;
};
type ErrorMovieAction = {
    type: FetchActionKind.ERROR_MOVIE;
};

export type Action =
    | RequestCastAction
    | RequestSimilarMoviesAction
    | ResolveCastAction
    | ResolveSimilarMoviesAction
    | ErrorCastAction
    | ErrorSimilarMoviesAction
    | RequestMovieAction
    | ResolveMovieAction
    | ErrorMovieAction;

type Category<T> = {
    data: T | null;
    error: string;
    isLoading: boolean;
};

export type FetchState = {
    similarMovies: Category<SimilarMovieResult[]>;
    cast: Category<CastType[]>;
    movie: Category<MovieDetailsResponse>;
};

export function fetchMoviesScreenReducer(
    state: FetchState,
    action: Action,
): FetchState {
    switch (action.type) {
        case FetchActionKind.REQUEST_SIMILAR_MOVIES:
            return {
                ...state,
                similarMovies: { ...state.similarMovies, isLoading: true },
            };
        case FetchActionKind.REQUEST_CAST:
            return {
                ...state,
                cast: { ...state.cast, isLoading: true },
            };
        case FetchActionKind.RESOLVE_SIMILAR_MOVIES:
            return {
                ...state,
                similarMovies: {
                    ...state.similarMovies,
                    data: action.payload,
                    isLoading: false,
                },
            };
        case FetchActionKind.RESOLVE_CAST:
            return {
                ...state,
                cast: {
                    ...state.cast,
                    data: action.payload,
                    isLoading: false,
                },
            };
        case FetchActionKind.ERROR_SIMILAR_MOVIES:
            return {
                ...state,
                similarMovies: {
                    ...state.similarMovies,
                    isLoading: false,
                    error: "There was some error when fetching data",
                },
            };
        case FetchActionKind.ERROR_CAST:
            return {
                ...state,
                cast: {
                    ...state.cast,
                    isLoading: false,
                    error: "There was some error when fetching data",
                },
            };
        case FetchActionKind.REQUEST_MOVIE:
            return {
                ...state,
                movie: {
                    ...state.movie,
                    isLoading: true,
                },
            };
        case FetchActionKind.RESOLVE_MOVIE:
            return {
                ...state,
                movie: {
                    ...state.movie,
                    isLoading: false,
                    data: action.payload,
                },
            };
        case FetchActionKind.ERROR_MOVIE:
            return {
                ...state,
                movie: {
                    ...state.movie,
                    isLoading: false,
                    error: "There was some error when fetching data",
                },
            };
        default:
            return state;
    }
}
