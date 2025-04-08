import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieForm, {Movie} from "./MovieForm";

const dummyMovie = {
  title: "Inception",
  releaseYear: 2010,
  imageUrl: "https://example.com/inception.jpg",
  rating: 8.8,
  genres: ["Action", "Sci-Fi", "Thriller"],
  duration: "148 minutes",
  director: "Christopher Nolan",
  description: "A mind-bending thriller that delves into dreams and reality.",
};

describe("MovieForm Component", () => {
  it("renders the form with empty fields for adding a new movie", () => {
    const mockOnSubmit = jest.fn();
    const mockOnCancel = jest.fn();

    render(<MovieForm movie={null} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    // Check the form header
    expect(screen.getByText("Add Movie")).toBeInTheDocument();

    // Ensure input fields are empty
    expect(screen.getByLabelText("Title")).toHaveValue("");
    expect(screen.getByLabelText("Release Year")).toHaveValue(null);
    expect(screen.getByLabelText("Director")).toHaveValue("");
    expect(screen.getByLabelText("Overview")).toHaveValue("");
  });

  it("renders the form with prefilled fields for editing a movie", () => {
    const mockOnSubmit = jest.fn();
    const mockOnCancel = jest.fn();

    render(<MovieForm movie={dummyMovie} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    // Check the form header
    expect(screen.getByText("Edit Movie")).toBeInTheDocument();

    // Ensure input fields are populated with movie data
    expect(screen.getByLabelText("Title")).toHaveValue(dummyMovie.title);
    expect(screen.getByLabelText("Release Year")).toHaveValue(dummyMovie.releaseYear);
    expect(screen.getByLabelText("Director")).toHaveValue(dummyMovie.director);
    expect(screen.getByLabelText("Overview")).toHaveValue(dummyMovie.description);
  });

  it("calls onSubmit with updated movie data when the form is submitted", () => {
    const mockOnSubmit = jest.fn();
    const mockOnCancel = jest.fn();

    render(<MovieForm movie={dummyMovie} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    // Update the "Title" input
    const titleInput = screen.getByLabelText("Title");
    fireEvent.change(titleInput, { target: { value: "Interstellar" } });
    expect(titleInput).toHaveValue("Interstellar");

    // Submit the form
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    // Assert the onSubmit callback was called with updated data
    expect(mockOnSubmit).toHaveBeenCalledWith({
      ...dummyMovie,
      title: "Interstellar",
    });
  });

  it("calls onCancel when the cancel button is clicked", () => {
    const mockOnSubmit = jest.fn();
    const mockOnCancel = jest.fn();

    render(<MovieForm movie={dummyMovie} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    // Click the Cancel button
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    // Assert the onCancel callback was called
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("highlights input fields with a red border when focused", () => {
    const mockOnSubmit = jest.fn();
    const mockOnCancel = jest.fn();

    render(<MovieForm movie={null} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    // Focus on the "Title" input
    const titleInput = screen.getByLabelText("Title");
    fireEvent.focus(titleInput);

    // Assert the input gets the focus CSS class applied (test visually with jest-dom)
    expect(titleInput).toHaveFocus();
    expect(titleInput).toHaveStyle("border-color: #f65261");
  });
});