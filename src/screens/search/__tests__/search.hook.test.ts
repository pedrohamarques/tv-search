import { act, renderHook, waitFor } from "@testing-library/react-native";

import { useSearchScreen } from "../search.hook";
import { DUMMY_MOVIE, DUMMY_SEARCH_RESULTS } from "./dummy";

import { RouteStackList } from "@typings/route";

const mockNavigate = jest.fn();
const mockPush = jest.fn();

jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        navigate: mockNavigate,
        push: mockPush,
    }),
}));

const mockSearchMovies = jest.fn();

jest.mock("@services/use-request", () => ({
    useRequests: () => ({
        searchMovies: mockSearchMovies,
    }),
}));

describe("screens/search/useSearchScreen", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("navigates to home screen when handleClosePress is called", () => {
        const { result } = renderHook(() => useSearchScreen());

        act(() => result.current.handleClosePress());

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith(RouteStackList.HOME);
    });

    it("navigates to movie screen when handleItemPress is called", () => {
        const { result } = renderHook(() => useSearchScreen());

        act(() => result.current.handleItemPress(DUMMY_MOVIE));

        expect(mockPush).toHaveBeenCalledTimes(1);
        expect(mockPush).toHaveBeenCalledWith(RouteStackList.MOVIE, {
            movieDetails: DUMMY_MOVIE,
        });
    });

    it("does not fetch the data when handleSearch is called with a value with less than 3 characters", async () => {
        const { result } = renderHook(() => useSearchScreen());

        act(() => result.current.handleTextDebounce("ab"));

        await waitFor(() => expect(result.current.searchedMovies).toEqual([]));
    });

    it("fetches the data when handleSearch is called with a value with more than 2 characters", async () => {
        mockSearchMovies.mockResolvedValueOnce(DUMMY_SEARCH_RESULTS);

        const { result } = renderHook(() => useSearchScreen());

        act(() => result.current.handleTextDebounce("Hulk"));

        await waitFor(() =>
            expect(result.current.searchedMovies).toEqual(
                DUMMY_SEARCH_RESULTS.results,
            ),
        );
    });
});
