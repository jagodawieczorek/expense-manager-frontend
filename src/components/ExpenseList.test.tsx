import { render, screen } from "@testing-library/react";
import ExpensesList from "./ExpensesList";

test('renders the names of the categories', () => {
    // arrange
    const categories: Map<string, number> = new Map<string, number>([
        ['Food', 3],
        ['House', 1],
        ['Clothes', 2]
    ]);
    render(<ExpensesList categories={categories}/>);
    // act
    // assert
    const foodCategory = screen.getByText(/Food/i);
    expect(foodCategory).toBeInTheDocument();
    const houseCategory = screen.getByText(/House/i);
    expect(houseCategory).toBeInTheDocument();
    const clothesCategory = screen.getByText(/Clothes/i);
    expect(clothesCategory).toBeInTheDocument();
 });