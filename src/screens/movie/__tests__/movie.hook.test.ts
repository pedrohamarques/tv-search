import { act, renderHook, waitFor } from "@testing-library/react-native";

import { useMovieScreen } from "../movie.hook";
import { RouteStackList } from "@typings/route";
import {
    DUMMY_CAST,
    DUMMY_MOVIE_CREDITS,
    DUMMY_MOVIE_DETAILS,
    DUMMY_SIMILAR_MOVIES,
} from "@constants/data";

const mockGoBack = jest.fn();
const mockReplace = jest.fn();

const mockUseRoute = jest.fn();

jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        goBack: mockGoBack,
        replace: mockReplace,
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

const mockToastShow = jest.fn();

jest.mock("react-native-toast-message", () => ({
    show: () => mockToastShow(),
}));

const mockAppState = {
    favorites: {
        movies: [{ id: 1, imagePath: "someImage", title: "someTitle" }],
        cast: [],
    },
};

const mockUseSelector = jest.fn();
const mockUseDispatch = jest.fn();

jest.mock("react-redux", () => ({
    useSelector: (callback: () => void) => mockUseSelector(callback),
    useDispatch: () => () => mockUseDispatch(),
}));

describe("screens/movie/useMovieScreen", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseRoute.mockReturnValue({
            params: {
                movieId: 1,
            },
        });
        mockUseSelector.mockImplementation(callback => callback(mockAppState));
    });

    it("goes to previous screen when handleBackPress is called", () => {
        const { result } = renderHook(() => useMovieScreen());

        act(() => result.current.handleBackPress());

        expect(mockGoBack).toHaveBeenCalledTimes(1);
    });

    it("navigates to person screen when handleCastPress is called", () => {
        const { result } = renderHook(() => useMovieScreen());

        act(() => result.current.handleCastPress(DUMMY_CAST[0]));

        expect(mockReplace).toHaveBeenCalledTimes(1);
        expect(mockReplace).toHaveBeenCalledWith(RouteStackList.PERSON, {
            castId: DUMMY_CAST[0].id,
        });
    });

    it("sets loading to true when movie details is requested", () => {
        const { result } = renderHook(() => useMovieScreen());

        expect(result.current.state.movie).toEqual({
            data: null,
            isLoading: true,
            error: "",
        });
    });

    it("resolves movie details and store them", async () => {
        mockFetchMovieDetails.mockResolvedValueOnce(DUMMY_MOVIE_DETAILS);
        const { result } = renderHook(() => useMovieScreen());

        await waitFor(() =>
            expect(mockFetchMovieDetails).toHaveBeenCalledTimes(1),
        );

        expect(result.current.state.movie).toEqual({
            data: DUMMY_MOVIE_DETAILS,
            isLoading: false,
            error: "",
        });
    });

    it("stores nothing when there is no movie details to be requested", async () => {
        mockFetchMovieDetails.mockResolvedValueOnce(null);
        const { result } = renderHook(() => useMovieScreen());

        await waitFor(() =>
            expect(mockFetchMovieDetails).toHaveBeenCalledTimes(1),
        );

        expect(result.current.state.movie).toEqual({
            data: null,
            isLoading: false,
            error: "There was some error when fetching data",
        });
    });

    it("sets loading to true when similar movies is requested", () => {
        const { result } = renderHook(() => useMovieScreen());

        expect(result.current.state.similarMovies).toEqual({
            data: [],
            isLoading: true,
            error: "",
        });
    });

    it("resolves similar movies and store them", async () => {
        mockFetchSimilarMovies.mockResolvedValueOnce(DUMMY_SIMILAR_MOVIES);
        const { result } = renderHook(() => useMovieScreen());

        await waitFor(() =>
            expect(mockFetchSimilarMovies).toHaveBeenCalledTimes(1),
        );

        expect(result.current.state.similarMovies).toEqual({
            data: DUMMY_SIMILAR_MOVIES.results,
            isLoading: false,
            error: "",
        });
    });

    it("stores nothing when there is error when fetching data", async () => {
        mockFetchSimilarMovies.mockResolvedValueOnce(null);
        const { result } = renderHook(() => useMovieScreen());

        await waitFor(() =>
            expect(mockFetchSimilarMovies).toHaveBeenCalledTimes(1),
        );

        expect(result.current.state.similarMovies).toEqual({
            data: [],
            isLoading: false,
            error: "There was some error when fetching data",
        });
    });

    it("sets loading to true when movie credits is requested", () => {
        const { result } = renderHook(() => useMovieScreen());

        expect(result.current.state.cast).toEqual({
            data: [],
            isLoading: true,
            error: "",
        });
    });

    it("resolves movie credits and store them", async () => {
        mockFetchMovieCredits.mockResolvedValueOnce(DUMMY_MOVIE_CREDITS);
        const { result } = renderHook(() => useMovieScreen());

        await waitFor(() =>
            expect(mockFetchMovieCredits).toHaveBeenCalledTimes(1),
        );

        expect(result.current.state.cast).toEqual({
            data: DUMMY_MOVIE_CREDITS.cast,
            isLoading: false,
            error: "",
        });
    });

    it("stores nothing when there is no movie credits to be requested", async () => {
        mockFetchMovieCredits.mockResolvedValueOnce(null);
        const { result } = renderHook(() => useMovieScreen());

        await waitFor(() =>
            expect(mockFetchMovieCredits).toHaveBeenCalledTimes(1),
        );

        expect(result.current.state.cast).toEqual({
            data: [],
            isLoading: false,
            error: "There was some error when fetching data",
        });
    });

    it("turns isFavorite value to false when handleFavoritePress is called and the movie is already on favorites", async () => {
        mockFetchMovieDetails.mockResolvedValueOnce(DUMMY_MOVIE_DETAILS);

        const { result } = renderHook(() => useMovieScreen());

        expect(result.current.isFavorite).toBe(true);

        await waitFor(() =>
            expect(mockFetchMovieCredits).toHaveBeenCalledTimes(1),
        );

        act(() => result.current.handleFavoritePress());

        expect(mockUseDispatch).toHaveBeenCalledTimes(1);

        expect(mockToastShow).toHaveBeenCalledTimes(1);

        waitFor(() => expect(result.current.isFavorite).toBe(false));
    });

    it("turns isFavorite value to true when handleFavoritePress is called and the movie is not on favorites", async () => {
        mockFetchMovieDetails.mockResolvedValueOnce(DUMMY_MOVIE_DETAILS);

        const mockNewAppState = {
            favorites: {
                movies: [
                    { id: 2, title: "Some title", imagePath: "someImage" },
                ],
            },
        };
        mockUseSelector.mockImplementationOnce(callback =>
            callback(mockNewAppState),
        );
        const { result } = renderHook(() => useMovieScreen());

        expect(result.current.isFavorite).toBe(false);

        await waitFor(() =>
            expect(mockFetchMovieCredits).toHaveBeenCalledTimes(1),
        );

        act(() => result.current.handleFavoritePress());

        expect(mockUseDispatch).toHaveBeenCalledTimes(1);

        expect(mockToastShow).toHaveBeenCalledTimes(1);

        waitFor(() => expect(result.current.isFavorite).toBe(true));
    });
});
