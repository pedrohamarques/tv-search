import { act, renderHook } from "@testing-library/react-native";

import { useFavoriteMoviesScreen } from "../favorite-movies.hook";
import { DUMMY_MOVIES } from "@constants/data";
import { RouteStackList } from "@typings/route";

const mockAppState = {
    favorites: {
        movies: [...DUMMY_MOVIES],
        cast: [],
    },
};

const mockUseSelector = jest.fn();

jest.mock("react-redux", () => ({
    useSelector: (callback: () => void) => mockUseSelector(callback),
}));

const mockNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        navigate: mockNavigate,
    }),
}));

describe("screens/favorite-movies/useFavoriteMoviesScreen", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseSelector.mockImplementation(callback => callback(mockAppState));
    });

    it("fetches movies data from store", () => {
        const { result } = renderHook(() => useFavoriteMoviesScreen());

        expect(mockUseSelector).toHaveBeenCalledTimes(1);

        expect(result.current.movies).toEqual([
            {
                adult: false,
                backdrop_path: "/1XDDXPXGiI8id7MrUxK36ke7gkX.jpg",
                genre_ids: [28, 12, 16, 35, 10751],
                id: 1011985,
                original_language: "en",
                original_title: "Kung Fu Panda 4",
                overview:
                    "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.",
                popularity: 4026.558,
                poster_path: "/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
                release_date: "2024-03-02",
                title: "Kung Fu Panda 4",
                video: false,
                vote_average: 6.994,
                vote_count: 352,
            },
            {
                adult: false,
                backdrop_path: "/1XDDXPXGiI8id7MrUxK36ke7gkX.jpg",
                genre_ids: [28, 12, 16, 35, 10751],
                id: 1011985,
                original_language: "en",
                original_title: "Kung Fu Panda 4",
                overview:
                    "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.",
                popularity: 4026.558,
                poster_path: "/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
                release_date: "2024-03-02",
                title: "Kung Fu Panda 4",
                video: false,
                vote_average: 6.994,
                vote_count: 352,
            },
        ]);
    });

    it("navigates to movie screen when the movie is pressed", () => {
        const { result } = renderHook(() => useFavoriteMoviesScreen());

        act(() =>
            result.current.handleMoviePress({
                id: 1,
                imagePath: "someImage",
                title: "someTitle",
            }),
        );

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith(RouteStackList.MOVIE, {
            movieId: 1,
        });
    });
});
