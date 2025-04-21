import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from 'react';
import Home from "./Home";
import Layout from "./Layout";
import CoreConcepts from "./pages/CoreConcepts";
import './App.css'
import Testing from "./pages/Testing";
import SecondPageComponents from "./pages/SecondPageComponents";
import MovieListPage from "./pages/MovieListPage";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import SearchForm from "./components/SearchForm/SearchForm";
import MovieDetailsLoader from "./loaders/MovieDetailsLoader";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "menu",
    element: <Layout />,
  },
  {
    path: "testing",
    element: <Testing />,
  },
  {
    path: "core-concepts",
    element: <CoreConcepts />,
  },
  {
    path: "second-page",
    element: <SecondPageComponents />,
  },
  {
    path: "/movie-list-page", // Parent route
    element: <MovieListPage />,
    children: [
      {
        path: "", // Relative path for the default child (e.g., "/movie-list-page")
        element: <SearchForm searchCriteria={""} />,
      },
      {
        path: ":movieId", // Relative path for movie details (e.g., "/movie-list-page/:movieId")
        element: <MovieDetails movieInp={null} />,
        loader: MovieDetailsLoader,
      },
    ],
  },
  {
    path: "*",
    element: <Layout />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />
}