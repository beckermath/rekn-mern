import React from 'react'
import 'antd/dist/antd.css';
import { getPeople } from '../Api';
import { List, Typography, Spin } from 'antd';
import { Button } from "shards-react";
import { calculatePayments } from '../calculator';
import {
    useQuery,
  } from 'react-query';
import AppContext from '../AppContext';

const { Title } = Typography;

const styles = {
    padding: '20px'
}

const PaymentList = () => {
    const {data, status} = useQuery('people', getPeople);
    const ctx = React.useContext(AppContext);

    const handleClick = () => {
        ctx.setPayments(calculatePayments(data.data));
    }

    return (
        <div style={styles}>
            {status === 'loading' && 
                <Spin></Spin>
            }

            {status === 'success' && ctx.payments.length === 0 &&
                <div>
                    <Button onClick={handleClick} style={{ width: '100%' }}>Calculate Payments</Button>
                </div>
            }

            {ctx.payments.length > 0 &&
                <div>
                    <Title level = {4}>It would take {ctx.payments.length} payments to even out all debts</Title>
                    <List
                    bordered
                    dataSource={ctx.payments}
                    renderItem={(payment, index) => (
                        <List.Item>
                            <Typography.Text mark></Typography.Text> {payment.payer} pays {payment.receiver} ${payment.amount}
                        </List.Item>
                    )}
                    />
                </div>
            }
        </div>
    )
}

export default PaymentList;