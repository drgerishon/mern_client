import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Result, Button} from 'antd';
import './Redirect.css';

const AccessDenied = ({message}) => {
    const [count, setCount] = useState(5);
    const {isLoggedIn, user} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (count <= 0) return;

        const timer = setTimeout(() => {
            setCount(count - 1);
        }, 1000);

        if (count === 1) {
            if (!isLoggedIn || !user || !user.token) {
                navigate('/auth/login');
            }
            if (isLoggedIn && user && user.token && user.role) {
                if (user.role.code === 1000) {
                    navigate('/admin/dashboard');
                } else if (user.role.code === 2000) {
                    navigate('/user/dashboard');
                } else if (user.role.code === 3000) {
                    navigate('/farmer/dashboard');
                } else if (user.role.code === 4000) {
                    navigate('/carrier/dashboard');
                } else if (user.role.code === 5000) {
                    navigate('/institute/dashboard');
                } else {
                    navigate('/market');
                }
            }
        }

        return () => clearTimeout(timer);
    }, [count, isLoggedIn, navigate, user]);

    return (
        <section className='redirect d-flex flex-column align-items-center justify-content-center'>
            <h5>Automatically Redirecting you in {count} seconds...</h5>
            <Result
                status='403'
                title='Access Denied'
                subTitle={
                    message
                        ? message
                        : 'You do not have the necessary permissions to view this page.'
                }
                extra={[
                    <Button
                        type='primary'
                        key='login'
                        onClick={() => navigate('/user/history')}
                    >
                        Go to history page
                    </Button>,
                ]}
            />
        </section>
    );
};

export default AccessDenied;
