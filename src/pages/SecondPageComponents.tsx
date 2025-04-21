import React, { useState } from "react";
import MovieGrid from "../components/MovieGrid/MovieGrid"; 
import MovieDetails from "../components/MovieDetails/MovieDetails";
import SortControl from "../components/SortControl/SortControl";
import Dialog from "../components/Dialog/Dialog";
import MovieForm, { Movie } from "../components/MovieForm/MovieForm";
import FormModal from "../components/FormModal/FormModal";
import movies from "../assets/movies.json"; 
const SecondPageComponents = () => {


  const testMovie: Movie = {
    imageUrl: "/src/assets/inception.png", 
    title: "Inception",
    releaseYear: 2010,
    rating: 9.0,
    duration: "148 minutes",
    director: "Christopher Nolan",
    genres: ["Action", "Drama", "Sci-Fi"],
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  };

  const movieFormDummy: Movie = {
    title: "Inception",
    releaseYear: 2010,
    imageUrl: "https://example.com/inception.jpg",
    rating: 8.8,
    genres: ["Action", "Sci-Fi", "Thriller"],
    duration: "148 minutes",
    director: "Christopher Nolan",
    description: "A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task: planting an idea into the mind of a C.E.O."
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const [isEditMovie, setIsEditMovie] = useState(false);

  const handleOpenEditMovie = () => {
    setIsEditMovie(true);
  };

  const handleCloseEditMovie = () => {
    setIsEditMovie(false);
  };

  const [isNewMovie, setIsNewMovie] = useState(false);

  const handleOpenNewMovie = () => {
    setIsNewMovie(true);
  };

  const handleCloseNewMovie = () => {
    setIsNewMovie(false);
  };

  const handleFormSubmit = (movie: Movie | null) => {
    if (movie === null) {
        console.log("No movie submitted");
    } else {
        console.log("Movie submitted:", movie);
    }
};
  const handleFormCancel = () => {
    console.log("Form cancelled");
  };

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    console.log('Selected Movie:', movie);
};

  const [sortBy, setSortBy] = useState("Release Date"); // Current selected sort option

  const handleSortChange = (selected: string) => {
    console.log(`Selected sorting option: ${selected}`);
    setSortBy(selected);
  };

  const handleCloseMovie = () => {
    setSelectedMovie(null);
    console.log('Closed Movie Details');
};

    return (
      <>
      {selectedMovie && <MovieDetails movie={testMovie} OnCloseMovie={handleCloseMovie}/>}

      <SortControl
        selectedValue={sortBy}
        onChange={handleSortChange}
        variant="primary"
      />
      
      <MovieGrid
        onMovieSelected={handleMovieSelect}
        currentPage={1}
        movies={movies} 
        columns={3} 
        itemsPerPageOptions={[3, 6, 9, 12]} 
      />

      

      <button className="open-dialog-button" onClick={handleOpenDialog}>
        Open Dialog
      </button>

      {isDialogOpen && (
        <Dialog title="Success!" onClose={handleCloseDialog}>
          <p>The operation was completed successfully.</p>
        </Dialog>
      )}

      <button className="open-dialog-button" onClick={handleOpenNewMovie}>
            show New Movie
      </button>

      {isNewMovie && (
        <FormModal title="Add Movie" onClose={handleCloseNewMovie}> 
         <MovieForm
          movie={null} 
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
        </FormModal>
      )}
      
      <button className="open-dialog-button" onClick={handleOpenEditMovie}>
            show Edit Movie
      </button>
      {isEditMovie && (
        <FormModal title="Edit Movie" onClose={handleCloseEditMovie}> 
         <MovieForm
          movie={movieFormDummy} 
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
        </FormModal>
      )}
      </>
    );
  
}

export default SecondPageComponents;