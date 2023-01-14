import React from 'react';
import {useSelector} from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({children, ...rest}) => {
    const {isLoggedIn, user} = useSelector((state) => state.auth);
    if (!isLoggedIn && user === null) {
        // return <Navigate to="/login/" replace/>;
        return <LoadingToRedirect/>
    }
    return children;
};

export default UserRoute;