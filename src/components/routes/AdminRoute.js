import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {currentAdmin} from '../../services/auth.service';

import AccessDenied from "./AccessDenied";


const AdminRoute = ({children}) => {
    const {isLoggedIn, user} = useSelector(state => state.auth);
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [error, setError] = useState('')

    useEffect(() => {
        if (isLoggedIn && user && user.token && user.role && user.role.code === 1000) {
            currentAdmin(user.token, user)
                .then((r) => {
                    if (r.data.ok) {
                        setIsSessionActive(true)
                    } else {
                        setIsSessionActive(false)
                    }
                })
                .catch((e) => {
                    setError(e.data.response.error.message)
                    setIsSessionActive(false)
                });
        }
    }, [isLoggedIn, user]);


    if (!isSessionActive) {
        return <AccessDenied message={error}/>;
    }

    return children;
};

export default AdminRoute;