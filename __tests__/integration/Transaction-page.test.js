import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TransactionsTable from '../../src/page/Transaction-page';
import transactionsData from '../../src/data/transactions.json';
import categoriesData from '../../src/data/categories.json';
import merchantsData from '../../src/data/merchants.json';

const mockTransactions = transactionsData.slice(0, 20);
// const mockCategories = [
//     { id: "categoryId1", name: "category1" },
//     { id: "categoryId2", name: "category2" },
// ];
// const mockMerchants = [
//     { id: "merchantId1", name: "merchant1" },
//     { id: "merchantId2", name: "merchant2" },
// ];

jest.mock('../../src/data/transactions.json', () => mockTransactions);
// jest.mock('../../src/data/categories.json', () => mockCategories);
// jest.mock('../../src/data/merchants.json', () => mockMerchants);


describe('TransactionsTable', () => {
    let container = null;

    beforeEach(() => {
        // setup a DOM element as a render target
        container = render(<TransactionsTable />);
    });

    it('renders without crashing', () => {
        expect(container).toBeTruthy();
    });

    it('displays transactions correctly', async () => {
        // Check if transactions are displayed
        await waitFor(() => expect(screen.getByText('Sales Team')).toBeInTheDocument());
    });

    it('search functionality works correctly', async () => {
        // Simulate a search operation
        fireEvent.change(screen.getByPlaceholderText('Team Member'), { target: { value: 'Angela Sawyer' } });
        await waitFor(() => expect(screen.getByText('Angela Sawyer')).toBeInTheDocument());
    });

    it('filter functionality works correctly', async () => {
        // Simulate a filter operation
        fireEvent.change(screen.getByText('status'));
        await waitFor(() => expect(screen.getByText('exported')).toBeInTheDocument());
    });

    it('pagination works correctly', async () => {
        // Simulate a page change operation
        fireEvent.click(screen.getByText('2'));
        await waitFor(() => expect(screen.getByText('Entertainment')).toBeInTheDocument());
    });
});