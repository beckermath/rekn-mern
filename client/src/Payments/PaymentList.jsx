import React from 'react'
import 'antd/dist/antd.css';
import AppContext from '../AppContext'
import { List, Typography } from 'antd';
import { getBalances } from '../calculator';
import {calculateDebts } from '../calculator'

const { Title } = Typography;

const styles = {
    padding: '20px'
}

const PaymentList2 = () => {
    const ctx = React.useContext(AppContext);
    const [payments, setPayments] = React.useState([]);

    React.useLayoutEffect(() => {
        setPayments(calculateDebts(ctx.people, ctx.expenses))
    }, [ctx.people, ctx.expenses])

    console.log(getBalances(ctx.people, ctx.expenses))

    return (
        <div style={styles}>
            <Title level = {4}>It would take {payments.length} payments to even out all debts</Title>
            <List
            bordered
            dataSource={payments}
            renderItem={(payment, index) => (
                <List.Item>
                    <Typography.Text mark></Typography.Text> {payment.payer} pays {payment.reciever} ${payment.amount}
                    
                </List.Item>
            )}
            />
        </div>
    )
}

export default PaymentList2;