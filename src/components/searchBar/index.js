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
    <SearchForm onSubmit={handleSubmit}>
      <SearchInput
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
      />
      <SearchButton type="submit">Search</SearchButton>
    </SearchForm>
  );
};

SearchBar.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchBar;
