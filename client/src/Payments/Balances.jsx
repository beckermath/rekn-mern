import React from 'react';
import 'antd/dist/antd.css';
import AppContext from '../AppContext';
import { getPeople } from '../Api';
import { List, Typography, Spin } from 'antd';
import { getBalances } from '../calculator';
import {
    useQuery,
    useMutation,
    useQueryClient,
  } from 'react-query';
const { Title } = Typography;

const styles = {
    padding: '20px'
}

const possitive = {
    backgroundColor: '#CCFFE5',
    border: '1px solid #e0e0e0'
}

const negative = {
    backgroundColor: '#FFCCCC',
    border: '1px solid #e0e0e0'
}

const Balances = () => {
    const queryClient = useQueryClient();
    const {data, status} = useQuery('people', getPeople);

    
    const ctx = React.useContext(AppContext);

    const [balances, setBalances] = React.useState([]);

    React.useLayoutEffect(() => {
        setBalances(getBalances(ctx.people, ctx.expenses))
    }, [ctx.people, ctx.expenses])

    console.log(getBalances(ctx.people, ctx.expenses))

    return (
        <div style={styles}>
            <Title level = {4}>Balances</Title>
            {status === 'loading' &&
                <Spin></Spin>
            }

            {status === 'success' &&
                <List
                    bordered
                    dataSource={data.data.map(a => a.balance)}
                    renderItem={(item, index) => (
                        <div>
                            {item.toFixed(2) >= 0 
                            ?
                            <List.Item style ={possitive}
                            actions={[<Typography>${item.toFixed(2)}</Typography>]}
                            >
                                <Typography.Text mark></Typography.Text> {data.data[index].name}
                            </List.Item>
                            :
                            <List.Item style ={negative}
                            actions={[<Typography>${item.toFixed(2)}</Typography>]}
                            >
                                <Typography.Text mark></Typography.Text> {data.data[index].name}
                            </List.Item>
                            }
                        </div>
                    )}
                />
            }
        </div>
    )
}

export default Balances;