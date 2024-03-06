import React from "react";
import PropTypes from "prop-types";
import { PaginationBar, PageButton } from "./styles";

const Pagination = ({ totalItems, itemsPerPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <PaginationBar data-testid="pagination-bar">
      {Array(totalPages)
        .fill()
        .map((_, index) => (
          <PageButton
            key={`page-${index + 1}`}
            onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </PageButton>
        ))}
    </PaginationBar>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
export default Pagination;
