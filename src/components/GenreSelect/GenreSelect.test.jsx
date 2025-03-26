import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GenreSelect from "./GenreSelect";

function mockFunction() {
    const calls = []; 
    const func = (...args) => {
      calls.push(args); 
    };
    func.calls = calls; 
    return func;
  }

describe("renders Initial value", () => {

    it("renders the GenreSelect component with initial value", () => {
        const genres = ["Action", "Comedy"];
        const mockOnSelect = mockFunction(); 

        render(<GenreSelect genres={genres} selectedGenre=""  onSelect={mockOnSelect} />);

        const actionButton = screen.getByText("Action");
        const comedyButton = screen.getByText("Comedy");

        expect(actionButton).toBeInTheDocument();
        expect(comedyButton).toBeInTheDocument();
    });
});

describe("GenreSelect Component", () => {
    it("highlights the selected genre passed in props", () => {
        const genres = ["Action", "Comedy", "Drama"];
        const selectedGenre = "Comedy";
      
        render( <GenreSelect genres={genres} selectedGenre={selectedGenre} onSelect={mockFunction()} /> );
      
        const selectedButton = screen.getByText(selectedGenre);

        expect(selectedButton).toHaveClass("selected");

        const nonSelectedButtons = genres.filter((genre) => genre !== selectedGenre).map((genre) => screen.getByText(genre));
        nonSelectedButtons.forEach((button) => {  expect(button).not.toHaveClass("selected"); });
    });

    it("calls onSelect callback with the correct genre when a button is clicked", () => {
        const genres = ["Action", "Comedy", "Drama"];
        const mockOnSelect = mockFunction(); 
      
        render(
          <GenreSelect
            genres={genres}
            selectedGenre=""
            onSelect={mockOnSelect} 
          />
        );
      
        const actionButton = screen.getByText("Action");
        const comedyButton = screen.getByText("Comedy");
      
        fireEvent.click(actionButton);
      
        expect(mockOnSelect.calls).toHaveLength(1); 
        expect(mockOnSelect.calls[0]).toEqual(["Action"]); 
      
        fireEvent.click(comedyButton);
      
        expect(mockOnSelect.calls).toHaveLength(2); 
        expect(mockOnSelect.calls[1]).toEqual(["Comedy"]); 
    });
});