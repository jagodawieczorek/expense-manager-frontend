import { Typography, Grid, Badge, Alert } from "@mui/material";
import Paper from '@mui/material/Paper';

const ExpensesList: React.FC<{categories: Map<string, number>}> = (props) => {
    const categories = props.categories.size > 0 ? Array.from(props.categories, ([name, count]) => {
        return {name: name, count: count};
    }) : null;

    return (<Grid container spacing={4} justifyContent="center" alignItems="center">
        {categories !== null && categories.map((category) => 
        <Grid item xs={2} key={category.name}>
            <Paper elevation={3}>
                <Typography variant="h5" component="h2" align="center">
                    {category.name}
                </Typography>
                <Typography variant="h5" component="h3" align="center">
                    <Badge badgeContent={category.count} color="primary"/>
                </Typography>
            </Paper>
        </Grid>)}
        {categories === null && <Grid item xs={12} key="noCategoriesFound">
            <Alert severity="info">No categories found.</Alert>
        </Grid>}
    </Grid>);
};

export default ExpensesList;