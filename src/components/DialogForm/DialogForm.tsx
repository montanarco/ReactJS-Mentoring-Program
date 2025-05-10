import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import FormModal from "../FormModal/FormModal";
import MovieFormV2 from "../MovieFormV2/MovieFormV2";
import { MovieListContextType } from "../../pages/MovieListPage";
import useFetch from "../../hooks/useFetch";
import { Movie } from "../MovieForm/MovieForm";

const API_BASE_URL = import.meta.env.MOVIE_API_BASE_URL || "http://localhost:4000/movies";

const DialogForm: React.FC = () => {
    const navigate = useNavigate();
    const { handleCancel } = useOutletContext<MovieListContextType>();
    const { movieId } = useParams<{ movieId: string }>();
    const [movieData, setMovieData] = useState<Movie | null>(null);

    console.log("DialogForm movieId:", movieId);

    const { data: fetchData, loading, error } = useFetch(movieId ? `${API_BASE_URL}/${movieId}` : '');
    useEffect(() => {
        if (fetchData) {
            console.log("Fetched movie data:", fetchData);
            setMovieData(fetchData); 
        }
    }, [fetchData]); // Trigger only when `fetchData` changes

    const handleAddMovie = async (movieData: Movie) => {
        try {
            console.log("Movie data to add:", movieData);

            const response = await fetch(API_BASE_URL, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(movieData),
            });

            if (response.status === 201) {
                const responseData = await response.json();
                navigate(`/movie-list-page/${responseData.id}`, { replace: false });
            } else {
                console.error("Error: Failed to add movie");
            }
        } catch (error) {
            console.error("Error while adding movie:", error);
        }
    };

    const handleUpdateMovie = async (movieData: Movie) => {
        try {
            console.log("Movie data to update:", movieData);
    
            const response = await fetch(API_BASE_URL, {
                method: "PUT", // Use PUT for updating the movie
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(movieData), // Send the updated movie data
            });
    
            if (response.ok) {
                const responseData = await response.json();
                console.log("Movie updated successfully:", responseData);
    
                // Navigate to the updated movie's details page
                navigate(`/movie-list-page/${responseData.id}`, { replace: false });
                window.location.reload(); 
            } else {
                console.error("Error: Failed to update movie");
            }
        } catch (error) {
            console.error("Error while updating movie:", error);
        }
    };

    useEffect(() => {
        if (error) {
            console.error("Error fetching movie:", error);
        }
    }, [error]);

    return (
        <FormModal title={movieId ? "Edit Movie" : "Add New Movie"} onClose={handleCancel}>
            <MovieFormV2
                movie={movieData || undefined}
                onSubmit={handleAddMovie}
                onUpdate={handleUpdateMovie}
                onCancel={handleCancel}
                disabled={loading}
            />
        </FormModal>
    );
};

export default DialogForm;