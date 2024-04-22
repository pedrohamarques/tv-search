import { act, renderHook, waitFor } from "@testing-library/react-native";

import { useHomeScreen } from "../home.hook";
import { DUMMY_MOVIES } from "@constants/data";

import { RouteStackList } from "@typings/route";

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        navigate: mockNavigate,
    }),
}));

const mockFetchTrendingMovies = jest.fn();
const mockFetchTopRatedMovies = jest.fn();
const mockFetchUpcomingMovies = jest.fn();

jest.mock("@services/use-request", () => ({
    useRequests: () => ({
        fetchTrendingMovies: mockFetchTrendingMovies,
        fetchUpcomingMovies: mockFetchUpcomingMovies,
        fetchTopRatedMovies: mockFetchTopRatedMovies,
    }),
}));

describe("screens/home/useHomeScreen", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("navigates to search screen when handleSearchPress is called", () => {
        const { result } = renderHook(() => useHomeScreen());

        act(() => result.current.handleSearchPress());

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith(RouteStackList.SEARCH);
    });

    it("requests trending movies and store them", async () => {
        mockFetchTrendingMovies.mockResolvedValueOnce({
            results: DUMMY_MOVIES,
        });
        const { result } = renderHook(() => useHomeScreen());

        await waitFor(() =>
            expect(mockFetchTrendingMovies).toHaveBeenCalledTimes(1),
        );

        expect(result.current.movies).toEqual({
            trending: {
                movies: DUMMY_MOVIES,
                isLoading: false,
                error: "",
            },
            upcoming: {
                movies: [],
                isLoading: false,
                error: "There was some error when fetching data",
            },
            topRated: {
                movies: [],
                isLoading: false,
                error: "There was some error when fetching data",
            },
        });
    });

    it("stores nothing when there is no trending movies to be requested", async () => {
        mockFetchTrendingMovies.mockResolvedValueOnce({});
        const { result } = renderHook(() => useHomeScreen());

        await waitFor(() =>
            expect(mockFetchTrendingMovies).toHaveBeenCalledTimes(1),
        );

        expect(result.current.movies).toEqual({
            trending: {
                movies: [],
                isLoading: false,
                error: "There was some error when fetching data",
            },
            upcoming: {
                movies: [],
                isLoading: false,
                error: "There was some error when fetching data",
            },
            topRated: {
                movies: [],
                isLoading: false,
                error: "There was some error when fetching data",
            },
        });
    });

    it("requests upcoming movies and store them", async () => {
        mockFetchUpcomingMovies.mockResolvedValueOnce({
            results: DUMMY_MOVIES,
        });
        const { result } = renderHook(() => useHomeScreen());

        await waitFor(() =>
            expect(mockFetchUpcomingMovies).toHaveBeenCalledTimes(1),
        );

        expect(result.current.movies).toEqual({
            upcoming: {
                movies: DUMMY_MOVIES,
                isLoading: false,
                error: "",
            },
            trending: {
                movies: [],
                isLoading: false,
                error: "There was some error when fetching data",
            },
            topRated: {
                movies: [],
                isLoading: false,
                error: "There was some error when fetching data",
            },
        });
    });

    it("stores nothing when there is no upcoming movies to be requested", async () => {
        mockFetchUpcomingMovies.mockResolvedValueOnce({});
        const { result } = renderHook(() => useHomeScreen());

        await waitFor(() =>
            expect(mockFetchUpcomingMovies).toHaveBeenCalledTimes(1),
        );

        expect(result.current.movies).toEqual({
            trending: {
                movies: [],
                isLoading: false,
                error: "There was some error when fetching data",
            },
            upcoming: {
                movies: [],
                isLoading: false,
                error: "There was some error when fetching data",
            },
            topRated: {
                movies: [],
                isLoading: false,
                error: "There was some error when fetching data",
            },
        });
    });

    it("requests top rated movies and store them", async () => {
        mockFetchTopRatedMovies.mockResolvedValueOnce({
            results: DUMMY_MOVIES,
        });
        const { result } = renderHook(() => useHomeScreen());

        await waitFor(() =>
            expect(mockFetchTopRatedMovies).toHaveBeenCalledTimes(1),
        );

        expect(result.current.movies).toEqual({
            topRated: {
                movies: DUMMY_MOVIES,
                isLoading: false,
                error: "",
            },
            trending: {
                movies: [],
                isLoading: false,
                error: "There was some error when fetching data",
            },
            upcoming: {
                movies: [],
                isLoading: false,
                error: "There was some error when fetching data",
            },
        });
    });
    it("stores nothing when there is no top rated movies to be requested", async () => {
        mockFetchTopRatedMovies.mockResolvedValueOnce({});
        const { result } = renderHook(() => useHomeScreen());

        await waitFor(() =>
            expect(mockFetchTopRatedMovies).toHaveBeenCalledTimes(1),
        );

        expect(result.current.movies).toEqual({
            trending: {
                movies: [],
                isLoading: false,
                error: "There was some error when fetching data",
            },
            upcoming: {
                movies: [],
                isLoading: false,
                error: "There was some error when fetching data",
            },
            topRated: {
                movies: [],
                isLoading: false,
                error: "There was some error when fetching data",
            },
        });
    });

    it("navigates to Profile Screen when handleProfilePress is called", () => {
        const { result } = renderHook(() => useHomeScreen());

        act(() => result.current.handleProfilePress());

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith(RouteStackList.PROFILE);
    });

    it("navigates to Browse Screen when handleSeeAllPress is called", () => {
        mockFetchTopRatedMovies.mockResolvedValueOnce({
            results: DUMMY_MOVIES,
        });

        const { result } = renderHook(() => useHomeScreen());

        act(() => result.current.handleSeeAllPress("topRated"));

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith(
            RouteStackList.BROWSE_MOVIES,
            {
                movies: result.current.movies.topRated.movies,
                route: "topRated",
            },
        );
    });
});
