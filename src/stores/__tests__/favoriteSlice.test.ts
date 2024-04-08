import reducer, {
    addFavoriteMovie,
    removeFavoriteMovie,
} from "../favoritesSlice";

const mockMovieData = {
    id: 1,
    imagePath: "someImage",
    title: "someTitle",
};

describe("favoriteSlice", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("returns the initial state", () => {
        expect(reducer(undefined, { type: "unknown" })).toEqual({
            movies: [],
        });
    });

    it("adds a movie when addFavorite is called", () => {
        const previousState = { movies: [] };

        expect(reducer(previousState, addFavoriteMovie(mockMovieData))).toEqual(
            {
                movies: [{ id: 1, imagePath: "someImage", title: "someTitle" }],
            },
        );
    });

    it("removes a movie when removeFavorite is called", () => {
        const previousState = {
            movies: [mockMovieData, { ...mockMovieData, id: 2 }],
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
        });
    });
});
