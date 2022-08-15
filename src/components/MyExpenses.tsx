import { Typography, Alert } from "@mui/material";
import {useCallback, useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpensesList from "./ExpensesList";

type Expense = {
    id : string | null,
    name: string,
    amount : string,
    category: string
}

const failedToFetchErrorMessage = "An error occured while fetching categories! Please try again later.";

const MyExpenses: React.FC = () => {
    const [categories, setCategories] = useState<Map<string, number>>(new Map<string, number>());
    const [errorMessage, setErrorMessage] = useState<string|null>(null);
    const [successMessage, setSuccessMessage] = useState<string|null>(null);

    const addNewExpenseHandler = async (expense: Expense): Promise<void> => {
        try {
            console.log(expense);
            const response = await fetch('http://localhost:8080/api/expenses', {
                method: 'POST',
                body: JSON.stringify(expense),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error();
            } else {
                setSuccessMessage("The expense has been successfully saved!");
                setErrorMessage(null);
            }
        } catch (error) {
            setErrorMessage('An error occured while saving a new expense!');
        } 
    };

    const fetchCategoriesHandler = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8080/api/expenses');
            if (response.ok) {
                const data = await response.json();
                if (data !== null && data.length !== 0) {
                    const categoryCountMap: Map<string, number> = data.reduce(
                        (acc: Map<string, number>, expense: Expense) => acc.set(expense.category, (acc.get(expense.category) || 0) + 1),
                        new Map<string, number>());
                    setCategories(categoryCountMap);
                    setErrorMessage(null);
                }
            } else {
                throw new Error(failedToFetchErrorMessage);
            }
        } catch (error) {
            setErrorMessage(failedToFetchErrorMessage);
        }
    }, []);

    useEffect(() => {
        fetchCategoriesHandler();
    }, [fetchCategoriesHandler]);

    return <>
        <Typography sx={{margin: 3}} variant="h2" component="h1" align="center">My Expenses</Typography>
        {errorMessage === null && <ExpensesList categories={categories}></ExpensesList>}
        {errorMessage !== null && <Alert severity="error" >{errorMessage}</Alert>}
        {successMessage !== null && <Alert severity="success">{successMessage}</Alert>}
        <ExpenseForm onAddNewExpense={addNewExpenseHandler}/>
    </>;
}

export default MyExpenses;