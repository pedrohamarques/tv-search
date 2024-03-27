import { act, renderHook } from "@testing-library/react-native";

import { useTrendingMovies } from "../trending-movies.hook";
import { DUMMY_MOVIES } from "./dummy";
import { RouteStackList } from "@typings/route";

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        navigate: mockNavigate,
    }),
}));

describe("components/trending-movies/useTrendingMovies", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("navigates to Movie Screen when handleCardPress is called", () => {
        const { result } = renderHook(() => useTrendingMovies());

        act(() => result.current.handleCardPress(DUMMY_MOVIES[0]));

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith(RouteStackList.MOVIE, {
            movieDetails: DUMMY_MOVIES[0],
        });
    });
});
