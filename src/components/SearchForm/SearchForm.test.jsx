import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "./SearchForm";

function mockFunction() {
    const calls = []; 
    const func = (...args) => {
      calls.push(args); 
    };
    func.calls = calls; 
    return func;
  }

describe("renders Initial value", () => {
    it("renders the SearchForm component", () => {
        render(<SearchForm />);
        const searchFormElement = screen.getByText(/Find Your Movie/i);
        expect(searchFormElement).toBeInTheDocument();
    });

    it("renders the SearchForm component with initial value", () => {
        render(<SearchForm searchCriteria="the grandfather" searchFunction={mockFunction()} />);
        const inputElement = screen.getByRole("textbox");
        expect(inputElement).toHaveValue("the grandfather");
      });
});

describe("SearchForm Component", () => {
    it("calls searchFunction when typing and clicking submit", () => {
      const mockedSearchFunction = mockFunction();
      render(<SearchForm searchCriteria="" searchFunction={mockedSearchFunction} />);
  
      const inputElement = screen.getByRole("textbox");
      const submitButton = screen.getByRole("button", { name: /Search/i });
  
      fireEvent.change(inputElement, { target: { value: "Avatar" } });
      fireEvent.click(submitButton);
  
      expect(mockedSearchFunction.calls.length).toBe(1); 
      expect(mockedSearchFunction.calls[0][0]).toBe("Avatar"); 
    });
  });

  describe("SearchForm Component", () => {
    it("calls searchFunction with when Enter key is pressed ", () => {
      const mockedSearchFunction = mockFunction();
  
      render(<SearchForm searchCriteria="" searchFunction={mockedSearchFunction} />);
  
      const inputElement = screen.getByRole("textbox");
  
      fireEvent.change(inputElement, { target: { value: "The Matrix" } });
      fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });
  
      expect(mockedSearchFunction.calls.length).toBe(1); 
      expect(mockedSearchFunction.calls[0][0]).toBe("The Matrix"); 
    });

    it("does not call searchFunction if the input value is empty and Enter is pressed", () => {
        const mockSearchFunction = mockFunction();
        render(<SearchForm searchCriteria="" searchFunction={mockSearchFunction} />);
      
        const inputElement = screen.getByRole("textbox");
        fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });
      
        expect(mockSearchFunction.calls.length).toBe(1); 
      });

    it("does not call searchFunction when a non-Enter key is pressed", () => {
        const mockSearchFunction = mockFunction();
        render(<SearchForm searchCriteria="" searchFunction={mockSearchFunction} />);
      
        const inputElement = screen.getByRole("textbox");
        fireEvent.keyDown(inputElement, { key: "Escape", code: "Escape" });
      
        expect(mockSearchFunction.calls.length).toBe(0); // Expect no calls
      });
  });