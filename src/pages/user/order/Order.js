import React from 'react';
import OrderDetail from "../../../components/order/OrderDetail";
import {Navigate, useLocation, useNavigate} from "react-router-dom";

const Order = () => {
    const location = useLocation()


    if ((!location.state || !location.state.order)) {
        return <Navigate to={`/user/history`} replace/>;
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-12">
                    <OrderDetail order={location.state.order}/>
                </div>
            </div>
        </div>
    );
};

export default Order;