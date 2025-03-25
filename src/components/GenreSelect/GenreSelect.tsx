import React from "react";
import "./GenreSelect.css";

interface GenreSelectProps {
  genres: string[]; 
  selectedGenre: string; 
  onSelect: (genre: string) => void; 
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
    const { genres = [], selectedGenre } = this.props;

    return (
        <div className= {"button-container"} >
          {genres.map((genre) => (
            <button
            className={`genre-button ${selectedGenre === genre ? "selected" : ""}`}
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