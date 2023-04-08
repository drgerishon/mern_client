import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import ShowPaymentInfo from '../../../components/cards/ShowPaymentInfo';
import {Navigate} from 'react-router-dom';
import {getUserOrders} from '../../../services/user.service';
import {List} from 'antd';

const History = () => {
    const {user: currentUser} = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);
    const loadUserOrders = useCallback(() => {
        getUserOrders(currentUser.token)
            .then((res) => {
                setOrders(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [currentUser.token]);

    useEffect(() => {
        loadUserOrders();
    }, [loadUserOrders]);

    if (!currentUser) {
        return <Navigate to='/auth/login'/>;
    }
    return (
        <List
            itemLayout='vertical'
            dataSource={orders.reverse()}
            renderItem={(order) => (
                <List.Item>
                    <ShowPaymentInfo order={order}/>
                </List.Item>
            )}
        />
    );
};

export default History;
