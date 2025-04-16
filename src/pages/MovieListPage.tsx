import React, { useEffect, useState } from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import GenreSelect from '../components/GenreSelect/GenreSelect';
import SortControl from '../components/SortControl/SortControl';
import MovieGrid from '../components/MovieGrid/MovieGrid';
import MovieDetails from '../components/MovieDetails/MovieDetails';
import { Movie } from '../components/MovieForm/MovieForm';
import useFetch from '../hooks/useFetch';
import transformMovieData from '../hooks/transformMovieData';
import './MovieListPage.css';

const URL_BASE = import.meta.env.MOVIE_API_BASE_URL || 'http://localhost:4000/movies';

export default function MovieListPage() {
    const genres = [
        'All', 'Action', 'Comedy', 'Drama', 'Horror', 'Science Fiction', 'Thriller',
        'Western', 'Animation', 'Mystery', 'Romance', 'Adventure', 'Fantasy',
        'Documentary', 'Family', 'War', 'History', 'Crime',
    ];

    // States to manage search, filters, sorting, movies, and pagination
    const [searchQuery, setSearchQuery] = useState('');
    const [activeGenre, setActiveGenre] = useState<string | null>(null);
    const [sortCriteria, setSortCriteria] = useState<string>('No Sorted');
    const [moviesList, setMoviesList] = useState<Movie[]>([]); // Movies for the current page
    const [url, setUrl] = useState(URL_BASE); // URL for API request
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [page, setPage] = useState(1); // Current pagination page
    const [totalPages, setTotalPages] = useState(1); // Total number of pages (calculated from API data)

    // Custom hook to fetch the data
    const { data, loading, error } = useFetch(url);

    // Dynamically update the URL when search/filter/sorting/pagination state changes
    useEffect(() => {
        const buildURL = () => {
            const params = new URLSearchParams();

            // Add search by title
            if (searchQuery) {
                params.append('search', searchQuery);
                params.append('searchBy', 'title');
            }

            // Add genre filter
            if (activeGenre !== null && activeGenre !== 'All') {
                params.append('filter', activeGenre.toLowerCase());
            }

            // Add sorting criteria
            if (sortCriteria !== 'No Sorted') {
                params.append('sortBy', sortCriteria);
                params.append('sortOrder', 'desc');
            }

            // Add pagination parameters
            params.append('offset', (page - 1).toString()); // Offset is zero-based
            params.append('limit', '9'); // 9 items per page

            const queryString = params.toString();
            return `${URL_BASE}${queryString ? `?${queryString}` : ''}`;
        };

        const newUrl = buildURL();
        setUrl(newUrl); // Trigger fetch by updating the URL
    }, [searchQuery, activeGenre, sortCriteria, page]);

    // Update the movies list and calculate total pages when data changes
    useEffect(() => {
        if (data?.data) {
            const transformedMovies = transformMovieData(data.data);
            setMoviesList(transformedMovies);
            setTotalPages(Math.ceil(data.totalAmount / 9)); // Calculate total pages based on totalAmount from API
        }
    }, [data]);

    // Handlers for user interactions
    const handleGenreSelect = (genre: string) => {
        setActiveGenre(genre === activeGenre ? null : genre); // Toggle genre selection
        setPage(1); // Reset to the first page when filtering
    };

    const handleSortChange = (sortOption: string) => {
        setSortCriteria(sortOption);
        setPage(1); // Reset to the first page when sorting
    };

    const onSearch = (searchCriteria: string) => {
        setSearchQuery(searchCriteria);
        setPage(1); // Reset to the first page when searching
    };

    const handleMovieSelect = (movie: any) => {
        setSelectedMovie(movie);
    };

    const handleCloseMovie = () => {
        setSelectedMovie(null);
    };

    const handlePageChange = (direction: string) => {
        if (direction === 'next' && page < totalPages) {
            setPage((prevPage) => prevPage + 1);
        } else if (direction === 'prev' && page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    const onAddMovie = () => {
        console.log('Movie added!');
    };

    return (
        <>
            <h3>Movie List</h3>
            {selectedMovie ? (
                <MovieDetails movie={selectedMovie} OnCloseMovie={handleCloseMovie} />
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
                <div className="container">
                    {/* Ensure proper class for GenreSelect */}
                    <div className="genre-select">
                        <GenreSelect
                            genres={genres}
                            layout="flex" /* 'flex' ensures buttons wrap */
                            onSelect={handleGenreSelect}
                            selectedGenre={activeGenre || ''}
                            variant="primary"
                        />
                    </div>

                    {/* Ensure proper class for SortControl */}
                    <div className="sort-control">
                        <SortControl
                            onChange={handleSortChange}
                            selectedValue={sortCriteria}
                            variant="primary"
                        />
                    </div>
                </div>

                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : moviesList.length > 0 ? (
                    <MovieGrid
                        movies={moviesList} // Pass movies directly (already paginated by API)
                        currentPage={page}
                        onMovieSelected={handleMovieSelect}
                        columns={3}
                        itemsPerPageOptions={[9]} // Fixed to 9 as we're paginating via the backend
                        onPageChange={handlePageChange}
                    />
                ) : (
                    <div>No movies found.</div>
                )}
            </div>
        </>
    );
}