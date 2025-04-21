import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import MovieForm, { MovieFormProps, Movie } from "../components/MovieForm/MovieForm";

const dummyMovie: Movie = {
  title: "Inception",
  releaseYear: 2010,
  imageUrl: "https://example.com/inception.jpg",
  rating: 8.8,
  genres: ["Action", "Sci-Fi", "Thriller"],
  duration: "148 minutes",
  director: "Christopher Nolan",
  description: "A mind-bending thriller that delves into dreams and reality.",
};

export default {
  title: "Components/MovieForm", // Storybook folder and component name
  component: MovieForm,
  argTypes: {
    onSubmit: { action: "submit" },  // Logs the onSubmit calls in the action panel
    onCancel: { action: "cancel" },  // Logs the onCancel calls in the action panel
    variant: {
      control: { type: "select" },   // Dropdown to switch between primary/secondary styles
      options: ["primary", "secondary"],
    },
  },
} as Meta<MovieFormProps>;

type Story = StoryObj<MovieFormProps>;

/**
 * Story 1: Default State (Add Movie form)
 */
export const AddMovie: Story = {
  args: {
    movie: null, // No movie provided, form starts with empty fields
    variant: "primary",
  },
};

/**
 * Story 2: Edit an Existing Movie
 */
export const EditMovie: Story = {
  args: {
    movie: dummyMovie,
    variant: "primary",
  },
};

/**
 * Story 3: Add Movie with Secondary Variant
 */
export const AddMovieSecondary: Story = {
  args: {
    movie: null,
    variant: "secondary", // Uses the secondary button styling
  },
};

/**
 * Story 4: Edit Movie with Secondary Variant
 */
export const EditMovieSecondary: Story = {
  args: {
    movie: dummyMovie,
    variant: "secondary", // Uses the secondary button styling
  },
};