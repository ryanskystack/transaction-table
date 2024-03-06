import React from "react";
import { render } from "@testing-library/react";
import Table from "../../../src/components/Table";

describe("components - Table", () => {
    const mockData = [
        { status: "status1", date: "date1", merchant: "merchant1", team_member: "team_member1", category: "category1", amount: 100, gst: 7, budget: "budget1", receipt: true, billable: false },
        { status: "status2", date: "date2", merchant: "merchant2", team_member: "team_member2", category: "category2", amount: 200, gst: 14, budget: "budget2", receipt: false, billable: true },
    ];
    const mockStatuses = ["status1", "status2"];
    const mockCategories = ["category1", "category2"];
    const mockMerchants = ["merchant1", "merchant2"];
    const mockBudgets = ["budget1", "budget2"];
    const mockSetSelectedCategory = jest.fn();
    const mockSetSelectedStatus = jest.fn();
    const mockSetSelectedMerchant = jest.fn();
    const mockSetSelectedBudget = jest.fn();
    const mockHandleBillableChange = jest.fn();

    it("renders correctly", () => {
        const { getAllByRole } = render(
            <Table
                data={mockData}
                statuses={mockStatuses}
                categories={mockCategories}
                merchants={mockMerchants}
                budgets={mockBudgets}
                setSelectedCategory={mockSetSelectedCategory}
                setSelectedStatus={mockSetSelectedStatus}
                setSelectedMerchant={mockSetSelectedMerchant}
                setSelectedBudget={mockSetSelectedBudget}
                handleBillableChange={mockHandleBillableChange}
            />
        );

        // Check that the correct number of rows are rendered
        const rows = getAllByRole("row");
        expect(rows).toHaveLength(mockData.length + 1);

        // Check that the correct number of cells are rendered
        const cells = getAllByRole("cell");
        const expectedCells = Object.keys(mockData[0]).length * (mockData.length);
        expect(cells).toHaveLength(expectedCells);
    });
});