import React, {lazy, Suspense, useEffect, useRef, useState} from 'react';
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
import {createOrderPaypalOrderForUser} from "../../redux/services/user.service";
import PayCard from "./Card";
import {io} from 'socket.io-client';
import {setMessage} from "../../redux/slices/message";

const API_URL = process.env.REACT_APP_API_DEVELOPMENT;
const Card = lazy(() => import("antd").then(module => ({default: module.Card})));
const Paypal = ({address}) => {
    const dispatch = useDispatch()
    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const socket = io(process.env.REACT_APP_API_DEVELOPMENT_SOCKET);
    const [{isPending}] = usePayPalScriptReducer();
    const selectedPaymentMethod = useSelector((state) => state.paymentMethods.selectedPaymentMethod);
    const {auth, coupon, totalAfterDiscount, paymentMethods} = useSelector(state => ({...state}))

    const [discountAmount, setDiscountAmount] = useState(0)
    const [payable, setPayable] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    const paypalInfoListener = useRef(null);
    const headers = {
        Authorization: `Bearer ${auth.user.token}`
    };

    useEffect(() => {
        const postData = async () => {
            const initData = {couponApplied: coupon, selectedPaymentMethod, initial: true};
            try {
                const response = await axios.post(`${API_URL}/user/paypal-order`, initData, {
                    headers: {
                        'Authorization': `Bearer ${auth.user.token}`,
                    }
                });
                const {data} = response;
                setPayable(data.payable);
                setCartTotal(data.cartTotal);
                setDiscountAmount(data.discountAmount);
            } catch (error) {
                console.error(error);
            }
        };
        postData()
    }, [auth.user.token, coupon, selectedPaymentMethod]);

    function handleSubmit() {
        const data = {
            shippingAddress: address,
            couponApplied: coupon,
            selectedPaymentMethod: paymentMethods.selectedPaymentMethod
        }
        return createOrderPaypalOrderForUser(auth.user.token, data)
            .then(res => {
                return res.data.id;
            }).catch(e => {
                console.log(e.response.data.error)
            })
    }


    return (

        <>
            <PayCard
                succeeded={succeeded}
                payable={payable}
                discountAmount={discountAmount}
                cartTotal={cartTotal}
                />

            <>
                {isPending ? <p>Loading</p> : null}
                <PayPalButtons
                    createOrder={handleSubmit}
                    onApprove={(data, actions) => {
                        console.log('APPROVED',data)
                        return actions.order.capture()
                    }}
                />
            </>

        </>

    )

}
export default Paypal;