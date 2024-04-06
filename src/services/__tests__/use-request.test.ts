import {
    DUMMY_MOVIES,
    DUMMY_MOVIE_CREDITS,
    DUMMY_MOVIE_DETAILS,
    DUMMY_PERSON_DETAILS,
    DUMMY_PERSON_MOVIES,
    DUMMY_SIMILAR_MOVIES,
} from "@constants/data";
import { useRequests } from "@services/use-request";
import { act, renderHook } from "@testing-library/react-native";
import Toast from "react-native-toast-message";

const mockRequest = jest.fn();

jest.mock("axios", () => ({
    request: () => mockRequest(),
}));

const spyToast = jest.spyOn(Toast, "show");

const params = {
    query: "someQuery",
    include_adult: "true",
    language: "en",
    page: "1",
};

describe("services/useRequests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("returns the data when fetchTrendingMovies is called successfully", async () => {
        mockRequest.mockResolvedValueOnce({ data: DUMMY_MOVIES });

        const { result } = renderHook(() => useRequests());

        await act(() => result.current.fetchTrendingMovies());

        expect(mockRequest).toHaveBeenCalledTimes(1);

        expect(spyToast).not.toHaveBeenCalled();
    });

    it("shows toast error when fetchTrendingMovies is called and does not fetch data", async () => {
        mockRequest.mockRejectedValueOnce(new Error("some error"));

        const { result } = renderHook(() => useRequests());

        await act(() => result.current.fetchTrendingMovies());

        expect(mockRequest).toHaveBeenCalledTimes(1);

        expect(spyToast).toHaveBeenCalledTimes(1);
        expect(spyToast).toHaveBeenCalledWith({
            type: "error",
            text1: "There was some error when fetching data",
            text2: "Please, try again in a few minutes",
        });
    });

    it("returns the data when fetchUpcomingMovies is called successfully", async () => {
        mockRequest.mockResolvedValueOnce({ data: DUMMY_MOVIES });

        const { result } = renderHook(() => useRequests());

        await act(() => result.current.fetchUpcomingMovies());

        expect(mockRequest).toHaveBeenCalledTimes(1);

        expect(spyToast).not.toHaveBeenCalled();
    });

    it("shows toast error when fetchUpcomingMovies is called and does not fetch data", async () => {
        mockRequest.mockRejectedValueOnce(new Error("some error"));

        const { result } = renderHook(() => useRequests());

        await act(() => result.current.fetchUpcomingMovies());

        expect(mockRequest).toHaveBeenCalledTimes(1);

        expect(spyToast).toHaveBeenCalledTimes(1);
        expect(spyToast).toHaveBeenCalledWith({
            type: "error",
            text1: "There was some error when fetching data",
            text2: "Please, try again in a few minutes",
        });
    });

    it("returns the data when fetchTopRatedMovies is called successfully", async () => {
        mockRequest.mockResolvedValueOnce({ data: DUMMY_MOVIES });

        const { result } = renderHook(() => useRequests());

        await act(() => result.current.fetchTopRatedMovies());

        expect(mockRequest).toHaveBeenCalledTimes(1);

        expect(spyToast).not.toHaveBeenCalled();
    });

    it("shows toast error when fetchTopRatedMovies is called and does not fetch data", async () => {
        mockRequest.mockRejectedValueOnce(new Error("some error"));

        const { result } = renderHook(() => useRequests());

        await act(() => result.current.fetchTopRatedMovies());

        expect(mockRequest).toHaveBeenCalledTimes(1);

        expect(spyToast).toHaveBeenCalledTimes(1);
        expect(spyToast).toHaveBeenCalledWith({
            type: "error",
            text1: "There was some error when fetching data",
            text2: "Please, try again in a few minutes",
        });
    });

    it("returns the data when fetchMovieCredits is called successfully", async () => {
        mockRequest.mockResolvedValueOnce({ data: DUMMY_MOVIE_CREDITS });

        const { result } = renderHook(() => useRequests());

        await act(() => result.current.fetchMovieCredits(1123));

        expect(mockRequest).toHaveBeenCalledTimes(1);

        expect(spyToast).not.toHaveBeenCalled();
    });

    it("shows toast error when fetchMovieCredits is called and does not fetch data", async () => {
        mockRequest.mockRejectedValueOnce(new Error("some error"));

        const { result } = renderHook(() => useRequests());

        await act(() => result.current.fetchMovieCredits(1123));

        expect(mockRequest).toHaveBeenCalledTimes(1);

        expect(spyToast).toHaveBeenCalledTimes(1);
        expect(spyToast).toHaveBeenCalledWith({
            type: "error",
            text1: "There was some error when fetching data",
            text2: "Please, try again in a few minutes",
        });
    });

    it("returns the data when fetchMovieDetails is called successfully", async () => {
        mockRequest.mockResolvedValueOnce({ data: DUMMY_MOVIE_DETAILS });

        const { result } = renderHook(() => useRequests());

        await act(() => result.current.fetchMovieDetails(1123));

        expect(mockRequest).toHaveBeenCalledTimes(1);

        expect(spyToast).not.toHaveBeenCalled();
    });

    it("shows toast error when fetchMovieDetails is called and does not fetch data", async () => {
        mockRequest.mockRejectedValueOnce(new Error("some error"));

        const { result } = renderHook(() => useRequests());

        await act(() => result.current.fetchMovieDetails(1123));

        expect(mockRequest).toHaveBeenCalledTimes(1);

        expect(spyToast).toHaveBeenCalledTimes(1);
        expect(spyToast).toHaveBeenCalledWith({
            type: "error",
            text1: "There was some error when fetching data",
            text2: "Please, try again in a few minutes",
        });
    });

    it("returns the data when fetchSimilarMovies is called successfully", async () => {
        mockRequest.mockResolvedValueOnce({ data: DUMMY_SIMILAR_MOVIES });

        const { result } = renderHook(() => useRequests());

        await act(() => result.current.fetchSimilarMovies(1123));

        expect(mockRequest).toHaveBeenCalledTimes(1);

        expect(spyToast).not.toHaveBeenCalled();
    });

    it("shows toast error when fetchSimilarMovies is called and does not fetch data", async () => {
        mockRequest.mockRejectedValueOnce(new Error("some error"));

        const { result } = renderHook(() => useRequests());

        await act(() => result.current.fetchSimilarMovies(1123));

        expect(mockRequest).toHaveBeenCalledTimes(1);

        expect(spyToast).toHaveBeenCalledTimes(1);
        expect(spyToast).toHaveBeenCalledWith({
            type: "error",
            text1: "There was some error when fetching data",
            text2: "Please, try again in a few minutes",
        });
    });

    it("returns the data when fetchPersonDetails is called successfully", async () => {
        mockRequest.mockResolvedValueOnce({ data: DUMMY_PERSON_DETAILS });

        const { result } = renderHook(() => useRequests());

        await act(() => result.current.fetchPersonDetails(1123));

        expect(mockRequest).toHaveBeenCalledTimes(1);

        expect(spyToast).not.toHaveBeenCalled();
    });

    it("shows toast error when fetchPersonDetails is called and does not fetch data", async () => {
        mockRequest.mockRejectedValueOnce(new Error("some error"));

        const { result } = renderHook(() => useRequests());

        await act(() => result.current.fetchPersonDetails(1123));

        expect(mockRequest).toHaveBeenCalledTimes(1);

        expect(spyToast).toHaveBeenCalledTimes(1);
        expect(spyToast).toHaveBeenCalledWith({
            type: "error",
            text1: "There was some error when fetching data",
            text2: "Please, try again in a few minutes",
        });
    });

    it("returns the data when fetchPersonMovies is called successfully", async () => {
        mockRequest.mockResolvedValueOnce({ data: DUMMY_PERSON_MOVIES });

        const { result } = renderHook(() => useRequests());

        await act(() => result.current.fetchPersonMovies(1123));

        expect(mockRequest).toHaveBeenCalledTimes(1);

        expect(spyToast).not.toHaveBeenCalled();
    });

    it("shows toast error when fetchPersonMovies is called and does not fetch data", async () => {
        mockRequest.mockRejectedValueOnce(new Error("some error"));

        const { result } = renderHook(() => useRequests());

        await act(() => result.current.fetchPersonMovies(1123));

        expect(mockRequest).toHaveBeenCalledTimes(1);

        expect(spyToast).toHaveBeenCalledTimes(1);
        expect(spyToast).toHaveBeenCalledWith({
            type: "error",
            text1: "There was some error when fetching data",
            text2: "Please, try again in a few minutes",
        });
    });

    it("returns the data when searchMovies is called successfully", async () => {
        mockRequest.mockResolvedValueOnce({ data: DUMMY_PERSON_MOVIES });

        const { result } = renderHook(() => useRequests());

        await act(() => result.current.searchMovies(params));

        expect(mockRequest).toHaveBeenCalledTimes(1);

        expect(spyToast).not.toHaveBeenCalled();
    });

    it("shows toast error when searchMovies is called and does not fetch data", async () => {
        mockRequest.mockRejectedValueOnce(new Error("some error"));

        const { result } = renderHook(() => useRequests());

        await act(() => result.current.searchMovies(params));

        expect(mockRequest).toHaveBeenCalledTimes(1);

        expect(spyToast).toHaveBeenCalledTimes(1);
        expect(spyToast).toHaveBeenCalledWith({
            type: "error",
            text1: "There was some error when fetching data",
            text2: "Please, try again in a few minutes",
        });
    });
});
