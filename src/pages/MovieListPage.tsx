import React, { useEffect, useState } from 'react';
import GenreSelect from '../components/GenreSelect/GenreSelect';
import SortControl from '../components/SortControl/SortControl';
import MovieGrid from '../components/MovieGrid/MovieGrid';
import { Movie } from '../components/MovieForm/MovieForm';
import useFetch from '../hooks/useFetch';
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import './MovieListPage.css';

const URL_BASE = import.meta.env.MOVIE_API_BASE_URL || 'http://localhost:4000/movies';

export type MovieListContextType = {
    updateSearchQuery: (searchWord: string) => void;
    searchQuery: string;
    handleAddMovie: () => void;
    handleCancel: () => void;
    submitMovie: (movie: Movie) => void;
  };

export default function MovieListPage() {

    const navigate = useNavigate();

    const genres = [
        'All', 'Action', 'Comedy', 'Drama', 'Horror', 'Science Fiction', 'Thriller',
        'Western', 'Animation', 'Mystery', 'Romance', 'Adventure', 'Fantasy',
        'Documentary', 'Family', 'War', 'History', 'Crime',
    ];

    // States to manage search, filters, sorting, movies, and pagination
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activeGenre, setActiveGenre] = useState<string | null>(null);
    const [sortCriteria, setSortCriteria] = useState<string>('No Sorted');
    const [moviesList, setMoviesList] = useState<Movie[]>([]); // Movies for the current page
    const [url, setUrl] = useState(URL_BASE); // URL for API request
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1); // Current pagination page
    const [totalPages, setTotalPages] = useState(1); // Total number of pages (calculated from API data)


    // Custom hook to fetch the data
    const { data, loading, error } = useFetch(url);

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

    const updateSearchParams = (search: string, genre: string, sortBy: string, pageParam: number) => {
        setSearchParams({
            search,
            genre: genre || '',
            sortBy,
            page: pageParam.toString(),
        });
    };

    // Function to handle search query changes
  const updateSearchQuery = (searchWord: string) => {
    setSearchQuery(searchWord);
    updateSearchParams(searchWord, activeGenre || '', sortCriteria, 1);
  };

    // load the URL params for the first time
    useEffect(() => {
        const search = searchParams.get('search') || '';
        const genre = searchParams.get('genre') || null;
        const sortBy = searchParams.get('sortBy') || 'No Sorted';
        const pageParam = parseInt(searchParams.get('page') || '1', 10);

        setSearchQuery(search);
        setActiveGenre(genre);
        setSortCriteria(sortBy);
        setPage(pageParam); 

        const newUrl = buildURL();
        setUrl(newUrl); // Trigger fetch by updating the URL
    }, []);

    // Dynamically update the URL when search/filter/sorting/pagination state changes
    useEffect(() => {
        const newUrl = buildURL();
        setUrl(newUrl); // Trigger fetch by updating the URL
    }, [searchQuery, activeGenre, sortCriteria, page]);

    // Update the movies list and calculate total pages when data changes
    useEffect(() => {
        if (data?.data) {
            setMoviesList(data.data);
            setTotalPages(Math.ceil(data.totalAmount / 9)); // Calculate total pages based on totalAmount from API
        }
    }, [data]);

    const handleGenreSelect = (genre: string) => {
        setActiveGenre(genre === activeGenre ? null : genre); 
        const auxGenre = genre === activeGenre ? '' : genre;
        updateSearchParams(searchQuery, auxGenre, sortCriteria, 1);
        setPage(1);
    };

    const handleSortChange = (sortOption: string) => {
        setSortCriteria(sortOption);
        updateSearchParams(searchQuery, activeGenre || '', sortOption, 1);
        setPage(1);
    };

    const handleMovieSelect = (movie: Movie) => {
        const queryString = searchParams.toString(); // Get current search params
        navigate(`/movie-list-page/${movie.id}?${queryString}`, { replace: false });
    };

    const handlePageChange = (direction: string) => {
        let pageParam = parseInt(searchParams.get('page') || '1', 10);
        if (direction === 'next' && page < totalPages) {
            pageParam = page + 1;
            setPage((prevPage) => prevPage + 1);
        } else if (direction === 'prev' && page > 1) {
            pageParam = page - 1;
            setPage((prevPage) => prevPage - 1);
        }
        updateSearchParams(searchQuery, activeGenre || '', sortCriteria, pageParam);
    };

    const handleAddMovie = () => {
        navigate('/movie-list-page/new', { replace: false });
    };

    const handleCancel = () => {
        console.log('Cancel button clicked');
        navigate('/movie-list-page', { replace: false });
    };

    const submitMovie = (movie: Movie) => {
        console.log("Movie submitted:", movie);
        
    };


    return (
        <>
            <h3>Movie List</h3>
            <Outlet context={{ updateSearchQuery, searchQuery, handleAddMovie, handleCancel, submitMovie }} />
            <div>
                <div className="container">
                    <div className="genre-select">
                        <GenreSelect
                            genres={genres}
                            layout="flex" 
                            onSelect={handleGenreSelect}
                            selectedGenre={activeGenre || ''}
                            variant="primary"
                        />
                    </div>

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
                        movies={moviesList} 
                        currentPage={page}
                        onMovieSelected={handleMovieSelect}
                        columns={3}
                        itemsPerPageOptions={[9]} 
                        onPageChange={handlePageChange}
                    />
                ) : (
                    <div>No movies found.</div>
                )}
            </div>
        </>
    );
}