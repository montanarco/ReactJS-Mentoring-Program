import React, { Component } from "react";
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
    onSubmit: (movie: Movie | null) => void;
    onCancel: () => void;
    variant?: "primary" | "secondary"; // Add button styling variant
}

interface MovieFormState {
    movie: Movie;
}

class MovieForm extends Component<MovieFormProps, MovieFormState> {
    constructor(props: MovieFormProps) {
        super(props);
        // Initialize the state with either existing movie data or default empty fields.
        this.state = {
            movie: props.movie || {
                title: "",
                releaseYear: new Date().getFullYear(),
                imageUrl: "",
                rating: 0,
                genres: [],
                duration: "",
                director: "",
                description: "",
            },
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            movie: { ...prevState.movie, [name]: value },
        }));
    };

    handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { movie } = this.state;
        this.props.onSubmit(movie);
    };

    render() {
        const { movie } = this.state;
        const { onCancel, variant = "primary" } = this.props;

        const buttonClasses = variant === "primary" ? "button-primary" : "button-secondary";

        return (
            <div className="movie-form-container">
                <form className="movie-form" onSubmit={this.handleFormSubmit}>
                    <button
                        className="dialog-close-button"
                        onClick={() => onCancel()}
                        aria-label="Close dialog"
                    >
                        X
                    </button>
                    <h3>{this.props.movie ? "Edit Movie" : "Add Movie"}</h3>

                    <div className="form-columns">
                        {/* Left Column Fields */}
                        <div className="form-column">
                            <div className="form-field">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="Enter movie title"
                                    value={movie.title}
                                    onChange={this.handleChange}
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
                                    value={movie.imageUrl}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="genres">Genres</label>
                                <select id="genres" name="genres" value={movie.genres.join(",")} onChange={this.handleChange} multiple>
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
                                    value={movie.director}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Right Column Fields */}
                        <div className="form-column">
                            <div className="form-field">
                                <label htmlFor="releaseYear">Release Year</label>
                                <input
                                    type="number"
                                    id="releaseYear"
                                    name="releaseYear"
                                    placeholder="Enter release year"
                                    value={movie.releaseYear}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="rating">Rating</label>
                                <input
                                    type="number"
                                    id="rating"
                                    name="rating"
                                    placeholder="Enter movie rating"
                                    value={movie.rating}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="form-field">
                                <label htmlFor="duration">Runtime</label>
                                <input
                                    type="text"
                                    id="duration"
                                    name="duration"
                                    placeholder="Enter runtime in minutes"
                                    value={movie.duration}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Full-Width Overview Field */}
                    <div className="form-field overview-field">
                        <label htmlFor="description">Overview</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter movie description"
                            value={movie.description}
                            onChange={this.handleChange}
                        ></textarea>
                    </div>

                    {/* Buttons */}
                    <div className="form-buttons">
                        <button type="button" className={`button cancel ${buttonClasses}`} onClick={onCancel}>
                            Cancel
                        </button>
                        <button type="submit" className={`button submit ${buttonClasses}`}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default MovieForm;