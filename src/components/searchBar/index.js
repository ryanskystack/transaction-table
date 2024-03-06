import React from "react";
import PropTypes from "prop-types";
import { SearchForm, SearchInput, SearchButton } from "./styles";

const SearchBar = ({
  setSearchQuery,
  inputValue,
  setInputValue,
  placeholder,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(inputValue);
  };

  return (
    <SearchForm onSubmit={handleSubmit} data-testid="search-form">
      <SearchInput
        data-testid="search-input"
        type="text"
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
        placeholder={placeholder}
      />
      <SearchButton type="submit" data-testid="search-button">Search</SearchButton>
    </SearchForm>
  );
};

SearchBar.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchBar;
