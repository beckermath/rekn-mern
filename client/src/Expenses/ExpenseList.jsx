import React from 'react'
import { getExpenses, deleteExpense } from '../Api'
import 'antd/dist/antd.css';
import { List, Typography, Card, Spin } from 'antd';
import {
    useQuery,
    useMutation,
    useQueryClient,
  } from 'react-query';
import AppContext from '../AppContext';
const { Title } = Typography;

const styles = {
    padding: '20px'
}

const linkStyles = {
    color: '#1890ff'
}

const ExpenseList = () => {
    const ctx = React.useContext(AppContext);
    const queryClient = useQueryClient();
    const {data, status} = useQuery('expenses', getExpenses);

    //display error when deleting last expense 
    const mutation = useMutation(expenseId => deleteExpense(expenseId), {
        //supposed to be onSuccess, but issue with deleting
        onSettled: () => {
            queryClient.invalidateQueries('expenses');
            queryClient.invalidateQueries('people');
            queryClient.invalidateQueries('payments');
            ctx.setPayments([]);

        } 
    });

    const handleRemove = (event) => {
        let expenseId;
        data.data.forEach(element => {
            //doesnt handle non-unique descriptions
            if(element.description === event.target.id){
                expenseId = element._id;
            }
        });

        mutation.mutate(expenseId);
    }

    if(status === 'error'){
        ctx.setPaymentTab(false);
    }

    if(status === 'success' && data.data.length > 0){
        ctx.setPaymentTab(true);
    }

    return(
        <div style={styles}>
            <Title level = {4}>Current Expenses</Title>
            {status === 'loading' &&
                <Spin></Spin>
            }

            {status === 'success' &&
                <List
                grid={{ gutter: 8, column: 1 }}
                dataSource={data.data}
                renderItem={item => (
                    <List.Item>
                        <Card size="small" title = {<Typography>{item.description} (${item.amount})</Typography>} extra={ 
                        <a href style = {linkStyles} id = {item.description} onClick={handleRemove}>remove</a>}>
                        {item.payedBy} payed for { /*doesnt quite work*/ item.forWho.length === data.data.length ? "everyone" : item.forWho.join(" and ")}</Card>
                    </List.Item>
                )}
                />
            }
        </div>
    )
}

export default ExpenseList;