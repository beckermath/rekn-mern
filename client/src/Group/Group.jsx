import React from 'react';
import AddPerson from './AddPerson';
import GroupList from './GroupList';
import { Typography } from 'antd';
const { Title } = Typography;

const styles = {
    padding: '20px',
    margin: 'auto',
    maxWidth: 600
}

const Group = () => {
    return (
        <div style = {styles}>
            <br/>
            <Title style= {{textAlign: 'center'}} level = {2}>Create Group</Title>
            <AddPerson/>
            <GroupList/>
        </div>
    )
}

export default Group;