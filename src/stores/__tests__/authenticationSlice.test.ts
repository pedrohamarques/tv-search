import reducer, { login, logout } from "../authenticationSlice";

const mockUserCredentialsState = {
    email: "john@test.com",
    password: "123",
    isAuthenticated: true,
};

describe("authenticationSlice", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("returns the initialState", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual({
            email: "",
            password: "",
            isAuthenticated: false,
        });
    });

    it("authenticated the user when login is called", () => {
        const previousState = {
            email: "",
            password: "",
            isAuthenticated: false,
        };

        expect(reducer(previousState, login(mockUserCredentialsState))).toEqual(
            {
                email: "john@test.com",
                password: "123",
                isAuthenticated: true,
            },
        );
    });

    it("remove authentication the user when logout is called", () => {
        expect(reducer(mockUserCredentialsState, logout())).toEqual({
            email: "",
            password: "",
            isAuthenticated: false,
        });
    });
});
