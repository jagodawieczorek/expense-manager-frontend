import { Typography, Alert } from "@mui/material";
import {useCallback, useEffect, useState } from "react";
import ExpensesList from "./ExpensesList";

type Expense = {
    id : string,
    name: string,
    amount : number,
    category: string
}

const MyExpenses: React.FC = () => {
    const [categories, setCategories] = useState<Map<string, number>>(new Map<string, number>());
    const [errorMessage, setErrorMessage] = useState<string|null>(null);

    const fetchCategoriesHandler = useCallback(async () => {
        try {
            let response = await fetch('http://localhost:8080/api/expenses');
            if (response.ok) {
                const data = await response.json();
                if (data === null) {
                    throw new Error("You don't have any expenses. Add one!");
                }
                const categoryCountMap: Map<string, number> = data.reduce(
                    (acc: Map<string, number>, expense: Expense) => acc.set(expense.category, (acc.get(expense.category) || 0) + 1),
                      new Map<string, number>());
                setCategories(categoryCountMap);
                setErrorMessage(null);
            } else {
                throw new Error("An error occured while fetching categories!");
            }
        } catch (error) {
            setErrorMessage("An error occured while fetching categories!");
        }

    }, []);

    useEffect(() => {
        fetchCategoriesHandler();
    }, [fetchCategoriesHandler]);

    return <>
        <Typography variant="h2" component="h1" align="center">My Expenses</Typography>
        {errorMessage === null && <ExpensesList categories={categories}></ExpensesList>}
        {errorMessage !== null && <Alert severity="error" >{errorMessage}</Alert>}
    </>;
}

export default MyExpenses;