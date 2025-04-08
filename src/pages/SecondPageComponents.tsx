import React, { useState } from "react";
import MovieGrid from "../components/MovieGrid/MovieGrid"; 
import MovieDetails from "../components/MovieDetails/MovieDetails";
import SortControl from "../components/SortControl/SortControl";
import Dialog from "../components/Dialog/Dialog";
import MovieForm, { Movie } from "../components/MovieForm/MovieForm";

const SecondPageComponents = () => {
  const movies = [
    {
      imageUrl: "/src/assets/image_1.jpg",
      name: "Movie 1",
      releaseYear: 2022,
      director: "Director 1",
      genres: ["Action", "Drama"],
    },
    {
      imageUrl: "/src/assets/image_2.jpg",
      name: "Movie 2",
      releaseYear: 2021,
      director: "Director 2",
      genres: ["Comedy", "Family"],
    },
    {
      imageUrl: "/src/assets/image_3.jpg",
      name: "Movie 3",
      releaseYear: 2020,
      director: "Director 3",
      genres: ["Thriller", "Mystery"],
    },
    {
      imageUrl: "/src/assets/image_4.jpg",
      name: "Movie 4",
      releaseYear: 2019,
      director: "Director 4",
      genres: ["Science Fiction", "Adventure"],
    },
    {
      imageUrl: "/src/assets/image_5.jpeg",
      name: "Movie 5",
      releaseYear: 2018,
      director: "Director 5",
      genres: ["Horror"],
    },
    {
      imageUrl: "/src/assets/image_1.jpg",
      name: "Movie 1",
      releaseYear: 2022,
      director: "Director 1",
      genres: ["Action", "Drama"],
    },
    {
      imageUrl: "/src/assets/image_2.jpg",
      name: "Movie 2",
      releaseYear: 2021,
      director: "Director 2",
      genres: ["Comedy", "Family"],
    },
    {
      imageUrl: "/src/assets/image_3.jpg",
      name: "Movie 3",
      releaseYear: 2020,
      director: "Director 3",
      genres: ["Thriller", "Mystery"],
    },
    {
      imageUrl: "/src/assets/image_4.jpg",
      name: "Movie 4",
      releaseYear: 2019,
      director: "Director 4",
      genres: ["Science Fiction", "Adventure"],
    },
    {
      imageUrl: "/src/assets/image_5.jpeg",
      name: "Movie 5",
      releaseYear: 2018,
      director: "Director 5",
      genres: ["Horror"],
    },
  ];

  const movieDetails = {
    imageUrl: "/src/assets/inception.png", 
    title: "Inception",
    releaseYear: "2010",
    rating: 9.0,
    duration: "148 minutes",
    genres: ["Action", "Drama", "Sci-Fi"],
    description: 
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
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

  const handleFormSubmit = (movie: {} | null) => {
    if (movie === null) {
        console.log("No movie submitted");
    } else {
        console.log("Movie submitted:", movie);
    }
};
  const handleFormCancel = () => {
    console.log("Form cancelled");
  };

  const [sortBy, setSortBy] = useState("Release Date"); // Current selected sort option

  const handleSortChange = (selected: string) => {
    console.log(`Selected sorting option: ${selected}`);
    setSortBy(selected);
  };

    return (
      <>
      <MovieDetails {...movieDetails} />

      <SortControl
        selectedValue={sortBy}
        onChange={handleSortChange}
        variant="primary"
      />
      
      <MovieGrid
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
        <Dialog title="Add Movie" onClose={handleCloseNewMovie}>
         <MovieForm
          movie={null} 
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
        </Dialog>
      )}
      
      <button className="open-dialog-button" onClick={handleOpenEditMovie}>
            show Edit Movie
      </button>
      {isEditMovie && (
        <Dialog title="Edit Movie" onClose={handleCloseEditMovie}>
         <MovieForm
          movie={movieFormDummy} 
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
        </Dialog>
      )}
      </>
    );
  
}

export default SecondPageComponents;