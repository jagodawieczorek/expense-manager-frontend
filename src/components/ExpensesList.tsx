const ExpensesList: React.FC<{categories: Map<string, number>}> = (props) => {
    const categories = Array.from(props.categories, ([name, count]) => {
        return {['name']: name, ['count']: count};
    });

    return (<ul>
        {categories.map((category) => <li>Name: {category.name}, count: {category.count}</li>)}
    </ul>);
};

export default ExpensesList;