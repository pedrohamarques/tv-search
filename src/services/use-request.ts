import axios from "axios";

import { TMDB_API_KEY } from "@env";
import { TrendingMovieResponse } from "@typings/data";

const apiBaseUrl = "https://api.themoviedb.org/3";

const trendingMoviesEndPoint = `${apiBaseUrl}/trending/movie/day?api_key=${TMDB_API_KEY}`;
const upcomingMoviesEndPoint = `${apiBaseUrl}/movie/upcoming?api_key=${TMDB_API_KEY}`;
const topRatedMoviesEndPoint = `${apiBaseUrl}/movie/top_rated?api_key=${TMDB_API_KEY}`;

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
        return apiCall(upcomingMoviesEndPoint, null);
    }

    function fetchTopRatedMovies() {
        return apiCall(topRatedMoviesEndPoint, null);
    }

    return {
        fetchTopRatedMovies,
        fetchTrendingMovies,
        fetchUpcomingMovies,
    };
}
