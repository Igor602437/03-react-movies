import axios from 'axios';
import type { Movie } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers['Authorization'] = `Bearer ${API_KEY}`;

interface TmdbResponce {
  results: Movie[];
}
export const fetchMovies = async (
  query: string,
  limit: number = 15
): Promise<Movie[]> => {
  const { data } = await axios.get<TmdbResponce>(
    `/search/movie?query=${query}`
  );
  // return data.results;
  return data.results.filter(movie => movie.poster_path).slice(0, limit);
};
