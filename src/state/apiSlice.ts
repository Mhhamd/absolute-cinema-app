import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Movies {
    id: number;
    title?: string;
    name?: string;
    backdrop_path: string;
    poster_path: string;
    vote_average: number;
    overview: string;
    original_language: string;
    media_type: 'movie' | 'tv';
    key: string;
    site: string;
    type: string;
    original_name: string;
    profile_path: string;
}

export interface MovieTrailer {
    id: string;
    key: string;
    site: string;
    type: string;
    name: string;
}

export interface MovieTrailerResponse {
    results: MovieTrailer[];
}

export interface MoviesResponse {
    page: number;
    results: Movies[];
    total_pages: number;
    total_results: number;
}

export interface Genre {
    id: number;
    name: string;
}

export interface MovieDetailsResponse {
    id: number;
    title: string;
    name: string;
    overview: string;
    genres: Genre[];
    vote_average: number;
    backdrop_path: string;
    poster_path: string;
    credits: {
        cast: Movies[];
        crew: Movies[];
    };
}

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({ baseUrl: `https://api.themoviedb.org/3/` }),
    endpoints: (builder) => ({
        getBannerMovies: builder.query<MoviesResponse, void>({
            query: () => `/movie/popular?api_key=${apiKey}`,
        }),
        getTrendingMovies: builder.query<MoviesResponse, void>({
            query: () => `/trending/movie/week?api_key=${apiKey}`,
        }),
        getTopRatedMovies: builder.query<MoviesResponse, void>({
            query: () => `/movie/top_rated?api_key=${apiKey}`,
        }),
        getTrendingTv: builder.query<MoviesResponse, void>({
            query: () => `/trending/tv/week?api_key=${apiKey}`,
        }),
        getTrendingMoviesPage: builder.query<MoviesResponse, number>({
            query: (page) =>
                `/trending/movie/week?api_key=${apiKey}&page=${page}`,
        }),
        getTopRatedMoviesPage: builder.query<MoviesResponse, number>({
            query: (page) => `/movie/top_rated?api_key=${apiKey}&page=${page}`,
        }),
        getTrendingTvPage: builder.query<MoviesResponse, number>({
            query: (page) => `/trending/tv/week?api_key=${apiKey}&page=${page}`,
        }),
        getBannerTrailer: builder.query<MovieTrailerResponse, string>({
            query: (id) => `/movie/${id}/videos?api_key=${apiKey}`,
        }),
        getSelectedTrailer: builder.query<
            MovieTrailerResponse,
            { media: string; id: string }
        >({
            query: ({ media, id }) =>
                `/${media}/${id}/videos?api_key=${apiKey}`,
        }),
        getMovieDetails: builder.query<
            MovieDetailsResponse,
            { media: string; id: string }
        >({
            query: ({ media, id }) =>
                `/${media}/${id}?api_key=${apiKey}&append_to_response=credits`,
        }),
        getSimilarMovies: builder.query<
            MoviesResponse,
            { media: string; id: string }
        >({
            query: ({ media, id }) =>
                `/${media}/${id}/similar?api_key=${apiKey}&language=en-US&page=1`,
        }),
        getSearchData: builder.query<
            MoviesResponse,
            { media: string; searchName: string }
        >({
            query: ({ media, searchName }) =>
                `https://api.themoviedb.org/3/search/${media}?api_key=${apiKey}&query=${searchName}`,
        }),
    }),
});

export const {
    useGetBannerMoviesQuery,
    useGetTrendingMoviesQuery,
    useGetTopRatedMoviesQuery,
    useGetTrendingTvQuery,
    useGetTrendingMoviesPageQuery,
    useGetTopRatedMoviesPageQuery,
    useGetTrendingTvPageQuery,
    useGetSelectedTrailerQuery,
    useGetBannerTrailerQuery,
    useGetMovieDetailsQuery,
    useGetSimilarMoviesQuery,
    useGetSearchDataQuery,
} = moviesApi;
