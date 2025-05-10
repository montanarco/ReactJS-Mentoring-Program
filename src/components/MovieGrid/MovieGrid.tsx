import React, { useState } from "react";
import MovieTile from "../MovieTile/MovieTile";
import { Movie } from "../MovieForm/MovieForm";
import "./MovieGrid.css";
import { useNavigate } from "react-router-dom";

interface MovieGridProps {
  movies: Array<Movie>;
  currentPage: number;
  onMovieSelected: (movie: Movie) => void;
  columns: number;
  itemsPerPageOptions: number[];
  onPageChange?: (direction: string) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, currentPage, onMovieSelected, columns, itemsPerPageOptions, onPageChange }) => {
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0] || 10);

  const navigate = useNavigate();

  const handlePageChange = (direction: "prev" | "next") => {
    if (onPageChange) {
      onPageChange(direction);
    }
  };

  const handleEdit = (movieId: number) => {
    console.log("Edit movie", movieId);
    navigate(`/movie-list-page/${movieId}/edit`, { replace: false });
  };

  const handleDelete = (movieId: number) => {
    console.log("Delete movie", movieId);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
  };

  const rows = [];
  for (let i = 0; i < movies.length; i += columns) {
    const rowMovies = movies.slice(i, i + columns); // No pagination slicing here
    rows.push(
      <div className="movie-grid-row" key={`row-${i}`}>
        {rowMovies.map((movie, index) => (
          <MovieTile key={`movie-${index}`} movie={movie} onClick={() => onMovieSelected(movie)} onEdit={() => handleEdit(movie.id)} onDelete={()=>handleDelete(movie.id)}/>
        ))}
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {rows}
      <div className="paginator">
        <select
          className="items-per-page"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option} per page
            </option>
          ))}
        </select>
        <div className="pagination-buttons">
          <button id="prev" onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button id="next" onClick={() => handlePageChange('next')} disabled={movies.length === 0}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieGrid;