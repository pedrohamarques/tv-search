import { act, renderHook, waitFor } from "@testing-library/react-native";

import { useMovieScreen } from "../movie.hook";
import { RouteStackList } from "@typings/route";
import {
    DUMMY_CAST,
    DUMMY_MOVIE_CREDITS,
    DUMMY_MOVIE_DETAILS,
    DUMMY_SIMILAR_MOVIES,
} from "./dummy";

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();

const mockUseRoute = jest.fn();

jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        goBack: mockGoBack,
        navigate: mockNavigate,
    }),
    useRoute: () => mockUseRoute(),
}));

const mockFetchMovieDetails = jest.fn();
const mockFetchSimilarMovies = jest.fn();
const mockFetchMovieCredits = jest.fn();

jest.mock("@services/use-request", () => ({
    useRequests: () => ({
        fetchMovieDetails: mockFetchMovieDetails,
        fetchSimilarMovies: mockFetchSimilarMovies,
        fetchMovieCredits: mockFetchMovieCredits,
    }),
}));

describe("screens/movie/useMovieScreen", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseRoute.mockReturnValue({
            params: {
                movieDetails: {
                    id: 1,
                },
            },
        });
    });

    it("goes to previous screen when handleBackPress is called", () => {
        const { result } = renderHook(() => useMovieScreen());

        act(() => result.current.handleBackPress());

        expect(mockGoBack).toHaveBeenCalledTimes(1);
    });

    it("navigates to person screen when handleCastPress is called", () => {
        const { result } = renderHook(() => useMovieScreen());

        act(() => result.current.handleCastPress(DUMMY_CAST[0]));

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith(RouteStackList.PERSON, {
            cast: DUMMY_CAST[0],
        });
    });

    it("requests movie details and store them", async () => {
        mockFetchMovieDetails.mockResolvedValueOnce(DUMMY_MOVIE_DETAILS);
        const { result } = renderHook(() => useMovieScreen());

        await waitFor(() =>
            expect(mockFetchMovieDetails).toHaveBeenCalledTimes(1),
        );

        expect(result.current.movie).toEqual(DUMMY_MOVIE_DETAILS);
    });

    it("stores nothing when there is no movie details to be requested", async () => {
        mockFetchMovieDetails.mockResolvedValueOnce(null);
        const { result } = renderHook(() => useMovieScreen());

        await waitFor(() =>
            expect(mockFetchMovieDetails).toHaveBeenCalledTimes(1),
        );

        expect(result.current.movie).toBe(null);
    });

    it("requests similar movies and store them", async () => {
        mockFetchSimilarMovies.mockResolvedValueOnce(DUMMY_SIMILAR_MOVIES);
        const { result } = renderHook(() => useMovieScreen());

        await waitFor(() =>
            expect(mockFetchSimilarMovies).toHaveBeenCalledTimes(1),
        );

        expect(result.current.similarMovies).toEqual(
            DUMMY_SIMILAR_MOVIES.results,
        );
    });

    it("stores nothing when there is no similar movies to be requested", async () => {
        mockFetchSimilarMovies.mockResolvedValueOnce(null);
        const { result } = renderHook(() => useMovieScreen());

        await waitFor(() =>
            expect(mockFetchSimilarMovies).toHaveBeenCalledTimes(1),
        );

        expect(result.current.similarMovies).toEqual([]);
    });

    it("requests movie credits and store them", async () => {
        mockFetchMovieCredits.mockResolvedValueOnce(DUMMY_MOVIE_CREDITS);
        const { result } = renderHook(() => useMovieScreen());

        await waitFor(() =>
            expect(mockFetchMovieCredits).toHaveBeenCalledTimes(1),
        );

        expect(result.current.cast).toEqual(DUMMY_MOVIE_CREDITS.cast);
    });

    it("stores nothing when there is no movie credits to be requested", async () => {
        mockFetchMovieCredits.mockResolvedValueOnce(null);
        const { result } = renderHook(() => useMovieScreen());

        await waitFor(() =>
            expect(mockFetchMovieCredits).toHaveBeenCalledTimes(1),
        );

        expect(result.current.cast).toEqual([]);
    });

    it("updates isFavorites value when handleFavoritePress is called", () => {
        const { result } = renderHook(() => useMovieScreen());

        expect(result.current.isFavorite).toBe(true);

        act(() => result.current.handleFavoritePress());

        waitFor(() => expect(result.current.isFavorite).toBe(false));
    });
});
