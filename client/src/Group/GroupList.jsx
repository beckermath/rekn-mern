import React from 'react';
import {getPeople, deletePerson} from '../Api';
import 'antd/dist/antd.css';
import { List, Typography, Spin } from 'antd';
import {
    useQuery,
    useMutation,
    useQueryClient,
  } from 'react-query';
import AppContext from '../AppContext';
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
    const queryClient = useQueryClient();
    const {data, status} = useQuery('people', getPeople);

    //display error when deleting last person 
    const mutation = useMutation(personId => deletePerson(personId), {
        //supposed to be onSuccess, but issue with deleting
        onSettled: () => {
            queryClient.invalidateQueries('people');
        } 
    });

    const handleRemove = (event) => {
        let personId;
        data.data.forEach(element => {
            //doesnt handle non-unique names
            if(element.name === event.target.id){
                personId = element._id;
            }
        });

        mutation.mutate(personId);
    }

    if(status === 'success' && data.data.length === 1){
        ctx.setExpenseTab(false);
    }

    if(status === 'success' && data.data.length > 1){
        ctx.setExpenseTab(true);
    }

    return (
        <div style={styles}>
            <Title level = {4}>Current Group</Title>
            {status === 'loading' &&
                <Spin></Spin>
            }

            {status === 'success' &&
                <List
                bordered
                dataSource = {data.data.map(a => a.name)}
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