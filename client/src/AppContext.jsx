import React from 'react';

const AppContext = React.createContext({
    people: [],
    expenses: [],
    expensesDisplay: [],
    balances: [],
    payments: [],
});

export default AppContext;