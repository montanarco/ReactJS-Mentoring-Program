import React from "react";
import "./SearchForm.css";

interface SearchFormProps {
  searchCriteria: string;
  searchFunction: (searchCriteria: string) => void;
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
    return (
      <div className="search-container">
        <label htmlFor="search" className="search-label">
          Find Your Movie
        </label>
        <div className="search-input-group">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="What do you want to watch?"
            value={this.state.searchWord}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown} 
            onFocus={this.handleSubmit}
          />
          <button
            type="submit"
            className="search-button"
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