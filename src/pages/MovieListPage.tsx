import React, { useState } from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import GenreSelect from '../components/GenreSelect/GenreSelect';
import SortControl from '../components/SortControl/SortControl';
import movies from "../assets/movies.json";
import MovieGrid from '../components/MovieGrid/MovieGrid';
import MovieDetails from '../components/MovieDetails/MovieDetails';
import { Movie } from '../components/MovieForm/MovieForm';
export default function MovieListPage() {

    const genres = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Thriller", "Western", "Animation", "Documentary", "Romance", "Adventure"];

    const [searchQuery, setSearchQuery] = React.useState('');
    const [activeGenre, setActiveGenre] = useState("Action");
    const [sortCriteria, setSortCriteria] = useState("Release Date");
    const [moviesList, setMoviesList] = useState(movies);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    function handleGenreSelect(genre: string) {
        console.log("Selected genre: ", genre);
        setActiveGenre(genre);
    }

    function handleSortChange(sortOption: string) {
        console.log("Selected sort option: ", sortOption);
        setSortCriteria(sortOption);
    }

    const onSearch = (searchCriteria: string) => {
        setSearchQuery(searchCriteria);
        console.log('Search Criteria:', searchCriteria);
    };

    const handleMovieSelect = (movie: any) => {
        setSelectedMovie(movie);
        console.log('Selected Movie:', movie);
    };

    const onAddMovie = () => {
        console.log('Add Movie');
    };

    const handleCloseMovie = () => {
        setSelectedMovie(null);
        console.log('Closed Movie Details');
    };

    return (
        <>
            <h3>Movie List</h3>
            {selectedMovie ? (
                <MovieDetails movie={selectedMovie} OnCloseMovie={handleCloseMovie}/>
            ) : (
                <SearchForm
                    placeholder="What do you want to watch?"
                    searchFunction={onSearch}
                    addMovieFunction={onAddMovie}
                    variant="primary"
                    searchCriteria={searchQuery}
                />
            )}

            <div>
                <GenreSelect
                    genres={genres}
                    layout="flex"
                    onSelect={handleGenreSelect}
                    selectedGenre={activeGenre}
                    variant="primary"
                />
                <SortControl
                    onChange={handleSortChange}
                    selectedValue={sortCriteria}
                    variant="primary"
                />
                <MovieGrid
                    movies={moviesList}
                    onMovieSelected={handleMovieSelect}
                    columns={3}
                    itemsPerPageOptions={[3, 6, 9, 12]}
                />
            </div>
        </>
    );
}