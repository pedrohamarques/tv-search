export type searchMoviesParams = {
    query: string;
    include_adult: string;
    language: string;
    page: string;
};

export interface searchMoviesResponse {
    page: number;
    results: searchMoviesResults[];
    total_pages: number;
    total_results: number;
}

export interface searchMoviesResults {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
