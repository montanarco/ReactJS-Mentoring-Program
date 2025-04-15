import React, { useState } from "react";
import "./MovieTile.css";
import { Movie } from "../MovieForm/MovieForm"; 

interface MovieTileProps {
  movie: Movie; // Movie object containing details
  onClick?: () => void; // Callback for click events
  onEdit?: () => void; // Callback for edit menu
  onDelete?: () => void; // Callback for delete menu
}

const MovieTile: React.FC<MovieTileProps> = ({ movie, onClick, onEdit, onDelete }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);

  const toggleContextMenu = () => {
    setShowContextMenu((prev) => !prev);
  };

  const handleEdit = () => {
    if (onEdit) onEdit();
    setShowContextMenu(false);
  };

  const handleDelete = () => {
    if (onDelete) onDelete();
    setShowContextMenu(false);
  };

  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div className="movie-tile" >
      <div className="movie-image-wrapper">
        <img className="movie-image" src={movie.imageUrl} alt={movie.title} />
        <button className="menu-button" onClick={toggleContextMenu}>
          ⋮
        </button>
        {showContextMenu && (
          <div className="context-menu">
            <button className="menu-item" onClick={handleEdit}>
              Edit
            </button>
            <button className="menu-item" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="movie-details" onClick={handleClick}>
        <span className="movie-name">{movie.title}</span>
        <div className="movie-meta">
          <span className="movie-genres">{movie.genres.join(", ")}</span>
          <div className="movie-right-meta">
            <span className="movie-director">{movie.director}</span>
            <span className="movie-year">{movie.releaseYear}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieTile;