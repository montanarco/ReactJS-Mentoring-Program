import React, { useEffect, useState } from "react";
import "./SearchForm.css";
import { Outlet, useOutletContext } from "react-router-dom";
import { MovieListContextType } from "../../pages/MovieListPage";

interface SearchFormProps {
  searchCriteria: string;
  addMovieFunction?: () => void;
  placeholder?: string;
  variant?: "primary" | "secondary";
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchCriteria,
  placeholder = "Search...",
  variant = "primary",
}) => {
  const [searchWord, setSearchWord] = useState<string>(searchCriteria || "");
  // Access `updateSearchQuery` from the parent context
  const { updateSearchQuery, searchQuery, handleAddMovie, handleCancel, submitMovie } = useOutletContext<MovieListContextType>();


  useEffect(() => {
    setSearchWord(searchCriteria);
  }, [searchCriteria]);

  useEffect(() => {
    setSearchWord(searchQuery);
  }, [searchQuery]); 


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  // Handle form submission (when user clicks search or presses Enter)
  const handleSubmit = () => {
      updateSearchQuery(searchWord); 
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const containerClass = `search-container ${variant}`;
  const inputClass = `search-input ${variant}`;
  const buttonClass = `search-button ${variant}`;

  return (
    <div className={containerClass}>
      <Outlet  context={{ handleAddMovie, submitMovie, handleCancel}} />
      <div className="top-right-button-container">
        <button className="top-right-button" onClick={handleAddMovie}>
          Add Movie
        </button>
      </div>
      <label className={`search-label ${variant}`}>Find Your Movie:</label>
      <div className="search-input-group">
        <input
          type="text"
          id="search"
          className={inputClass}
          placeholder={placeholder}
          value={searchWord}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" className={buttonClass} onClick={handleSubmit}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchForm;