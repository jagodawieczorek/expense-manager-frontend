import { Typography } from "@mui/material";
import {useEffect, useState } from "react";
import ExpensesList from "./ExpensesList";

type Expense = {
    id : string,
    name: string,
    amount : number,
    category: string
}

const MyExpenses: React.FC = () => {
    const [categories, setCategories] = useState<Map<string, number>>(new Map<string, number>());
    const receivedCategories = useEffect(() => {
        fetch('http://localhost:8080/api/expenses')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const categoryCountMap: Map<string, number> = data.reduce(
                (acc: Map<string, number>, expense: Expense) => acc.set(expense.category, (acc.get(expense.category) || 0) + 1),
                  new Map<string, number>());
            setCategories(categoryCountMap);
        });
    }, []);
    return <>
    <Typography variant="h2" component="h1" align="center">My Expenses</Typography>
    <ExpensesList categories={categories}></ExpensesList>
    </>;
}

export default MyExpenses;