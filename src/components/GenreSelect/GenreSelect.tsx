import React from "react";
import "./GenreSelect.css";

interface GenreSelectProps {
  genres: string[];
  selectedGenre: string;
  onSelect: (genre: string) => void;
  layout?: "flex" | "grid"; // New prop for layout customization
  variant?: "primary" | "secondary"; // New prop for style variant customization
}

const GenreSelect: React.FC<GenreSelectProps> = ({
  genres = [],
  selectedGenre,
  onSelect,
  layout = "flex",
  variant = "primary",
}) => {
  const handleGenreClick = (genre: string) => {
    onSelect(genre);
  };

  const containerClass = `button-container ${layout}`;
  const buttonClassBase = `genre-button ${variant}`;

  return (
    <div className={containerClass}>
      {genres.map((genre) => (
        <button
          className={`${buttonClassBase} ${selectedGenre === genre ? "selected" : ""}`}
          key={genre}
          onClick={() => handleGenreClick(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default GenreSelect;