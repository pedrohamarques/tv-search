import { act, renderHook, waitFor } from "@testing-library/react-native";

import { usePersonScreen } from "../person.hook";
import { DUMMY_PERSON_DETAILS, DUMMY_PERSON_MOVIES } from "@constants/data";

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

const mockToastShow = jest.fn();

jest.mock("react-native-toast-message", () => ({
    show: () => mockToastShow(),
}));

const mockAppState = {
    favorites: {
        movies: [],
        cast: [{ id: 1, imagePath: "someImage", name: "someTitle" }],
    },
};

const mockUseSelector = jest.fn();
const mockUseDispatch = jest.fn();

jest.mock("react-redux", () => ({
    useSelector: (callback: () => void) => mockUseSelector(callback),
    useDispatch: () => () => mockUseDispatch(),
}));

describe("screens/person/usePersonScreen", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseRoute.mockReturnValue({
            params: {
                castId: 1,
            },
        });
        mockUseSelector.mockImplementation(callback => callback(mockAppState));
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

    it("turns isFavorite value to false when handleFavoritePress is called and the cast is already on favorites", async () => {
        mockFetchPersonDetails.mockResolvedValueOnce(DUMMY_PERSON_MOVIES);

        const { result } = renderHook(() => usePersonScreen());

        expect(result.current.isFavorite).toBe(true);

        await waitFor(() =>
            expect(mockFetchPersonDetails).toHaveBeenCalledTimes(1),
        );

        act(() => result.current.handleFavoritePress());

        expect(mockUseDispatch).toHaveBeenCalledTimes(1);

        expect(mockToastShow).toHaveBeenCalledTimes(1);

        waitFor(() => expect(result.current.isFavorite).toBe(false));
    });

    it("turns isFavorite value to true when handleFavoritePress is called and the cast is not on favorites", async () => {
        mockFetchPersonDetails.mockResolvedValueOnce(DUMMY_PERSON_MOVIES);

        const mockNewAppState = {
            favorites: {
                movies: [],
                cast: [{ id: 2, name: "Some title", imagePath: "someImage" }],
            },
        };
        mockUseSelector.mockImplementationOnce(callback =>
            callback(mockNewAppState),
        );
        const { result } = renderHook(() => usePersonScreen());

        expect(result.current.isFavorite).toBe(false);

        await waitFor(() =>
            expect(mockFetchPersonDetails).toHaveBeenCalledTimes(1),
        );

        act(() => result.current.handleFavoritePress());

        expect(mockUseDispatch).toHaveBeenCalledTimes(1);

        expect(mockToastShow).toHaveBeenCalledTimes(1);

        waitFor(() => expect(result.current.isFavorite).toBe(true));
    });
});
