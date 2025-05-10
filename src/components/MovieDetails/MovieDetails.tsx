import React from "react";
import "./MovieDetails.css";
import { Movie } from "../MovieForm/MovieForm";
import { Outlet, useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { MovieListContextType } from "../../pages/MovieListPage";

interface MovieDetailsProps {
  movieInp?: Movie | null;
  OnCloseMovie?: () => void;
}


const MovieDetails: React.FC<MovieDetailsProps> = ({ movieInp, OnCloseMovie }) => {
  const movie = useLoaderData() as Movie || movieInp;
  const navigate = useNavigate();

  const { handleCancel } = useOutletContext<MovieListContextType>();

  const handleCloseMovie = () => {
    if (OnCloseMovie) {
      OnCloseMovie();
    } else {
      navigate(`/movie-list-page/`);
    }
  }

  const {
    poster_path,
    title,
    release_date,
    vote_average,
    runtime,
    genres,
    overview,
  } = movie;

  return (
    <div className="movie-details-container">
      <Outlet context={{ handleCancel }} />
      <div className="movie-poster">
        <img src={poster_path} alt={`${title} poster`} className="poster-image" />
      </div>

      {/* Right side: Movie info */}
      <div className="movie-info">
        {/* Title & Rating */}
        <div className="movie-header">
          <h1 className="movie-title">{title}</h1>
          <div className="movie-rating">
            <span className="rating-circle">{vote_average}</span>
          </div>
          <button id="movie-info-close" className="magnify-button" onClick={handleCloseMovie}>
            <i className="material-icons">search</i>
          </button>
        </div>

        {/* Genres */}
        <div className="movie-genres">
          <ul className="genres-list">
            {genres.map((genre) => (
              <li key={genre} className="genre-item">
                {genre}
              </li>
            ))}
          </ul>
        </div>

        {/* Release Year & Duration */}
        <div className="movie-metadata">
          <span className="release-year">{release_date}</span>
          <span className="movie-duration">{runtime}</span>
        </div>

        {/* Description */}
        <div className="movie-description">
          <h3>Overview:</h3>
          <p>{overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;