import React from "react";
import PropTypes from "prop-types";

const FilterDropdown = ({ options, setSelectedOption }) => (
  <select onChange={(e) => setSelectedOption(e.target.value)}>
    <option value="">All</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

FilterDropdown.propTypes = {
  options: PropTypes.array.isRequired,
  setSelectedOption: PropTypes.func.isRequired,
};

export default FilterDropdown;
