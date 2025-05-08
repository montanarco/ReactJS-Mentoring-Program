const transformMovieItem = (item: any) => {
        
    return {
        id: item.id,
        title: item.title,
        releaseYear: new Date(item.release_date).getFullYear(),
        imageUrl: item.poster_path,
        rating: item.vote_average,
        genres: item.genres,
        duration: `${item.runtime} min`,
        director: 'N/A', 
        description: item.overview,
    };
}

const transformMovieData = (data: any) => {
    if (!Array.isArray(data)) 
        return [transformMovieItem(data)];

    return data.map((movie: any) => transformMovieItem(movie));
};

export default transformMovieData;