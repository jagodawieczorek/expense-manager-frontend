import { FormControl, InputLabel, Input } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";

const ExpenseForm: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSaveForm = () => {
        setIsLoading(true);
    }
    return (
        <form>
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
        <LoadingButton
            color="primary"
            onClick={handleSaveForm}
            loading={isLoading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            >
                Save expense
         </LoadingButton>
         </form>
    );
}

export default ExpenseForm;