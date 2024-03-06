import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

describe("components - App", () => {
  it("renders correctly", () => {
    render(<App />);
    const titleElement = screen.getByText(/Transactions/i);
    expect(titleElement).toBeInTheDocument();
  });
});

