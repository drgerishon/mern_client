import React, {lazy, Suspense} from 'react';
import {Icon} from "@iconify/react";
import defaultImage from "../../images/default.jpg";
import {useSelector} from "react-redux";

const Card = lazy(() => import("antd").then(module => ({default: module.Card})));
const PayCard = ({succeeded, payable, cartTotal, discountAmount}) => {

    const {coupon, selectedPaymentMethod, totalAfterDiscount} = useSelector(state => ({...state}))

    return (
        <>
            {!succeeded && <div className='mt-3'>
                {coupon && totalAfterDiscount !== undefined ?
                    <p className='alert alert-success'>
                        {`Total after discount  ${selectedPaymentMethod === 'Mpesa' ?
                            `Ksh${totalAfterDiscount.value}` : `$${payable}`}`}
                    </p>
                    :
                    <p className='alert alert-danger'>No coupon applied</p>}
            < /div>}

            <div className=" mb-3">
                <Suspense fallback={<div>Loading...</div>}>
                    <Card
                        actions={[
                            <>
                                <Icon icon="ant-design:dollar-outlined" className='text-info' fontSize={20}/>
                                <br/>
                                {cartTotal &&
                                <p>Total before discount: <strong>${cartTotal}</strong></p>}
                            </>,
                            <>
                                <Icon icon="ant-design:check-outlined" className='text-success' fontSize={20}/>
                                <br/>
                                {payable && <p> Total payable: <strong>${payable}</strong></p>}

                            </>
                        ]}
                        cover={
                            <img
                                src={defaultImage}
                                alt='payment'
                                style={{height: '200px', objectFit: 'cover', marginBottom: '-50px'}}/>}
                    />
                </Suspense>
            </div>
        </>
    );
};

export default PayCard;