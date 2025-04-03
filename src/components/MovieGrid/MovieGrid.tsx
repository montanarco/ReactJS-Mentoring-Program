import React from "react";
import MovieTile from "../MovieTile/MovieTile";
import "./MovieGrid.css";

interface MovieGridProps {
  movies: Array<{
    imageUrl: string;
    name: string;
    releaseYear: number;
    director: string;
    genres: string[];
  }>;
  columns: number; 
  itemsPerPageOptions: number[]; 
}

interface MovieGridState {
  currentPage: number;
  itemsPerPage: number; 
}

class MovieGrid extends React.Component<MovieGridProps, MovieGridState> {
  constructor(props: MovieGridProps) {
    super(props);
    this.state = {
      currentPage: 1,
      itemsPerPage: props.itemsPerPageOptions[0] || 10,
    };
  }

  handlePageChange = (direction: "prev" | "next") => {
    const { currentPage } = this.state;
    const totalPages = Math.ceil(this.props.movies.length / this.state.itemsPerPage);
    if (direction === "prev" && currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    } else if (direction === "next" && currentPage < totalPages) {
      this.setState({ currentPage: currentPage + 1 });
    }
  };

  handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      itemsPerPage: Number(event.target.value),
      currentPage: 1, 
    });
  };

  render() {
    const { movies, columns, itemsPerPageOptions } = this.props;
    const { currentPage, itemsPerPage } = this.state;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedMovies = movies.slice(startIndex, startIndex + itemsPerPage);

    const rows = [];
    for (let i = 0; i < paginatedMovies.length; i += columns) {
      const rowMovies = paginatedMovies.slice(i, i + columns);
      rows.push(
        <div className="movie-grid-row" key={`row-${i}`}>
          {rowMovies.map((movie, index) => (
            <MovieTile key={`movie-${index}`} movie={movie} />
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
            onChange={this.handleItemsPerPageChange}
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option} per page
              </option>
            ))}
          </select>
          <div className="pagination-buttons">
            <button onClick={() => this.handlePageChange("prev")}>
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button onClick={() => this.handlePageChange("next")}>
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieGrid;