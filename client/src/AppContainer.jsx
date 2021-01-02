import React from 'react';
import AppContext from './AppContext';

const AppContainer = ({children}) => {
    const [people, setPeople] = React.useState([]);
    const [expenses, setExpenses] = React.useState([]);
    const [expensesDisplay, setExpensesDisplay] = React.useState([]);
    const [balances, setBalances] = React.useState([]);
    const [payments, setPayments] = React.useState([]);

    return(
        <AppContext.Provider 
        value ={{people, setPeople, expenses, setExpenses, expensesDisplay, setExpensesDisplay, 
            balances, setBalances, payments, setPayments}}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContainer;