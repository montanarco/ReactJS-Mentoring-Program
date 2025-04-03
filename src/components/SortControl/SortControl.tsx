import React from "react";
import "./SortControl.css";

interface SortControlProps {
  selectedValue: string; 
  onChange: (selected: string) => void; 
  variant?: "primary" | "secondary"; 
}

class SortControl extends React.Component<SortControlProps> {
  constructor(props: SortControlProps) {
    super(props);
  }

  handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { onChange } = this.props;
    const newValue = event.target.value;
    onChange(newValue);
  };

  render() {
    const { selectedValue, variant = "primary" } = this.props;

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
          onChange={this.handleSelectionChange}
        >
          <option className={optionClass} value="Release Date">Release Date</option>
          <option className={optionClass} value="Title">Title</option>
          <option className={optionClass} value="Rating">Rating</option>
        </select>
      </div>
    );
  }
}

export default SortControl;