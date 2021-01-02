import React from 'react'
import AddExpense from './AddExpense'
import ExpenseList from './ExpenseList'
import AppContext from '../AppContext'
import { Typography } from 'antd';
const { Title } = Typography;

const styles = {
    padding: '20px',
    margin: 'auto',
    maxWidth: 600
}

const Expenses = () => {
    const ctx = React.useContext(AppContext);

    return(
        <div style = {styles}>
            <br/>
            <Title style= {{textAlign: 'center'}}level = {2}>Add Expenses</Title>
            <AddExpense/>
            {ctx.expenses.length > 0 && 
                <ExpenseList/>
            }
        </div>
       
    )
}

export default Expenses;