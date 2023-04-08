import React from 'react';
import {useNavigate} from 'react-router-dom';

const withRoleRoute = (Component, allowedRole) => {
    return (props) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const navigate = useNavigate();
        if (user && user.role.code === allowedRole) {
            return <Component {...props} />;
        } else {
            navigate('/', {replace: true});
            return null;
        }
    };
};

export default withRoleRoute;
