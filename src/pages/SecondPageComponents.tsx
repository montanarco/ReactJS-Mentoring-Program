import React, { useState } from "react";
import MovieGrid from "../components/MovieGrid/MovieGrid";
import MovieDetails from "../components/MovieDetails/MovieDetails";
import SortControl from "../components/SortControl/SortControl";
import Dialog from "../components/Dialog/Dialog";
import MovieForm, { Movie } from "../components/MovieForm/MovieForm";
import FormModal from "../components/FormModal/FormModal";
import movies from "../assets/movies.json";
import { useNavigate } from "react-router-dom";
import MovieFormV2 from "../components/MovieFormV2/MovieFormV2";

const SecondPageComponents = () => {

  const navigate = useNavigate();


  const testMovie: Movie = {
    id: 1,
    poster_path: "/src/assets/inception.png",
    title: "Inception",
    release_date: "2010",
    vote_average: "9.0",
    runtime: "148 minutes",
    budget: "5000000",
    genres: ["Action", "Drama", "Sci-Fi"],
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    tagline: " Your mind is the scene of the crime.",
    vote_count: "1222",
    revenue: "50121"
  };

  const movieFormDummy: Movie = {
    id: 2,
    title: "Inception",
    release_date: "2010",
    poster_path: "https://example.com/inception.jpg",
    vote_average: "8.8",
    genres: ["Action", "Sci-Fi", "Thriller"],
    runtime: "148 minutes",
    budget: "500000",
    overview: "A thief who steals corporate secrets through use of dream-sharing technology is given the inverse task: planting an idea into the mind of a C.E.O.",
    tagline: "inside the mind is the scene for the crime",
    vote_count: "1222",
    revenue: "50121"
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

  const [isFormMovie2, setIsFormMovie2] = useState(false);

  const handleOpenFormMovieV2 = () => {
    setIsFormMovie2(true);
  };

  const handleCloseFormMovieV2 = () => {
    setIsFormMovie2(false);
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
    navigate(`/movie-list-page/${movie.id}`, { replace: false }); // Navigate to movie details
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
      {selectedMovie && <MovieDetails movieInp={testMovie} OnCloseMovie={handleCloseMovie} />}

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

      <button className="open-dialog-button" onClick={handleOpenFormMovieV2}>
        show Form Movie V2
      </button>
      {isFormMovie2 && (
        <FormModal title="Form Movie v2" onClose={handleCloseFormMovieV2}>
          <MovieFormV2
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </FormModal>
      )}
    </>
  );

}

export default SecondPageComponents;