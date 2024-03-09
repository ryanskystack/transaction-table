import styled from "styled-components";

export const PaginationBar = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PageButton = styled.button`
  background-color: ${props => props.selected ? '#333' : '#f5f5f5'};
  border: none;
  color: ${props => props.selected ? '#f5f5f5' : '#333'};
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.selected ? '#333' : '#ddd'};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
