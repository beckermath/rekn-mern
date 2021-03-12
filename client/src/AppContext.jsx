import React from 'react';

const AppContext = React.createContext({
    expenseTab: false,
    payments: [],
});

export default AppContext;