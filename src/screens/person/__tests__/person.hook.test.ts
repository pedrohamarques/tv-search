import { act, renderHook, waitFor } from "@testing-library/react-native";

import { usePersonScreen } from "../person.hook";
import { DUMMY_PERSON_DETAILS, DUMMY_PERSON_MOVIES } from "./dummy";

const mockUseRoute = jest.fn();

const mockGoBack = jest.fn();

jest.mock("@react-navigation/native", () => ({
    useRoute: () => mockUseRoute(),
    useNavigation: () => ({
        goBack: mockGoBack,
    }),
}));

const mockFetchPersonDetails = jest.fn();
const mockFetchPersonMovies = jest.fn();

jest.mock("@services/use-request", () => ({
    useRequests: () => ({
        fetchPersonDetails: mockFetchPersonDetails,
        fetchPersonMovies: mockFetchPersonMovies,
    }),
}));

describe("screens/person/usePersonScreen", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseRoute.mockReturnValue({
            params: {
                cast: {
                    id: 1,
                },
            },
        });
    });

    it("updates isFavorites value when handleFavoritePress is called", () => {
        const { result } = renderHook(() => usePersonScreen());

        expect(result.current.isFavorite).toBe(false);

        act(() => result.current.handleFavoritePress());

        waitFor(() => expect(result.current.isFavorite).toBe(true));
    });

    it("goes to previous screen when handleBAckPress is called", () => {
        const { result } = renderHook(() => usePersonScreen());

        act(() => result.current.handleBackPress());

        expect(mockGoBack).toHaveBeenCalledTimes(1);
    });

    it("requests movie credits and store them", async () => {
        mockFetchPersonDetails.mockResolvedValueOnce(DUMMY_PERSON_DETAILS);
        const { result } = renderHook(() => usePersonScreen());

        await waitFor(() =>
            expect(mockFetchPersonDetails).toHaveBeenCalledTimes(1),
        );

        expect(result.current.personDetails).toEqual(DUMMY_PERSON_DETAILS);
    });

    it("stores nothing when there is no movie credits to be requested", async () => {
        mockFetchPersonDetails.mockResolvedValueOnce(null);
        const { result } = renderHook(() => usePersonScreen());

        await waitFor(() =>
            expect(mockFetchPersonDetails).toHaveBeenCalledTimes(1),
        );

        expect(result.current.personDetails).toBeNull();
    });

    it("requests movie credits and store them", async () => {
        mockFetchPersonMovies.mockResolvedValueOnce(DUMMY_PERSON_MOVIES);
        const { result } = renderHook(() => usePersonScreen());

        await waitFor(() =>
            expect(mockFetchPersonMovies).toHaveBeenCalledTimes(1),
        );

        expect(result.current.personMovies).toEqual(DUMMY_PERSON_MOVIES.cast);
    });

    it("stores nothing when there is no movie credits to be requested", async () => {
        mockFetchPersonMovies.mockResolvedValueOnce(null);
        const { result } = renderHook(() => usePersonScreen());

        await waitFor(() =>
            expect(mockFetchPersonMovies).toHaveBeenCalledTimes(1),
        );

        expect(result.current.personMovies).toEqual([]);
    });
});
