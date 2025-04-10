import React, { useState } from "react";
import "./SearchForm.css";

interface SearchFormProps {
  searchCriteria: string;
  searchFunction: (searchCriteria: string) => void;
  placeholder?: string;
  variant?: "primary" | "secondary";
}

const SearchForm: React.FC<SearchFormProps> = ({
  searchCriteria,
  searchFunction,
  placeholder = "Search...",
  variant = "primary",
}) => {
  const [searchWord, setSearchWord] = useState<string>(searchCriteria || "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  const handleSubmit = () => {
    searchFunction(searchWord);
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
      <label className={`search-label ${variant}`}>Search:</label>
      <div className="search-input-group">
        <input
          type="text"
          id="search"
          className={inputClass}
          placeholder={placeholder}
          value={searchWord}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleSubmit}
        />
        <button
          type="submit"
          className={buttonClass}
          onClick={handleSubmit} // Trigger when button is clicked
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchForm;