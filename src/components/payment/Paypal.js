import React, {lazy, Suspense, useEffect, useState} from 'react';
import {createPaymentIntent} from "../../redux/services/payment.service";
import {setTotalAfterDiscount} from "../../redux/slices/totalAfterDiscount";
import {useDispatch, useSelector} from "react-redux";
import {Icon} from "@iconify/react";
import defaultImage from "../../images/default.jpg";
import {CardElement} from "@stripe/react-stripe-js";
import {Link} from "react-router-dom";
import {PayPalButtons, usePayPalScriptReducer,} from "@paypal/react-paypal-js";
import axios from "axios";
import {log} from "@craco/craco/dist/lib/logger";
import {createOrder} from "../../redux/services/user.service";

const Card = lazy(() => import("antd").then(module => ({default: module.Card})));
const Paypal = ({address}) => {
    const dispatch = useDispatch()
    const {auth, coupon, totalAfterDiscount, paymentMethods} = useSelector(state => ({...state}))
    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')
    const [payable, setPayable] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    const [paid, setPaid] = useState(false);
    const [{isPending}] = usePayPalScriptReducer();




    useEffect(() => {
        createPaymentIntent(auth.user.token, {
            couponApplied: coupon,
            selectedPaymentMethod: paymentMethods.selectedPaymentMethod
        }).then(res => {
            setClientSecret(res.data.clientSecret)
            setCartTotal(res.data.cartTotal)
            setPayable(res.data.payable)
            dispatch(setTotalAfterDiscount(res.data.totalAfterDiscount))

        }).catch(e => {
            console.log(e)
        })
    }, [auth.user.token, coupon, dispatch, paymentMethods.selectedPaymentMethod])

    const data = {
        shippingAddress: address,
        couponApplied: coupon,
        selectedPaymentMethod: paymentMethods.selectedPaymentMethod
    }

    function handleSubmit() {
        return createOrder(auth.user.token, data)
            .then(res => {
                console.log(res.data.id)
                return res.data.id;
            }).catch(e => {
                console.log(e)
            })
    }


    return (


        <>

            <div className='mt-3'>
                {coupon && totalAfterDiscount !== undefined ?
                    <p className='alert alert-success'>{`Total after discount Ksh ${totalAfterDiscount.value}`}</p> :
                    <p className='alert alert-danger'>No coupon applied</p>}
            < /div>
            <div className=" mb-3">
                <Suspense fallback={<div>Loading...</div>}>
                    <Card
                        actions={[
                            <>
                                <Icon icon="ant-design:dollar-outlined" className='text-info' fontSize={20}/>
                                <br/>
                                Total: KES {cartTotal}
                            </>,
                            <>
                                <Icon icon="ant-design:check-outlined" className='text-success' fontSize={20}/>
                                <br/>
                                Total payable: KES {(payable).toFixed(2)}
                            </>
                        ]}
                        cover={<img
                            src={defaultImage}
                            alt='payment'
                            style={{height: '200px', objectFit: 'cover', marginBottom: '-50px'}}/>}/>
                </Suspense>
            </div>


            <>
                {isPending ? <p>Loading</p> : null}
                <PayPalButtons
                    style={{layout: "horizontal"}}
                    createOrder={handleSubmit}
                    onApprove={(data, actions) => {
                        return actions.order.capture()
                    }}
                />
            </>

        </>

    )

}
export default Paypal;