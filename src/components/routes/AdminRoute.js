import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import {currentAdmin} from "../../redux/services/auth.service";


const AdminRoute = ({children, ...rest}) => {
    const {isLoggedIn, user} = useSelector((state) => state.auth);
    const [ok, setOkay] = useState(false)
    const [error, setError] = useState('')


    useEffect(() => {
        if (isLoggedIn && user && user.token) {
            currentAdmin(user.token, user)
                .then(r => {
                    setOkay(true)
                })
                .catch(err => {
                    setError(err.response.data.error)
                    setOkay(false)
                })

        }

    }, [isLoggedIn, user])

    if (!ok) {
        // return <Navigate to="/login/" replace/>;
        return <LoadingToRedirect error={error}/>
    }
    return children;
};

export default AdminRoute;