import type { Meta, StoryObj } from "@storybook/react";
import MovieDetails from "../components/MovieDetails/MovieDetails";

const meta: Meta<typeof MovieDetails> = {
  title: "Components/MovieDetails", 
  component: MovieDetails, 
  parameters: { layout: "centered" }, 
  tags: ["autodocs"], 
};

export default meta;
type Story = StoryObj<typeof MovieDetails>;

export const ExampleMovie: Story = {
  args: {
    imageUrl: "/src/assets/inception.png", 
    title: "Inception",
    releaseYear: "2010",
    rating: 8.8,
    duration: "148 minutes",
    genres: ["Action", "Sci-Fi", "Drama"],
    description:
      "A thief who steals corporate secrets through dream-sharing technology is tasked with planting an idea into the mind of a CEO. A thrilling and mind-bending journey unfolds.",
  },
};

export const AnotherMovie: Story = {
  args: {
    imageUrl: "/src/assets/matrix.jpg", 
    title: "The Matrix",
    releaseYear: "1999",
    rating: 9.0,
    duration: "136 minutes",
    genres: ["Action", "Sci-Fi"],
    description:
      "A computer hacker discovers the truth about reality and joins a group of rebels to fight against oppressive artificial intelligence.",
  },
};

export const ShortMovie: Story = {
  args: {
    imageUrl: "/src/assets/toyStory.jpeg", 
    title: "Toy Story",
    releaseYear: "1995",
    rating: 8.3,
    duration: "81 minutes",
    genres: ["Animation", "Comedy", "Family"],
    description:
      "The story of Woody, Buzz, and a group of toys that come to life during their owner's absence.",
  },
};