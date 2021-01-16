import React from 'react'
import 'antd/dist/antd.css';
import AppContext from '../AppContext'
import { getPayments } from '../Api';
import { List, Typography, Spin } from 'antd';
import { getBalances } from '../calculator';
import {calculateDebts } from '../calculator';
import {
    useQuery,
    useMutation,
    useQueryClient,
  } from 'react-query';

const { Title } = Typography;

const styles = {
    padding: '20px'
}

const PaymentList2 = () => {
    const queryClient = useQueryClient();
    const {data, status} = useQuery('payments', getPayments);

    return (
        <div style={styles}>
            {status === 'loading' && 
                <Spin></Spin>
            }

            {status === 'success' && 
                <div>
                    <Title level = {4}>It would take {data.data.length} payments to even out all debts</Title>
                    <List
                    bordered
                    dataSource={data.data}
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

export default PaymentList2;