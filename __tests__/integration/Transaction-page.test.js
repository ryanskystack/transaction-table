import React from 'react';
import { render, fireEvent, waitFor, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TransactionsTable from '../../src/page/Transaction-page';

describe('components - TransactionsTable', () => {
    let container = null;

    beforeEach(() => {
        container = render(<TransactionsTable />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        expect(container).toBeTruthy();
        const SearchBarContainer = screen.getByTestId('searchbar-container');
        expect(SearchBarContainer).toBeInTheDocument();
        const table = screen.getByTestId('table');
        expect(table).toBeInTheDocument();
        const pagination = screen.getByTestId('pagination-bar');
        expect(pagination).toBeInTheDocument();
    });

    it('displays transactions correctly', async () => {
        // Get all rows in the table
        const rows = screen.getAllByRole('row');

        // Assert that there are 11 rows (10 data rows plus the header row)
        expect(rows.length).toBe(11);

        // Check that all the data is displayed correctly
        expect(rows[1]).toHaveTextContent('Casey Tran');
        expect(rows[1]).toHaveTextContent("complete");
        expect(rows[1]).toHaveTextContent("2019-04-15T07:37:38");
        expect(rows[1]).toHaveTextContent("Facebook");
        expect(rows[1]).toHaveTextContent("Casey Tran");
        expect(rows[1]).toHaveTextContent("Entertainment");
        expect(rows[1]).toHaveTextContent(7189);
        expect(rows[1]).toHaveTextContent(653.54);
        expect(rows[1]).toHaveTextContent("Sales Team");

        // Get all checkboxes in the first row
        const checkboxes = within(rows[1]).getAllByRole('checkbox');
        // Assert that there are two checkboxes
        expect(checkboxes.length).toBe(2);
        // Assert that the receipt checkbox(the first) is readonly and not checked
        expect(checkboxes[0]).toHaveProperty('readOnly', true);
        expect(checkboxes[0]).not.toBeChecked();

        // Assert that the billable checkbox(the second) is not readonly and not checked
        expect(checkboxes[1]).toHaveProperty('readOnly', false);
        expect(checkboxes[1]).not.toBeChecked();
    });

    it('search team member functionality works correctly', async () => {

        // Find the input fields by their data-testid
        const inputs = screen.getAllByTestId('search-input');
        // The first one is the team member input
        const input = inputs[0];

        // Type 'Casey Tran' into the input field
        fireEvent.change(input, { target: { value: 'Casey Tran' } });

        // Find the search button by its data-testid and click it
        const buttons = screen.getAllByTestId('search-button');
        // The first one is the team member search button
        fireEvent.click(buttons[0]);

        // Wait for the table to update and check if the result is displayed
        // Get all rows in the table
        const rows = screen.getAllByRole('row');

        // Check that all the data is displayed correctly
        expect(rows[1]).toHaveTextContent('Casey Tran');

    });

    it('search amount functionality works correctly', async () => {

        // Find the input fields by their data-testid
        const inputs = screen.getAllByTestId('search-input');

        // The second one is the amount input
        const input = inputs[1];

        // Type 7189 into the input field
        fireEvent.change(input, { target: { value: 7189 } });

        // Find the search button by its data-testid and click it
        const buttons = screen.getAllByTestId('search-button');
        // The second one is the amount search button
        fireEvent.click(buttons[1]);

        // Wait for the table to update and check if the result is displayed
        // Get all rows in the table
        const rows = screen.getAllByRole('row');

        // Check that all the data is displayed correctly
        expect(rows[1]).toHaveTextContent(7189);
    });

    it('search gst functionality works correctly', async () => {

        // Find the input fields by their data-testid
        const inputs = screen.getAllByTestId('search-input');

        // The second one is the gst input
        const input = inputs[2];

        // Type 653.54 into the input field
        fireEvent.change(input, { target: { value: 653.54 } });

        // Find the search button by its data-testid and click it
        const buttons = screen.getAllByTestId('search-button');
        // The second one is the gst search button
        fireEvent.click(buttons[2]);

        // Wait for the table to update and check if the result is displayed
        // Get all rows in the table
        const rows = screen.getAllByRole('row');

        // Check that all the data is displayed correctly
        expect(rows[1]).toHaveTextContent(653.54);
    });

    it('filter of status functionality works correctly', async () => {

        // Simulate user interaction to select a status
        const selectElements = screen.getAllByRole('combobox');
        const statusSelect = selectElements[0];

        userEvent.selectOptions(statusSelect, ['complete']);

        await new Promise(resolve => setTimeout(resolve, 2000));
        // Check if the displayed transactions are correctly filtered
        await waitFor(async () => {
            const rows = await screen.findAllByRole('row');

            // For each row, get the first cell and check its text content
            rows.forEach((row, index) => {
                if (index === 0 || index === 1 || index > 11) {
                    return;
                }
                const cells = row.querySelectorAll('td');
                if (cells.length > 0) {
                    const firstCell = cells[0];
                    // Check if the first cell contains the text 'complete'
                    expect(firstCell.textContent).toBe('complete');
                }
            });
        });
    });

    it('filter of merchant functionality works correctly', async () => {

        // Simulate user interaction to select a merchant
        const selectElements = screen.getAllByRole('combobox');
        const merchantSelect = selectElements[1];

        userEvent.selectOptions(merchantSelect, ['Facebook']);

        await new Promise(resolve => setTimeout(resolve, 2000));
        // Check if the displayed transactions are correctly filtered
        await waitFor(async () => {
            const rows = await screen.findAllByRole('row');

            // For each row, get the first cell and check its text content
            rows.forEach((row, index) => {
                if (index === 0 || index === 1 || index > 11) {
                    return;
                }
                const cells = row.querySelectorAll('td');
                if (cells.length > 0) {
                    const firstCell = cells[2];
                    // Check if the first cell contains the text 'Facebook'
                    expect(firstCell.textContent).toBe('Facebook');
                }
            });
        });
    });

    it('filter of category functionality works correctly', async () => {

        // Simulate user interaction to select a category
        const selectElements = screen.getAllByRole('combobox');
        const categorySelect = selectElements[2];

        userEvent.selectOptions(categorySelect, ['Entertainment']);

        await new Promise(resolve => setTimeout(resolve, 2000));
        // Check if the displayed transactions are correctly filtered
        await waitFor(async () => {
            const rows = await screen.findAllByRole('row');

            // For each row, get the first cell and check its text content
            rows.forEach((row, index) => {
                if (index === 0 || index === 1 || index > 11) {
                    return;
                }
                const cells = row.querySelectorAll('td');
                if (cells.length > 0) {
                    const firstCell = cells[4];
                    // Check if the first cell contains the text 'Entertainment'
                    expect(firstCell.textContent).toBe('Entertainment');
                }
            });
        });
    });

    it('filter of budget functionality works correctly', async () => {

        // Simulate user interaction to select a budget
        const selectElements = screen.getAllByRole('combobox');
        const budgetSelect = selectElements[3];

        userEvent.selectOptions(budgetSelect, ['Sales Team']);

        await new Promise(resolve => setTimeout(resolve, 2000));
        // Check if the displayed transactions are correctly filtered
        await waitFor(async () => {
            const rows = await screen.findAllByRole('row');

            // For each row, get the first cell and check its text content
            rows.forEach((row, index) => {
                if (index === 0 || index === 1 || index > 11) {
                    return;
                }
                const cells = row.querySelectorAll('td');
                if (cells.length > 0) {
                    const firstCell = cells[7];
                    // Check if the first cell contains the text 'Sales Team'
                    expect(firstCell.textContent).toBe('Sales Team');
                }
            });
        });
    });

    it('filter of status and merchant functionality works correctly', async () => {

        // Simulate user interaction to select a status
        const selectElements = screen.getAllByRole('combobox');
        const statusSelect = selectElements[0];
        const merchantSelect = selectElements[1];

        // Simulate user interaction to select a status
        userEvent.selectOptions(statusSelect, ['complete']);

        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulate user interaction to select a merchant
        userEvent.selectOptions(merchantSelect, ['Facebook']);

        await new Promise(resolve => setTimeout(resolve, 2000));
        // Check if the displayed transactions are correctly filtered
        await waitFor(async () => {
            const rows = await screen.findAllByRole('row');

            // For each row, get the first cell and check its text content
            rows.forEach((row, index) => {
                if (index === 0 || index === 1 || index > 11) {
                    return;
                }
                const cells = row.querySelectorAll('td');
                if (cells.length > 0) {
                    const firstCell = cells[0];
                    // Check if the first cell contains the text 'complete'
                    expect(firstCell.textContent).toBe('complete');
                    const secondCell = cells[2];
                    // Check if the second cell contains the text 'Facebook'
                    expect(secondCell.textContent).toBe('Facebook');
                }
            });
        });
    });

    it('Pagination changes page and displays correct data when clicked', async () => {

        // Get the pagination component
        const pagination = screen.getByTestId('pagination-bar');

        // Find the page 2 button within the pagination component
        const page2Button = within(pagination).getByText('2');

        // Click on page 2
        fireEvent.click(page2Button);

        // Wait for the table to update and check if the specific item is displayed
        const item = await screen.findByText('Philip Norman');
        expect(item).toBeInTheDocument();
    });
});