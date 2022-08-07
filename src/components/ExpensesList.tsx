import { Typography, Grid, Badge } from "@mui/material";
import Paper from '@mui/material/Paper';

const ExpensesList: React.FC<{categories: Map<string, number>}> = (props) => {
    const categories = Array.from(props.categories, ([name, count]) => {
        return {['name']: name, ['count']: count};
    });

    return (<Grid container spacing={2}>
        {categories.map((category) => 
        <Grid item xs={2}>
            <Paper sx={{height: 200, width: 200}}>
                <Typography variant="h5" component="h2" align="center">
                    {category.name}
                </Typography>
                <Badge badgeContent={category.count} color="primary" sx={{width: 50}}/>
            </Paper>
        </Grid>)}
    </Grid>);
};

export default ExpensesList;