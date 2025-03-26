import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter Component", () => {

  describe("Initialization Tests", () => {
    test("displays the initial count provided via props", () => {
      render(<Counter initialValue={10} />);
      const countElement = screen.getByText(/Count: 10/i);
      expect(countElement).toBeInTheDocument();
    });

    test("displays count as 0 if no initialValue is provided", () => {
      render(<Counter />);
      const countElement = screen.getByText(/Count: 0/i);
      expect(countElement).toBeInTheDocument();
    });
  });

  describe("Decrement Button Tests", () => {
    test("decrements the count by 1 on button click", () => {
      render(<Counter initialValue={10} />);

      const decrementButton = screen.getByText(/Decrement/i);
      fireEvent.click(decrementButton);

      const countElement = screen.getByText(/Count: 9/i);
      expect(countElement).toBeInTheDocument();
    });

    test("allows decrementing past 0 (negative values)", () => {
      render(<Counter initialValue={0} />);

      const decrementButton = screen.getByText(/Decrement/i);
      fireEvent.click(decrementButton);

      const countElement = screen.getByText(/Count: -1/i);
      expect(countElement).toBeInTheDocument();
    });
  });


  describe("Increment Button Tests", () => {
    test("increments the count by 1 on button click", () => {
      render(<Counter initialValue={5} />);
  
      const incrementButton = screen.getByText(/Increment/i);
      fireEvent.click(incrementButton);
  
      const countElement = screen.getByText(/Count: 6/i);
      expect(countElement).toBeInTheDocument();
    });
  
    test("handles multiple increment button clicks correctly", () => {
      render(<Counter initialValue={0} />);
  
      const incrementButton = screen.getByText(/Increment/i);
  
      fireEvent.click(incrementButton); 
      fireEvent.click(incrementButton); 
      fireEvent.click(incrementButton); 
  
      const countElement = screen.getByText(/Count: 3/i);
      expect(countElement).toBeInTheDocument();
    });
  });
});