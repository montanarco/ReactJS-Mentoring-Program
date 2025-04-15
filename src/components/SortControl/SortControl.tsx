import React from "react";
import "./SortControl.css";

interface SortControlProps {
  selectedValue: string; 
  onChange: (selected: string) => void; 
  variant?: "primary" | "secondary"; 
}

const SortControl: React.FC<SortControlProps> = ({ selectedValue, onChange, variant = "primary" }) => {
  const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  const controlClass = `sort-control ${variant}`;
  const selectClass = `sort-select ${variant}`;
  const optionClass = `option ${variant}`;

  return (
    <div className={controlClass}>
      {/* Label */}
      <label className="sort-label" htmlFor="sort-select">
        Sort by:
      </label>

      {/* Select Dropdown */}
      <select
        id="sort-select"
        className={selectClass}
        value={selectedValue}
        onChange={handleSelectionChange}
      >
        <option className={optionClass} value="No Sorted">No sorted</option>
        <option className={optionClass} value="release_date">Release Date</option>
        <option className={optionClass} value="title">Title</option>
        <option className={optionClass} value="vote_average">Rating</option>
      </select>
    </div>
  );
};

export default SortControl;