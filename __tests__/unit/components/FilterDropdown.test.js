import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FilterDropdown from "../../../src/components/FilterDropdown";

describe("FilterDropdown", () => {
  it("renders correctly", () => {
    const options = ["Option 1", "Option 2", "Option 3"];
    const setSelectedOption = jest.fn();

    const { getByText } = render(
      <FilterDropdown options={options} setSelectedOption={setSelectedOption} />
    );

    // Check that all options are rendered
    options.forEach((option) => {
      expect(getByText(option)).toBeInTheDocument();
    });
  });

  it("calls setSelectedOption when an option is selected", () => {
    const options = ["Option 1", "Option 2", "Option 3"];
    const setSelectedOption = jest.fn();

    const { getByRole } = render(
      <FilterDropdown options={options} setSelectedOption={setSelectedOption} />
    );

    // Simulate selecting an option
    fireEvent.change(getByRole("combobox"), { target: { value: "Option 1" } });

    // Check that setSelectedOption was called with the correct argument
    expect(setSelectedOption).toHaveBeenCalledWith("Option 1");
  });
});
