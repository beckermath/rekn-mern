import React from 'react';
import Balances from './Balances';
import PaymentList from './PaymentList';
import { Typography } from 'antd';
const { Title } = Typography;

const styles = {
    padding: '20px',
    margin: 'auto',
    maxWidth: 600
}

const Payments = () => {
    return (
        <div style = {styles}>
            <br/>
            <Title style= {{textAlign: 'center'}}level = {2}>Payments</Title>
            {/* <PaymentList/><br/> */}
            <Balances/>
        </div>
    )
}

export default Payments;