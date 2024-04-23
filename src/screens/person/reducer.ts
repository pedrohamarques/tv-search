import { CastDetails, CastMovies } from "@typings/data";

export enum FetchActionKind {
    REQUEST_PERSON_MOVIES = "REQUEST_PERSON_MOVIES",
    RESOLVE_PERSON_MOVIES = "RESOLVE_PERSON_MOVIES",
    ERROR_PERSON_MOVIES = "ERROR_PERSON_MOVIES",
    REQUEST_PERSON_DETAILS = "REQUEST_PERSON_DETAILS",
    RESOLVE_PERSON_DETAILS = "RESOLVE_PERSON_DETAILS",
    ERROR_PERSON_DETAILS = "ERROR_PERSON_DETAILS",
}

type RequestPersonMoviesAction = {
    type: FetchActionKind.REQUEST_PERSON_MOVIES;
};
type RequestPersonDetailsAction = {
    type: FetchActionKind.REQUEST_PERSON_DETAILS;
};

type ResolvePersonMoviesAction = {
    type: FetchActionKind.RESOLVE_PERSON_MOVIES;
    payload: CastMovies[];
};
type ResolvePersonDetailsAction = {
    type: FetchActionKind.RESOLVE_PERSON_DETAILS;
    payload: CastDetails;
};

type ErrorPersonMoviesAction = {
    type: FetchActionKind.ERROR_PERSON_MOVIES;
};

type ErrorPersonDetailsAction = {
    type: FetchActionKind.ERROR_PERSON_DETAILS;
};

export type Action =
    | RequestPersonDetailsAction
    | RequestPersonMoviesAction
    | ResolvePersonDetailsAction
    | ResolvePersonMoviesAction
    | ErrorPersonDetailsAction
    | ErrorPersonMoviesAction;

type State<T> = {
    data: T | null;
    error: string;
    isLoading: boolean;
};

export type FetchState = {
    personMovies: State<CastMovies[]>;
    personDetails: State<CastDetails>;
};

export function fetchCastScreenReducer(
    state: FetchState,
    action: Action,
): FetchState {
    switch (action.type) {
        case FetchActionKind.REQUEST_PERSON_DETAILS:
            return {
                ...state,
                personDetails: { ...state.personDetails, isLoading: true },
            };
        case FetchActionKind.REQUEST_PERSON_MOVIES:
            return {
                ...state,
                personMovies: { ...state.personMovies, isLoading: true },
            };
        case FetchActionKind.RESOLVE_PERSON_DETAILS:
            return {
                ...state,
                personDetails: {
                    ...state.personDetails,
                    data: action.payload,
                    isLoading: false,
                },
            };
        case FetchActionKind.RESOLVE_PERSON_MOVIES:
            return {
                ...state,
                personMovies: {
                    ...state.personMovies,
                    data: action.payload,
                    isLoading: false,
                },
            };
        case FetchActionKind.ERROR_PERSON_DETAILS:
            return {
                ...state,
                personDetails: {
                    ...state.personDetails,
                    isLoading: false,
                    error: "There was some error when fetching data",
                },
            };
        case FetchActionKind.ERROR_PERSON_MOVIES:
            return {
                ...state,
                personMovies: {
                    ...state.personMovies,
                    isLoading: false,
                    error: "There was some error when fetching data",
                },
            };
        default:
            return state;
    }
}
