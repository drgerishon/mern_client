import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AccessDenied from "./AccessDenied";

const RoleBasedRoute = ({ allowedRoles, children }) => {
    const [isAllowed, setIsAllowed] = useState(false);
    const { isLoggedIn, user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isLoggedIn && user && user.role && user.role.name) {
            setIsAllowed(allowedRoles.includes(user.role.name));
        } else {
            setIsAllowed(false);
        }
    }, [allowedRoles, isLoggedIn, user]);

    if (!isAllowed) {
        return <AccessDenied message="You do not have the necessary permissions to view this page." />;
    }

    return children;

};

export default RoleBasedRoute;
