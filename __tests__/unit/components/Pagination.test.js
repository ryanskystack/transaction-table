import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Pagination from "../../../src/components/pagination";

describe("components - Pagination", () => {
    it("renders correctly", () => {
        const totalItems = 10;
        const itemsPerPage = 2;
        const setCurrentPage = jest.fn();

        const { getAllByRole } = render(
            <Pagination totalItems={totalItems} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} />
        );

        // Check that all PageButtons are rendered
        const buttons = getAllByRole('button');
        expect(buttons).toHaveLength(totalItems / itemsPerPage);
    });

    it("calls setCurrentPage when a PageButton is clicked", () => {
        const totalItems = 10;
        const itemsPerPage = 2;
        const setCurrentPage = jest.fn();

        const { getAllByRole } = render(
            <Pagination totalItems={totalItems} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} />
        );

        // Simulate clicking a PageButton
        const buttons = getAllByRole('button');
        fireEvent.click(buttons[1]);

        // Check that setCurrentPage was called with the correct argument
        expect(setCurrentPage).toHaveBeenCalledWith(2);
    });
});