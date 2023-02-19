// import React, {useEffect, useState} from 'react';
// import {useSelector} from "react-redux";
// import LoadingToRedirect from "./LoadingToRedirect";
// import {currentAdmin} from "../../redux/services/auth.service";
//
//
// const AdminRoute = ({children, ...rest}) => {
//     const {isLoggedIn, user} = useSelector((state) => state.auth);
//     const [ok, setOkay] = useState(false)
//     const [error, setError] = useState('')
//
//
//     useEffect(() => {
//         if (isLoggedIn && user && user.token) {
//             currentAdmin(user.token, user)
//                 .then(r => {
//                     setOkay(true)
//                 })
//                 .catch(err => {
//                     setError(err.response.data.error)
//                     setOkay(false)
//                 })
//
//         }
//
//     }, [isLoggedIn, user])
//
//     if (!ok) {
//         // return <Navigate to="/login/" replace/>;
//         return <LoadingToRedirect error={error}/>
//     }
//     return children;
// };
//
// export default AdminRoute;


import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import LoadingToRedirect from './LoadingToRedirect';
import {currentAdmin} from '../../redux/services/auth.service';
import {logout} from "../../redux/slices/auth";
import useIdle from "../../hooks/useIdleTimer";

const AdminRoute = ({children, ...rest}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoggedIn, user} = useSelector(state => state.auth);
    const [isSessionActive, setIsSessionActive] = useState(false);
    const {isIdle} = useIdle({
        timeout: 1000 * 60 * 1, // 10 minutes in milliseconds
        onIdle: handleOnIdle,
        debounce: 500,
    });

    useEffect(() => {
        if (isLoggedIn && user && user.token) {
            currentAdmin(user.token, user)
                .then(() => setIsSessionActive(true))
                .catch(() => setIsSessionActive(false));
        }
    }, [isLoggedIn, user]);

    function handleOnIdle() {
        setIsSessionActive(false);
    }

    useEffect(() => {
        if (isIdle) {
            dispatch(logout());
            navigate('/auth/login');
        }
    }, [dispatch, isIdle, navigate]);

    if (!isSessionActive) {
        return <LoadingToRedirect/>;
    }

    return children;
};

export default AdminRoute;
