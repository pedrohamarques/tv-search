export type FavoriteMoviesState = {
    title: string;
    id: number;
    imagePath: string;
};

export type FavoriteCastState = {
    name: string;
    id: number;
    imagePath: string;
};

export type AuthenticationState = {
    email: string;
    password: string;
    isAuthenticated: boolean;
};
