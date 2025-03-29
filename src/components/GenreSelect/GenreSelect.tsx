import React from "react";
import "./GenreSelect.css";

interface GenreSelectProps {
  genres: string[];
  selectedGenre: string;
  onSelect: (genre: string) => void;
  layout?: "flex" | "grid"; // New prop for layout customization
  variant?: "primary" | "secondary"; // New prop for style variant customization
}

class GenreSelect extends React.Component<GenreSelectProps> {
  constructor(props: GenreSelectProps) {
    super(props);
  }

  handleGenreClick = (genre: string) => {
    const { onSelect } = this.props;
    onSelect(genre);
  };

  render() {
    const { genres = [], selectedGenre, layout = "flex", variant = "primary" } = this.props;

    const containerClass = `button-container ${layout}`;
    const buttonClassBase = `genre-button ${variant}`;

    return (
      <div className={containerClass}>
        {genres.map((genre) => (
          <button
            className={`${buttonClassBase} ${selectedGenre === genre ? "selected" : ""}`}
            key={genre}
            onClick={() => this.handleGenreClick(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    );
  }
}

export default GenreSelect;