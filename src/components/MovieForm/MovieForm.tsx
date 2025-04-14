import React, { useState } from "react";
import "./MovieForm.css";

export interface Movie {
    title: string;
    releaseYear: number;
    imageUrl: string;
    rating: number;
    genres: string[];
    duration: string;
    director: string;
    description: string;
}

export interface MovieFormProps {
    movie: Movie | null;
    onSubmit: (movie: Movie) => void;
    onCancel: () => void;
    variant?: "primary" | "secondary";
}

const MovieForm: React.FC<MovieFormProps> = ({ movie, onSubmit, onCancel, variant = "primary" }) => {
    const [formData, setFormData] = useState<Movie>(
        movie || {
            title: "",
            releaseYear: new Date().getFullYear(),
            imageUrl: "",
            rating: 0,
            genres: [],
            duration: "",
            director: "",
            description: "",
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
                                value={formData.imageUrl}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="genres">Genres</label>
                            <select
                                id="genres"
                                name="genres"
                                value={formData.genres[0] || ""} // Use the first genre or empty string
                                onChange={handleChange}
                            >
                                <option value="">Select one genre</option> {/* Placeholder option */}
                                <option value="drama">Drama</option>
                                <option value="action">Action</option>
                                <option value="comedy">Comedy</option>
                                <option value="horror">Horror</option>
                            </select>
                        </div>
                        <div className="form-field">
                            <label htmlFor="director">Director</label>
                            <input
                                type="text"
                                id="director"
                                name="director"
                                placeholder="Enter director name"
                                value={formData.director}
                                onChange={handleChange}
                                required
                            />
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
                                value={formData.releaseYear}
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
                                value={formData.rating}
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
                                value={formData.duration}
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
                        value={formData.description}
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