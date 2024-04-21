import reducer, {
    addFavoriteCast,
    addFavoriteMovie,
    removeFavoriteCast,
    removeFavoriteMovie,
} from "../favoritesSlice";

const mockMovieData = {
    id: 1,
    imagePath: "someImage",
    title: "someTitle",
};

const mockCastData = {
    id: 1,
    name: "SomeCast",
    imagePath: "someImage",
};

describe("favoriteSlice", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("returns the initial state", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual({
            movies: [],
            cast: [],
        });
    });

    it("adds a movie when addFavoriteMovie is called", () => {
        const previousState = { movies: [], cast: [] };

        expect(reducer(previousState, addFavoriteMovie(mockMovieData))).toEqual(
            {
                movies: [{ id: 1, imagePath: "someImage", title: "someTitle" }],
                cast: [],
            },
        );
    });

    it("removes a movie when removeFavoriteMovie is called", () => {
        const previousState = {
            movies: [mockMovieData, { ...mockMovieData, id: 2 }],
            cast: [],
        };

        expect(
            reducer(
                previousState,
                removeFavoriteMovie({
                    id: 2,
                    imagePath: "someImage",
                    title: "someTitle",
                }),
            ),
        ).toEqual({
            movies: [{ id: 1, imagePath: "someImage", title: "someTitle" }],
            cast: [],
        });
    });

    it("adds a cast when addFavoriteCast is called", () => {
        const previousState = { movies: [], cast: [] };

        expect(reducer(previousState, addFavoriteCast(mockCastData))).toEqual({
            cast: [{ id: 1, imagePath: "someImage", name: "SomeCast" }],
            movies: [],
        });
    });

    it("removes a cast when removeFavoriteCast is called", () => {
        const previousState = {
            cast: [mockCastData, { ...mockCastData, id: 2 }],
            movies: [],
        };

        expect(
            reducer(
                previousState,
                removeFavoriteCast({
                    id: 2,
                    imagePath: "someImage",
                    name: "someTitle",
                }),
            ),
        ).toEqual({
            cast: [{ id: 1, imagePath: "someImage", name: "SomeCast" }],
            movies: [],
        });
    });
});
