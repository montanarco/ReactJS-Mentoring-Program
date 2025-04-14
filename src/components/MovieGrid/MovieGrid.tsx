import React, { useState } from "react";
import MovieTile from "../MovieTile/MovieTile";
import { Movie } from "../MovieForm/MovieForm";
import "./MovieGrid.css";

interface MovieGridProps {
  movies: Array<Movie>;
  onMovieSelected: (movie: Movie) => void;
  columns: number; 
  itemsPerPageOptions: number[]; 
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onMovieSelected, columns, itemsPerPageOptions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0] || 10);

  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const handlePageChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); 
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMovies = movies.slice(startIndex, startIndex + itemsPerPage);

  const rows = [];
  for (let i = 0; i < paginatedMovies.length; i += columns) {
    const rowMovies = paginatedMovies.slice(i, i + columns);
    rows.push(
      <div className="movie-grid-row" key={`row-${i}`}>
        {rowMovies.map((movie, index) => (
          <MovieTile key={`movie-${index}`} movie={movie} onClick={() => onMovieSelected(movie)}/>
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
          <button onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button onClick={() => handlePageChange("next")} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieGrid;