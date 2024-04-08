import { act, renderHook } from "@testing-library/react-native";

import { useFavoriteCastScreen } from "../favorite-cast.hook";
import { DUMMY_PERSON_DETAILS } from "@constants/data";
import { RouteStackList } from "@typings/route";

const mockAppState = {
    favorites: {
        movies: [],
        cast: [DUMMY_PERSON_DETAILS],
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

    it("fetches cast data from store", () => {
        const { result } = renderHook(() => useFavoriteCastScreen());

        expect(mockUseSelector).toHaveBeenCalledTimes(1);

        expect(result.current.cast).toEqual([
            {
                adult: false,
                also_known_as: ["Vito Chiari", "Vito Annicchiarico"],
                biography: "",
                birthday: "1934-02-26",
                deathday: "2022-08-05",
                gender: 2,
                homepage: null,
                id: 4423,
                imdb_id: "nm0030383",
                known_for_department: "Acting",
                name: "Vito Annichiarico",
                place_of_birth: "Grottaglie, Italy",
                popularity: 0.6,
                profile_path: null,
            },
        ]);
    });

    it("navigates to cast screen when the movie is pressed", () => {
        const { result } = renderHook(() => useFavoriteCastScreen());

        act(() =>
            result.current.handleCastPress({
                id: 1,
                imagePath: "someImage",
                name: "someTitle",
            }),
        );

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith(RouteStackList.PERSON, {
            castId: 1,
        });
    });
});
