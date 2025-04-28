const transformMovieData = (data: any) => {
    if (!Array.isArray(data)) {
        console.error('Expected an array but got:', data);
        return []; // Return an empty array
    }

    return data.map((movie: any) => ({
        title: movie.title,
        releaseYear: new Date(movie.release_date).getFullYear(),
        imageUrl: movie.poster_path,
        rating: movie.vote_average,
        genres: movie.genres,
        duration: `${movie.runtime} min`,
        director: 'N/A', // API doesn't provide director information
        description: movie.overview,
    }));
};

export default transformMovieData;