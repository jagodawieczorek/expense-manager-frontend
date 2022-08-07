import { FormControl, InputLabel, Input, Button } from '@mui/material';
import { useState, useRef } from "react";

type Expense = {
    name: string,
    amount : string,
    category: string
}

const ExpenseForm: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string|null>(null);
    const [successMessage, setSuccessMessage] = useState<string|null>(null);
    const nameRef = useRef<HTMLInputElement>();
    const amountRef = useRef<HTMLInputElement>();
    const categoryRef = useRef<HTMLInputElement>();

    const handleSaveForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const expense = {
            name: nameRef.current?.value ?? "",
            amount: amountRef.current?.value ?? "",
            category: categoryRef.current?.value ?? ""
        };
        addNewExpenseHandler(expense);
    };
    

    const addNewExpenseHandler = async (expense : Expense) => {
        try {
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
            setErrorMessage('An error occured while saving a new expense! Please try once again later.');
        } 
    };

    return (
        <form onSubmit={handleSaveForm}>
        <FormControl>
            <InputLabel htmlFor="name">Expense name</InputLabel>
            <Input id="name"/>
        </FormControl>
        <FormControl>
            <InputLabel htmlFor='amount'>Amount</InputLabel>
            <Input id="amount" type="number"/>
        </FormControl>
        <FormControl>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Input id="category"/>
        </FormControl>
        <Button type="submit"/>
         </form>
    );
}

export default ExpenseForm;