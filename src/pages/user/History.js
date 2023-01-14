import React from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";

const History = () => {
    const {user: currentUser} = useSelector((state) => state.auth);
    if (!currentUser) {
        return <Navigate to="/auth/login"/>;
    }

    return (
        <div>
            <h5>History</h5>
        </div>
    );
};

export default History;