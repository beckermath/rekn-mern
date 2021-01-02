import React from 'react'
import AppContext from '../AppContext'
import 'antd/dist/antd.css';
import { List, Typography, Card } from 'antd';
const { Title } = Typography;

const styles = {
    padding: '20px'
}

const linkStyles = {
    color: '#1890ff'
}

const ExpenseList = () => {
    const ctx = React.useContext(AppContext);

    const handleRemove = React.useCallback((event) => {
        let removalIndex;

        for(let i = 0; i < ctx.expensesDisplay.length; i++){
            if(ctx.expensesDisplay[i].desc === event.target.id){
                removalIndex = i;
                break;
            }
        }

        let temp = [...ctx.expenses];
        let temp2 = [...ctx.expensesDisplay];

        temp.splice(removalIndex, 1);
        temp2.splice(removalIndex, 1);

        ctx.setExpenses(temp);
        ctx.setExpensesDisplay(temp2);
    }, [ctx]);

    return(
        <div style={styles}>
            <Title level = {4}>Current Expenses</Title>
            <List
            grid={{ gutter: 8, column: 1 }}
            dataSource={ctx.expensesDisplay}
            renderItem={item => (
                <List.Item>
                    <Card size="small" title = {<Typography>{item.desc} (${item.amount})</Typography>} extra={ 
                    <a href="/#" style = {linkStyles} id = {item.desc} onClick={handleRemove}>remove</a>}>
                    {item.payedBy} payed for {item.forWho}</Card>
                </List.Item>
            )}
            />
        </div>
    )
}

export default ExpenseList;