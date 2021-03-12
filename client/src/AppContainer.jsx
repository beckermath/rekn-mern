import React from 'react';
import AppContext from './AppContext';

const AppContainer = ({children}) => {

    const [expenseTab, setExpenseTab] = React.useState(false);
    const [paymentTab, setPaymentTab] = React.useState(false);
    const [payments, setPayments] = React.useState([]);
    
    return(
        <AppContext.Provider 
        value ={{expenseTab, setExpenseTab, paymentTab, setPaymentTab, payments, setPayments}}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppContainer;