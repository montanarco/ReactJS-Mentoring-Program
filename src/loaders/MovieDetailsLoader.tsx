import { LoaderFunctionArgs } from "react-router-dom";
import { Movie } from "../components/MovieForm/MovieForm";

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

  if (Array.isArray(data)) {
    if (data.length === 0) {
      throw new Error("No movie found with the provided ID.");
    }
    return data[0]; 
  }

  return data; 
}