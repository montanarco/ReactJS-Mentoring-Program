import { LoaderFunctionArgs } from "react-router-dom";
import { Movie } from "../components/MovieForm/MovieForm";
import transformMovieData from "../hooks/transformMovieData";

const API_BASE_URL = import.meta.env.MOVIE_API_BASE_URL || "http://localhost:4000/movies";

export default async function MovieDetailsLoader({ params }: LoaderFunctionArgs): Promise<Movie> {
  const { movieId } = params;

  if (!movieId) {
    throw new Error("Movie ID is not provided.");
  }

  const response = await fetch(`${API_BASE_URL}/${movieId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch movie details: ${response.statusText}`);
  }

  const data = await response.json();
  const movie = transformMovieData(data); // Assuming transformMovieData is a function that processes the movie data

  if (Array.isArray(movie)) {
    if (movie.length === 0) {
      throw new Error("No movie found with the provided ID.");
    }
    return movie[0]; 
  }

  return movie; 
}