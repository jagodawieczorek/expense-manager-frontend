import { Typography, Alert } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpensesList from "./ExpensesList";
import axios from "axios";

type Expense = {
  id: string | null;
  name: string;
  amount: string;
  category: string;
};

const failedToFetchErrorMessage =
  "An error occured while fetching categories! Please try again later.";

const MyExpenses: React.FC = () => {
  const [categories, setCategories] = useState<Map<string, number>>(
    new Map<string, number>()
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const addNewExpenseHandler = async (expense: Expense): Promise<void> => {
    try {
      console.log(expense);
      const response = await axios.post("http://localhost:8080/api/expenses", {
        name: expense.name,
        amount: expense.amount,
        category: expense.category,
      });
      if (response.status !== 200) {
        throw new Error();
      } else {
        setSuccessMessage("The expense has been successfully saved!");
        setErrorMessage(null);
        fetchCategoriesHandler();
      }
    } catch (error) {
      setErrorMessage("An error occured while saving a new expense!");
    }
  };

  const fetchCategoriesHandler = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/expenses");
      if (response.status === 200) {
        const data = await response.data;
        if (data !== null && data.length !== 0) {
          const categoryCountMap: Map<string, number> = data.reduce(
            (acc: Map<string, number>, expense: Expense) =>
              acc.set(expense.category, (acc.get(expense.category) || 0) + 1),
            new Map<string, number>()
          );
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
    console.log("reload categories");
    fetchCategoriesHandler();
  }, [fetchCategoriesHandler]);

  return (
    <>
      <Typography sx={{ margin: 3 }} variant="h2" component="h1" align="center">
        My Expenses
      </Typography>
      {errorMessage !== null && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage !== null && (
        <Alert severity="success">{successMessage}</Alert>
      )}
      {errorMessage === null && (
        <ExpensesList categories={categories}></ExpensesList>
      )}
      <ExpenseForm onAddNewExpense={addNewExpenseHandler} />
    </>
  );
};

export default MyExpenses;
