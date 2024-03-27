import axios from "axios";

import { TMDB_API_KEY } from "@env";
import {
    CastDetails,
    CastMoviesResponse,
    MovieCreditResponse,
    MovieDetailsResponse,
    SimilarMovieResponse,
    TopRatedMovieResponse,
    TrendingMovieResponse,
    UpcomingMovieResponse,
} from "@typings/data";
import { searchMoviesParams, searchMoviesResponse } from "@typings/search";

const apiBaseUrl = "https://api.themoviedb.org/3";

const trendingMoviesEndPoint = `${apiBaseUrl}/trending/movie/day?api_key=${TMDB_API_KEY}`;
const upcomingMoviesEndPoint = `${apiBaseUrl}/movie/upcoming?api_key=${TMDB_API_KEY}`;
const topRatedMoviesEndPoint = `${apiBaseUrl}/movie/top_rated?api_key=${TMDB_API_KEY}`;

const movieDetailsEndPoint = (movieId: number) =>
    `${apiBaseUrl}/movie/${movieId}?api_key=${TMDB_API_KEY}`;

const movieCreditsEndPoint = (movieId: number) =>
    `${apiBaseUrl}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`;

const similarMoviesEndPoint = (movieId: number) =>
    `${apiBaseUrl}/movie/${movieId}/similar?api_key=${TMDB_API_KEY}`;

const personDetailsEndPoint = (id: number) =>
    `${apiBaseUrl}/person/${id}?api_key=${TMDB_API_KEY}`;

const personMoviesEndPoint = (id: number) =>
    `${apiBaseUrl}/person/${id}/movie_credits?api_key=${TMDB_API_KEY}`;

const searchMoviesEndPoint = () =>
    `${apiBaseUrl}/search/movie?api_key=${TMDB_API_KEY}`;
export function useRequests() {
    async function apiCall<T>(endpoint: string, params: null | object) {
        const options = {
            method: "GET",
            url: endpoint,
            params: params ? params : {},
        };

        try {
            const response = await axios.request<T>(options);
            return response.data;
        } catch (error) {
            console.log("error", error);
        }
    }

    function fetchTrendingMovies() {
        return apiCall<TrendingMovieResponse>(trendingMoviesEndPoint, null);
    }

    function fetchUpcomingMovies() {
        return apiCall<UpcomingMovieResponse>(upcomingMoviesEndPoint, null);
    }

    function fetchTopRatedMovies() {
        return apiCall<TopRatedMovieResponse>(topRatedMoviesEndPoint, null);
    }

    function fetchMovieDetails(id: number) {
        return apiCall<MovieDetailsResponse>(movieDetailsEndPoint(id), null);
    }

    function fetchMovieCredits(id: number) {
        return apiCall<MovieCreditResponse>(movieCreditsEndPoint(id), null);
    }

    function fetchSimilarMovies(id: number) {
        return apiCall<SimilarMovieResponse>(similarMoviesEndPoint(id), null);
    }

    function fetchPersonDetails(id: number) {
        return apiCall<CastDetails>(personDetailsEndPoint(id), null);
    }

    function fetchPersonMovies(id: number) {
        return apiCall<CastMoviesResponse>(personMoviesEndPoint(id), null);
    }

    function searchMovies(params: searchMoviesParams) {
        return apiCall<searchMoviesResponse>(searchMoviesEndPoint(), params);
    }

    return {
        fetchTopRatedMovies,
        fetchTrendingMovies,
        fetchUpcomingMovies,
        fetchMovieDetails,
        fetchSimilarMovies,
        fetchMovieCredits,
        fetchPersonDetails,
        fetchPersonMovies,
        searchMovies,
    };
}
