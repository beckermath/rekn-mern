import React from 'react'
import AddExpense from './AddExpense'
import ExpenseList from './ExpenseList'
import { Typography } from 'antd';
const { Title } = Typography;

const styles = {
    padding: '20px',
    margin: 'auto',
    maxWidth: 600
}

const Expenses = () => {
    return(
        <div style = {styles}>
            <br/>
            <Title style= {{textAlign: 'center'}}level = {2}>Add Expenses</Title>
            <AddExpense/>
            <ExpenseList/>
            
        </div>
       
    )
}

export default Expenses;