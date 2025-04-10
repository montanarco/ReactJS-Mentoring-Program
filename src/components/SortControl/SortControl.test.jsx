import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SortControl from "../components/SortControl/SortControl";

describe("SortControl Component", () => {
  it("should update the current selection when the user selects another value", () => {
    const mockOnChange = jest.fn();

    render(
      <SortControl
        selectedValue="Release Date"
        onChange={mockOnChange}
        variant="primary"
      />
    );

    const selectElement = screen.getByLabelText("Sort by:");
    expect(selectElement).toBeInTheDocument();
    expect(selectElement.value).toBe("Release Date"); // Initial value

    fireEvent.change(selectElement, { target: { value: "Title" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith("Title");

    expect(selectElement.value).toBe("Title");
  });
});