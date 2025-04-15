import React from "react";
import "./MovieDetails.css";
import { Movie } from "../MovieForm/MovieForm";

interface MovieDetailsProps {
  movie: Movie; 
  OnCloseMovie: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, OnCloseMovie }) => {
  const {
    imageUrl,
    title,
    releaseYear,
    rating,
    duration,
    genres,
    description,
  } = movie;

  return (
    <div className="movie-details-container">
      {/* Left side: Movie poster */}
      <div className="movie-poster">
        <img src={imageUrl} alt={`${title} poster`} className="poster-image" />
      </div>

      {/* Right side: Movie info */}
      <div className="movie-info">
        {/* Title & Rating */}
        <div className="movie-header">
          <h1 className="movie-title">{title}</h1>
          <div className="movie-rating">
            <span className="rating-circle">{rating}</span>
          </div>
          <button className="magnify-button" onClick={OnCloseMovie}>
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
          <span className="release-year">{releaseYear}</span>
          <span className="movie-duration">{duration}</span>
        </div>

        {/* Description */}
        <div className="movie-description">
          <h3>Description:</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;