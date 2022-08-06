import { render, screen } from '@testing-library/react';
import MyExpenses from "./MyExpenses";

test('renders my expenses title', () => {
    render(<MyExpenses/>);
    const linkElement = screen.getByText(/My Expenses/i);
    expect(linkElement).toBeInTheDocument();
});