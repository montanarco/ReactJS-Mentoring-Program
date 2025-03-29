import React from "react";
import "./MovieTile.css";
interface MovieTileState {
    showContextMenu: boolean;
  }

interface MovieTileProps {
  movie: {
    imageUrl: string;
    name: string;
    releaseYear: number;
    director: string;
    genres: string[];
  };
  onClick?: () => void; // Callback for click events
  onEdit?: () => void; // Callback for edit menu
  onDelete?: () => void; // Callback for delete menu
}

class MovieTile extends React.Component<MovieTileProps, MovieTileState> {
  constructor(props: MovieTileProps) {
    super(props);
    this.state = {
      showContextMenu: false, // Track the context menu visibility
    };
  }

  toggleContextMenu = () => {
    this.setState((prevState) => ({
      showContextMenu: !prevState.showContextMenu,
    }));
  };

  handleEdit = () => {
    const { onEdit } = this.props;
    if (onEdit) onEdit();
    this.setState({ showContextMenu: false });
  };

  handleDelete = () => {
    const { onDelete } = this.props;
    if (onDelete) onDelete();
    this.setState({ showContextMenu: false });
  };

  render() {
    const { movie, onClick } = this.props;
    const { showContextMenu } = this.state;

    return (
      <div className="movie-tile" onClick={onClick}>
        <div className="movie-image-wrapper">
          <img className="movie-image" src={movie.imageUrl} alt={movie.name} />
          <button className="menu-button" onClick={this.toggleContextMenu}>
             ⋮
          </button>
          {showContextMenu && (
            <div className="context-menu">
              <button className="menu-item" onClick={this.handleEdit}>
                Edit
              </button>
              <button className="menu-item" onClick={this.handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="movie-details">
          <span className="movie-name">{movie.name}</span>
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
  }
}

export default MovieTile;