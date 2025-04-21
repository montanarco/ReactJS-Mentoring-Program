import React from "react";
import "./SearchForm.css";

interface SearchFormProps {
  searchCriteria: string;
  searchFunction: (searchCriteria: string) => void;
  placeholder?: string;
  variant?: "primary" | "secondary";
}

interface SearchFormState {
  searchWord: string;
}

class SearchForm extends React.Component<SearchFormProps, SearchFormState> {
  constructor(props: SearchFormProps) {
    super(props);
    this.state = {
      searchWord: props.searchCriteria || "", 
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchWord: event.target.value }); 
  };

  handleSubmit = () => {
    this.props.searchFunction(this.state.searchWord); 
  };

  handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  }

  render() {

    const { placeholder = "Search...", variant = "primary" } = this.props;
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
            value={this.state.searchWord}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown} 
            onFocus={this.handleSubmit}
          />
          <button
            type="submit"
            className={buttonClass}
            onClick={this.handleSubmit} // Trigger when button is clicked
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default SearchForm;