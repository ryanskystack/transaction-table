import styled from "styled-components";

export const StyledTable = styled.table`
  margin: 20px 0;
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
`;

export const StyledHeader = styled.th`
  background-color: #f5f5f5;
  color: #333;
  padding: 10px;
  text-align: center;
`;

export const StyledRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const StyledCell = styled.td`
  padding: 10px;
  text-align: left;
`;
