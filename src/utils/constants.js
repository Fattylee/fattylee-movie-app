export const MOST_POPULAR = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=1&api_key=${process.env.REACT_APP_MOVIE_API}`;

export const POSTER_PATH = "https://image.tmdb.org/t/p/w500";

export const SEARCH_MOVIE = `https://api.themoviedb.org/3/search/movie?&api_key=${process.env.REACT_APP_MOVIE_API}&query=`;
