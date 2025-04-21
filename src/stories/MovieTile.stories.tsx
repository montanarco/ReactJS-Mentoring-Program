import type { Meta, StoryObj } from "@storybook/react";
import MovieTile from "../components/MovieTile/MovieTile";

const meta: Meta<typeof MovieTile> = {
  title: "Components/MovieTile", // Appears in the Storybook sidebar
  component: MovieTile, // Points to the MovieTile component
  parameters: { layout: "centered" }, // Centers the stories in the layout
  tags: ["autodocs"], // Automatically generates documentation
};

export default meta;
type Story = StoryObj<typeof MovieTile>;

export const DefaultTile: Story = {
  args: {
    movie: {
      imageUrl: "/src/assets/image_1.jpg", // Replace with an actual image URL
      name: "Inception",
      releaseYear: 2010,
      director: "Christopher Nolan",
      genres: ["Action", "Sci-Fi", "Drama"],
    },
    onClick: () => alert("Tile clicked!"), // Callback for when tile is clicked
    onEdit: () => alert("Edit movie!"), // Callback for editing the movie
    onDelete: () => alert("Delete movie!"), // Callback for deleting the movie
  },
};

export const NoActions: Story = {
  args: {
    movie: {
      imageUrl: "/src/assets/image_2.jpg", // Replace with an actual image URL
      name: "The Matrix",
      releaseYear: 1999,
      director: "The Wachowskis",
      genres: ["Action", "Sci-Fi"],
    },
    onClick: undefined, // No click action defined
  },
};

export const ComedyTile: Story = {
  args: {
    movie: {
      imageUrl: "/src/assets/image_3.jpg", // Replace with an actual image URL
      name: "Dumb and Dumber",
      releaseYear: 1994,
      director: "Peter Farrelly",
      genres: ["Comedy", "Adventure"],
    },
    onClick: () => console.log("You clicked the Comedy tile!"),
    onEdit: () => console.log("Edit Comedy movie!"),
    onDelete: () => console.log("Delete Comedy movie!"),
  },
};

export const DramaTile: Story = {
  args: {
    movie: {
      imageUrl: "/src/assets/image_4.jpg", // Replace with an actual image URL
      name: "The Pursuit of Happyness",
      releaseYear: 2006,
      director: "Gabriele Muccino",
      genres: ["Drama", "Biography"],
    },
    onClick: () => console.log("Clicked on the Drama tile."),
    onEdit: () => console.log("Edit Drama movie!"),
    onDelete: () => console.log("Delete Drama movie!"),
  },
};