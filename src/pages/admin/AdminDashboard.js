import React, {useCallback} from 'react';
import useIdle from '../../hooks/useIdleTimer'
import {logout} from "../../redux/slices/auth";
import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

const AdminDashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOut = useCallback(() => {
        dispatch(logout());
        navigate('/auth/login')
    }, [dispatch, navigate]);

    const {isIdle} = useIdle({onIdle: logOut, idleTime: 1.25})
    return (
        <div>
            <h5>Admin dashboard</h5>
            {isIdle ? <h1>You were Logged out</h1> : <h1>You are Still active</h1>}
        </div>
    );
};

export default AdminDashboard;