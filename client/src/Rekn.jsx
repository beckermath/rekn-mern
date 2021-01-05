import React from 'react';

import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import Group from './Group/Group'
import Expense from './Expenses/Expenses'
import Payment from './Payments/Payments'
import AppContext from './AppContext';
const { TabPane } = Tabs;

const Rekn = () => {
    const ctx = React.useContext(AppContext);

    return (
        <Tabs 
        defaultActiveKey="1" 
        centered
        animated
        size='large'
        >
            <TabPane tab="Group" key="1">
                <Group/>
            </TabPane>
            <TabPane tab="Expenses" key="2">
                <Expense/>
            </TabPane>
            <TabPane disabled = {ctx.expenses.length === 0} tab="Payments" key="3">
                <Payment/>
            </TabPane>
        </Tabs>
    )
}

export default Rekn;