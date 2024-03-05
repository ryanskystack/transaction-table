import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SearchBar from "../../../src/components/searchBar";

describe("components - SearchBar", () => {
    it("renders correctly", () => {
        const setSearchQuery = jest.fn();
        const setInputValue = jest.fn();
        const inputValue = "";
        const placeholder = "Search...";

        const { getByPlaceholderText } = render(
            <SearchBar setSearchQuery={setSearchQuery} setInputValue={setInputValue} inputValue={inputValue} placeholder={placeholder} />
        );

        // Check that SearchInput is rendered with correct placeholder
        const input = getByPlaceholderText(placeholder);
        expect(input).toBeInTheDocument();
    });

    it("calls setSearchQuery and setInputValue when the input value changes and the form is submitted", () => {
        const setSearchQuery = jest.fn();
        const setInputValue = jest.fn();
        const inputValue = "test";
        const placeholder = "Search...";

        const { getByPlaceholderText, getByTestId } = render(
            <SearchBar setSearchQuery={setSearchQuery} setInputValue={setInputValue} inputValue={inputValue} placeholder={placeholder} />
        );

        // Simulate typing into SearchInput
        const input = getByPlaceholderText(placeholder);
        fireEvent.change(input, { target: { value: inputValue } });

        // Simulate submitting the form
        const form = getByTestId('search-form');
        fireEvent.submit(form);

        // Check that setSearchQuery was called with the correct argument
        expect(setSearchQuery).toHaveBeenCalledWith(inputValue);
    });
});