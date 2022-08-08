import { render, screen } from '@testing-library/react';
import MyExpenses from "./MyExpenses";

test('renders my expenses title', () => {
    // arrange
    render(<MyExpenses/>);
    // act
    // assert
    const linkElement = screen.getByText(/My Expenses/i);
    expect(linkElement).toBeInTheDocument();
});