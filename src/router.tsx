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
import DialogForm from "./components/DialogForm/DialogForm";

export const myBrowser = createBrowserRouter([
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
          children: [
            { path: "new",
              element: <DialogForm />,
            },
          ]
        },
        {
          path: ":movieId", // Relative path for movie details (e.g., "/movie-list-page/:movieId")
          element: <MovieDetails movieInp={null} />,
          loader: MovieDetailsLoader,
          children: [
            { path: "edit", //"/movie-list-page/:movieId/edit"
              element: <DialogForm />,
            },
          ]
        },
      ],
    },
    {
      path: "*",
      element: <Layout />,
    },
  ]);