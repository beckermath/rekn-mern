import React from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import AppContext from '../AppContext';
import { List, Typography, Spin } from 'antd';
const { Title } = Typography;

const styles = {
    padding: '20px',
    margin: 'auto',
    maxWidth: 600
}

const linkStyles = {
    color: '#1890ff'
}

const GroupList = () => {
    const ctx = React.useContext(AppContext);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        axios.get('http://localhost:3000/api/persons')
            .then(res => {
                let people = res.data.data;
                ctx.setPeople(people);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [ctx]);

    const handleRemove = React.useCallback((event) => {
        if(ctx.expenses.length === 0){
            const removalIndex = ctx.people.indexOf(event.target.id)
        
            if(removalIndex > -1){
                let temp = [...ctx.people];
                temp.splice(removalIndex, 1);

                ctx.setPeople(temp);
            }
        }
        else{
            window.alert("Please clear expenses before removing group members");
        }
    }, [ctx])

    return (
        <div style={styles}>
            <Title level = {4}>Current Group</Title>
            {loading &&
                <Spin></Spin>
            }

            {ctx.people.length > 0 &&
                <List
                bordered
                dataSource = {ctx.people.map(a => a.name)}
                renderItem={item => (
                    <List.Item
                    actions={[<a href="/#"style = {linkStyles} id = {item} onClick={handleRemove}>remove</a>]}>
                        <Typography.Text mark></Typography.Text> {item}
                    </List.Item>
                )}
                />
            }
        </div>
    )
}

export default GroupList;