import { InputLabel, Input, Button, Grid} from '@mui/material';
import { useRef } from "react";

type Expense = {
    id : string | null,
    name: string,
    amount : string,
    category: string
}

const ExpenseForm: React.FC<{onAddNewExpense : (expense: Expense) => Promise<void>}> = (props) => {
    const nameRef = useRef<HTMLInputElement>();
    const amountRef = useRef<HTMLInputElement>();
    const categoryRef = useRef<HTMLInputElement>();

    const handleSaveForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const expense = {
            id: null,
            name: nameRef.current?.value ?? "",
            amount: amountRef.current?.value ?? "",
            category: categoryRef.current?.value ?? ""
        };
        props.onAddNewExpense(expense);
    };

    return (
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
    );
}

export default ExpenseForm;