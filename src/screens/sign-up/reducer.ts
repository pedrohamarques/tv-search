export enum PathActionKind {
    INVALID_EMAIL = "INVALID_EMAIL",
    SMALL_PASSWORD = "SMALL_PASSWORD",
    PASSWORDS_DONT_MATCH = "PASSWORDS_DONT_MATCH",
    CLEAR_ERRORS = "CLEAR ERRORS",
}

type InvalidEmailAction = {
    type: PathActionKind.INVALID_EMAIL;
};

type SmallPasswordAction = {
    type: PathActionKind.SMALL_PASSWORD;
};

type PasswordsDontMatchAction = {
    type: PathActionKind.PASSWORDS_DONT_MATCH;
};

type ClearErrors = {
    type: PathActionKind.CLEAR_ERRORS;
};

export type Action =
    | InvalidEmailAction
    | SmallPasswordAction
    | PasswordsDontMatchAction
    | ClearErrors;

type State = {
    hasError: boolean;
    error: string[];
};

export type ErrorState = {
    email: State;
    password: State;
    confirmPassword: State;
};

export function errorSignUpReducer(
    state: ErrorState,
    action: Action,
): ErrorState {
    switch (action.type) {
        case PathActionKind.INVALID_EMAIL: {
            return {
                ...state,
                email: {
                    hasError: true,
                    error: [...state.email.error, "Invalid E-mail"],
                },
            };
        }
        case PathActionKind.PASSWORDS_DONT_MATCH: {
            return {
                ...state,
                password: {
                    hasError: true,
                    error: [
                        ...state.password.error,
                        "The passwords did not match",
                    ],
                },
                confirmPassword: {
                    hasError: true,
                    error: [
                        ...state.password.error,
                        "The passwords did not match",
                    ],
                },
            };
        }
        case PathActionKind.SMALL_PASSWORD: {
            return {
                ...state,
                password: {
                    hasError: true,
                    error: [
                        ...state.password.error,
                        "Password must contain at least 8 characters",
                    ],
                },
                confirmPassword: {
                    ...state.confirmPassword,
                    hasError: true,
                },
            };
        }
        case PathActionKind.CLEAR_ERRORS: {
            return {
                email: {
                    hasError: false,
                    error: [],
                },
                password: {
                    hasError: false,
                    error: [],
                },
                confirmPassword: {
                    hasError: false,
                    error: [],
                },
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
}
