import React from "react";
import Counter from "../components/Counter/Counter";
import SearchForm from "../components/SearchForm/SearchForm";
import GenreSelect from "../components/GenreSelect/GenreSelect";

export default function CoreConcepts (){

  const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Thriller", "Western", "Animation", "Documentary", "Romance"];
  const [selectedGenre, setSelectedGenre] = React.useState("Action");

  function handleGenreSelect(genre: string) {
    console.log("Selected genre: ", genre);
    setSelectedGenre(genre); 
  }

    function searchForMovies(userInput: string) {
        console.log("user Input: ", userInput);
    }

    return React.createElement(
          "div", // Parent element <div>
          { style: { textAlign: "center", marginTop: "20px" } }, 
            React.createElement("h1", {}, "Core Concepts"),
            React.createElement(Counter, { initialValue: 10 }),
            React.createElement(SearchForm, { searchCriteria: "top 10 movies", searchFunction: searchForMovies }),
            React.createElement(GenreSelect, {
                    genres: genres, 
                    selectedGenre: selectedGenre, 
                    onSelect: handleGenreSelect, 
                  })
            
        );
}