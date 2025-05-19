import React, { useState } from "react";
import "./MovieForm.css";

export interface Movie {
    id: number | undefined;
    genres: string[];
    title: string;
    tagline: string;
    vote_average: string;
    vote_count: string;
    release_date: string;
    poster_path: string;
    overview: string;
    budget: string;
    revenue: string;
    runtime: string;
}

export interface MovieFormProps {
    movie: Movie | null;
    onSubmit: (movie: Movie) => void;
    onCancel: () => void;
    variant?: "primary" | "secondary";
}

const MovieForm: React.FC<MovieFormProps> = ({ movie, onSubmit, onCancel, variant = "primary" }) => {
    const availableGenres: string[] = [
        'Action', 'Comedy', 'Drama', 'Horror', 'Science Fiction', 'Thriller',
        'Western', 'Animation', 'Mystery', 'Romance', 'Adventure', 'Fantasy',
        'Documentary', 'Family', 'War', 'History', 'Crime'
    ];
    const [formData, setFormData] = useState<Movie>(
        movie || {
            id: 0,
            title: "",
            genres: [],
            tagline: "",
            vote_average: "",
            vote_count: "",
            release_date: new Date().toISOString().split("T")[0],
            poster_path: "",
            overview: "",
            budget: "",
            revenue: "",
            runtime: "",
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "genres" ? value.split(",") : value,
        }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleGenreChange = (e: { target: { value: string; checked: boolean; }; }) => {
        const { value, checked } = e.target;

        if (checked) {
            setFormData((prevData) => ({
                ...prevData,
                genres: [...prevData.genres, value]
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                genres: prevData.genres.filter((genre) => genre !== value)
            }));
        }
        //console.log("Selected genres:", formData.genres);
    };

    const buttonClasses = variant === "primary" ? "button-primary" : "button-secondary";

    return (
        <div className="movie-form-container">
            <form className="movie-form" onSubmit={handleFormSubmit}>
                <div className="form-columns">
                    <div className="form-column">
                        <div className="form-field">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter movie title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="imageUrl">Image URL</label>
                            <input
                                type="text"
                                id="imageUrl"
                                name="imageUrl"
                                placeholder="Enter image URL"
                                value={formData.poster_path}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="genres">Genres</label>
                            <div className="scroll-box">

                                <div id="genres">
                                    {/* Checkbox Options */}
                                    {availableGenres.map((genre) => (
                                        <div className="checkbox-container" key={genre}>
                                            <label key={genre}>{genre} </label>
                                            <input
                                                type="checkbox"
                                                value={genre}
                                                checked={formData.genres.includes(genre)}
                                                onChange={handleGenreChange}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="form-field">
                                <label htmlFor="budget">Budget</label>
                                <input
                                    type="text"
                                    id="budget"
                                    name="budget"
                                    placeholder="Enter budget "
                                    value={formData.budget}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-column">
                        <div className="form-field">
                            <label htmlFor="releaseYear">Release Year</label>
                            <input
                                type="number"
                                id="releaseYear"
                                name="releaseYear"
                                placeholder="Enter release year"
                                value={formData.release_date}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="rating">Rating</label>
                            <input
                                type="number"
                                id="rating"
                                name="rating"
                                placeholder="Enter movie rating"
                                value={formData.vote_average}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="duration">Runtime</label>
                            <input
                                type="text"
                                id="duration"
                                name="duration"
                                placeholder="Enter runtime in minutes"
                                value={formData.runtime}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="form-field overview-field">
                    <label htmlFor="description">Overview</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter movie description"
                        value={formData.overview}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="form-buttons">
                    <button
                        type="button"
                        className={`button cancel ${buttonClasses}`}
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button type="submit" className={`button submit ${buttonClasses}`}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MovieForm;