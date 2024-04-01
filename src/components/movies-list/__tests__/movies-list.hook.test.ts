import { act, renderHook } from "@testing-library/react-native";

import { useMoviesList } from "../movies.list.hook";
import { DUMMY_MOVIES } from "./dummy";
import { RouteStackList } from "@typings/route";

const mockPush = jest.fn();

jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        push: mockPush,
    }),
}));

describe("components/movies-list/useMoviesList", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("navigates to Movie Screen when handlePress is called", () => {
        const { result } = renderHook(() => useMoviesList());

        act(() => result.current.handlePress(DUMMY_MOVIES[0]));

        expect(mockPush).toHaveBeenCalledTimes(1);
        expect(mockPush).toHaveBeenCalledWith(RouteStackList.MOVIE, {
            movieId: DUMMY_MOVIES[0].id,
        });
    });
});
