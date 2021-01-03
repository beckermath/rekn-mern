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
    const [people, setPeople] = React.useState([]);

    React.useEffect(() => {
        axios.get('http://localhost:3000/api/persons')
            .then(res => {
                console.log(res);
                let people = res.data.data;
                setPeople(people);
            })
            .catch(err => {
                setPeople([]);
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [ctx.numMembers]);

    const handleRemove = async (event) => {
        //needs to check on status of expenses before removing group members

        console.log(event.target.id);
        console.log(people);

        let personId;
        people.forEach(element => {
            //doesnt handle unique names
            if(element.name === event.target.id){
                personId = element._id;
            }
        });

        console.log(personId);

        await axios.delete(`http://localhost:3000/api/person/${personId}`)
            .then(res => {
                console.log(res);
                ctx.setNumMembers(ctx.numMembers - 1);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div style={styles}>
            <Title level = {4}>Current Group</Title>
            {loading &&
                <Spin></Spin>
            }

            {people.length > 0 &&
                <List
                bordered
                dataSource = {people.map(a => a.name)}
                renderItem={item => (
                    <List.Item
                    actions={[<a href style = {linkStyles} id = {item} onClick={handleRemove}>remove</a>]}>
                        <Typography.Text mark></Typography.Text> {item}
                    </List.Item>
                )}
                />
            }
        </div>
    )
}

export default GroupList;