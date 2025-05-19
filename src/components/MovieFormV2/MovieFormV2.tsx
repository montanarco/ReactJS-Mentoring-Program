import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import "../MovieForm/MovieForm.css";
import { Movie } from "../MovieForm/MovieForm";

export interface MovieFormProps {
    movie?: Movie | null;
    onSubmit: (movie: any) => void;
    onUpdate: (movie: Movie) => void; 
    onCancel: () => void;
    variant?: "primary" | "secondary";
    disabled?: boolean;
}

const MovieFormV2: React.FC<MovieFormProps> = ({ movie, onSubmit, onUpdate, onCancel, variant = "primary", disabled }) => {
    const availableGenres: string[] = [
        'Action', 'Comedy', 'Drama', 'Horror', 'Science Fiction', 'Thriller',
        'Western', 'Animation', 'Mystery', 'Romance', 'Adventure', 'Fantasy',
        'Documentary', 'Family', 'War', 'History', 'Crime'
    ];

    const buttonClasses = variant === "primary" ? "button-primary" : "button-secondary";

    const { control, handleSubmit, reset, register, formState: { errors } } = useForm<Movie>({
        defaultValues: movie || {
            genres: [],
            title: "",
            tagline: "",
            vote_average: "",
            vote_count: "",
            release_date: "",
            poster_path: "",
            overview: "",
            budget: "",
            revenue: "",
            runtime: "",
        },
    });

    // Side effect: Reset form values when `movie` prop changes
    useEffect(() => {
        if (movie) {
            reset(movie); 
        }
    }, [movie, reset]); 

    

    const onFormSubmit = (data: Movie) => {
        console.log("Submitting form data:", data);

        const moviePayload: any = {
            id: movie?.id || undefined,
            title: data.title,
            tagline: data.tagline,
            vote_average: Number(data.vote_average),
            vote_count: Number(data.vote_count),
            release_date: data.release_date,
            poster_path: data.poster_path,
            overview: data.overview,
            budget: Number(data.budget),
            revenue: Number(data.revenue),
            runtime: Number(data.runtime),
            genres: data.genres,
        };

        if (movie?.id === 0 || movie?.id === undefined) {
            // Clone the payload without the `id`
            const { id, ...movieToCreate } = moviePayload;
            console.log("Creating new movie:", movieToCreate);
            onSubmit(movieToCreate); 
        } else {
            console.log("Updating existing movie:", moviePayload);
            onUpdate(moviePayload); 
        }
        
    };

    return (
        <div className="movie-form-container">
            <form className="movie-form"
                onSubmit={handleSubmit(onFormSubmit)}>
                {/* First Column */}
                <div className="form-columns">
                    <div className="form-column">
                        <div className="form-field">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                placeholder="Enter movie title"
                                {...register("title", { required: "Title is required" })}
                            />
                            {errors.title && <span className="error">{errors.title.message}</span>}
                        </div>

                        <div className="form-field">
                            <label htmlFor="tagline">Tagline</label>
                            <input
                                type="text"
                                id="tagline"
                                placeholder="Enter tagline"
                                {...register("tagline", { required: "Tagline is required" })}
                            />
                            {errors.tagline && <span className="error">{errors.tagline.message}</span>}
                        </div>

                        {/* Genres */}
                        <div className="form-field scroll-box">
                            <label htmlFor="genres">Genres</label>
                            <div id="genres">
                                {availableGenres.map((genre) => (
                                    <div className="checkbox-container" key={genre}>
                                        <label>{genre}</label>
                                        <Controller
                                            control={control}
                                            name="genres"
                                            defaultValue={movie?.genres || []}
                                            render={({ field }) => (
                                                <input
                                                    type="checkbox"
                                                    value={genre}
                                                    checked={field.value.includes(genre)}
                                                    onChange={(e) => {
                                                        const checked = e.target.checked;
                                                        if (checked) {
                                                            field.onChange([...field.value, genre]);
                                                        } else {
                                                            field.onChange(
                                                                field.value.filter((g: string) => g !== genre)
                                                            );
                                                        }
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {errors.genres && <span className="error">{errors.genres.message}</span>}

                        {/* Poster URL */}
                        <div className="form-field">
                            <label htmlFor="poster_path">Poster URL</label>
                            <input
                                type="text"
                                id="poster_path"
                                placeholder="Enter poster URL"
                                {...register("poster_path", { required: "Poster URL is required" })}
                            />
                            {errors.poster_path && <span className="error">{errors.poster_path.message}</span>}
                        </div>
                    </div>

                    {/* Second Column */}
                    <div className="form-column">
                        <div className="form-field">
                            <label htmlFor="release_date">Release Date</label>
                            <input
                                type="date"
                                id="release_date"
                                {...register("release_date", { required: "Release date is required" })}
                            />
                            {errors.release_date && <span className="error">{errors.release_date.message}</span>}
                        </div>

                        <div className="form-field">
                            <label htmlFor="vote_average">Vote Average</label>
                            <input
                                type="number"
                                id="vote_average"
                                step="0.1"
                                placeholder="Enter rating"
                                {...register("vote_average", {
                                    required: "Vote average is required",
                                    min: 0,
                                    max: 10,
                                })}
                            />
                            {errors.vote_average && <span className="error">{errors.vote_average.message}</span>}
                        </div>

                        <div className="form-field">
                            <label htmlFor="vote_count">Vote Count</label>
                            <input
                                type="number"
                                id="vote_count"
                                placeholder="Enter number of votes"
                                {...register("vote_count", { required: "Vote count is required" })}
                            />
                            {errors.vote_count && <span className="error">{errors.vote_count.message}</span>}
                        </div>

                        <div className="form-field">
                            <label htmlFor="runtime">Runtime</label>
                            <input
                                type="number"
                                id="runtime"
                                placeholder="Enter runtime in minutes"
                                {...register("runtime", { required: "Runtime is required" })}
                            />
                            {errors.runtime && <span className="error">{errors.runtime.message}</span>}
                        </div>

                        <div className="form-field">
                            <label htmlFor="budget">Budget</label>
                            <input
                                type="number"
                                id="budget"
                                placeholder="Enter budget"
                                {...register("budget", { required: "Budget is required" })}
                            />
                            {errors.budget && <span className="error">{errors.budget.message}</span>}
                        </div>

                        <div className="form-field">
                            <label htmlFor="revenue">Revenue</label>
                            <input
                                type="number"
                                id="revenue"
                                placeholder="Enter revenue"
                                {...register("revenue", { required: "Revenue is required" })}
                            />
                            {errors.revenue && <span className="error">{errors.revenue.message}</span>}
                        </div>
                    </div>
                </div>

                {/* Overview Field */}
                <div className="form-field overview-field">
                    <label htmlFor="overview">Overview</label>
                    <textarea
                        id="overview"
                        placeholder="Enter movie description"
                        {...register("overview", { required: "Overview is required" })}
                    ></textarea>
                    {errors.overview && <span className="error">{errors.overview.message}</span>}
                </div>

                {/* Buttons */}
                <div className="form-buttons">
                    <button
                        type="button"
                        className={`button cancel ${buttonClasses}`}
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button type="submit" className={`button submit ${buttonClasses}`} disabled={disabled}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MovieFormV2;