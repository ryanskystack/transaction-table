import styled from "styled-components";

export const SearchBarContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
`;

export const SearchForm = styled.form`
  display: flex;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const SearchButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ResetButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  height: 40px;
  padding: 10px 15px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;
