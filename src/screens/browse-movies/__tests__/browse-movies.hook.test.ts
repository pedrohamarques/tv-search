import { act, renderHook } from "@testing-library/react-native";

import { DUMMY_MOVIES } from "@constants/data";

import { useBrowseMoviesScreen } from "../browse-movies.hook";

import { RouteStackList } from "@typings/route";

const mockGoBack = jest.fn();
const mockPush = jest.fn();
const mockUseRoute = jest.fn();

jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        goBack: mockGoBack,
        push: mockPush,
    }),
    useRoute: () => mockUseRoute(),
}));

describe("screens/browse-movies/useBrowseMoviesScreen", () => {
    beforeAll(() => {
        jest.clearAllMocks();
        mockUseRoute.mockReturnValue({
            params: {
                movies: DUMMY_MOVIES,
                route: "topRated",
            },
        });
    });

    it("navigates to previous screen when handleGoBackPress is called", () => {
        const { result } = renderHook(() => useBrowseMoviesScreen());

        act(() => result.current.handleGoBackPress());

        expect(mockGoBack).toHaveBeenCalledTimes(1);
    });

    it("navigates to movie screen when movie item is pressed", () => {
        const { result } = renderHook(() => useBrowseMoviesScreen());

        act(() => result.current.handleItemPress(DUMMY_MOVIES[0]));

        expect(mockPush).toHaveBeenCalledTimes(1);
        expect(mockPush).toHaveBeenCalledWith(RouteStackList.MOVIE, {
            movieId: 1011985,
        });
    });
});
