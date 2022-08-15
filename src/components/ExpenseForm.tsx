import { InputLabel, Input, Button, Grid, Alert} from '@mui/material';
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


    return (<>
            {errorMessage !== null && <Alert severity="error">{errorMessage}</Alert>}
            {successMessage !== null && <Alert severity="success">{successMessage}</Alert>}
            <Grid container alignItems="center" justifyContent="center">
                <form onSubmit={handleSaveForm}>
                    <Grid item key="name">
                        <InputLabel htmlFor="name">Expense name</InputLabel>
                        <Input id="name" inputRef={nameRef}/>
                    </Grid>
                    <Grid item key="amount">
                        <InputLabel htmlFor='amount'>Amount</InputLabel>
                        <Input id="amount" type="number" inputRef={amountRef}/>
                    </Grid>
                    <Grid item key="category">
                        <InputLabel htmlFor="category">Category</InputLabel>
                        <Input id="category" inputRef={categoryRef}/>
                    </Grid>
                    <Grid item key="saveButton">
                        <Button variant="contained" type="submit">Save</Button>
                    </Grid>
                </form>
            </Grid>
        </>
    );
}

export default ExpenseForm;