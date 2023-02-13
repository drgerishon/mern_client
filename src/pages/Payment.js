import React, {useEffect, useState} from 'react';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {Link, useLocation} from "react-router-dom";
import '../stripe.css'
import StripeCheckout from "../components/payment/StripeCheckout";
import {Navigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import Paypal from "../components/payment/Paypal";
import Mpesa from "../components/payment/Mpesa";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import {createPaymentIntent} from "../redux/services/payment.service";
import {setTotalAfterDiscount} from "../redux/slices/totalAfterDiscount";
import {clearMessage} from "../redux/slices/message";

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY)
const Payment = () => {
    const [stripeClientSecret, setStripeClientSecret] = useState('')
    const [paypalClientSecret, setPaypalClientSecret] = useState('')
    const [payable, setPayable] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    const [convertedPayable, setConvertedPayable] = useState(0)
    const [convertedTotalCart, setConvertedTotalCart] = useState(0)
    const {auth, coupon, totalAfterDiscount, paymentMethods} = useSelector(state => ({...state}))
    const [convertedTotalAfterDiscount, setConvertedTotalAfterDiscount] = useState(0)

    const location = useLocation()
    const selectedPaymentMethod = useSelector((state) => state.paymentMethods.selectedPaymentMethod);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch])


    useEffect(() => {
        createPaymentIntent(auth.user.token, {
            couponApplied: coupon,
            selectedPaymentMethod: paymentMethods.selectedPaymentMethod
        }).then(res => {
            setStripeClientSecret(res.data.stripeClientSecret)
            setPaypalClientSecret(res.data.paypalClientSecret)
            setCartTotal(res.data.cartTotal)
            setPayable(res.data.payable)
            setConvertedPayable(res.data.convertedPayable)
            setConvertedTotalCart(res.data.convertedTotalCart)
            setConvertedTotalAfterDiscount(res.data.convertedTotalAfterDiscount)
            dispatch(setTotalAfterDiscount(res.data.totalAfterDiscount))

        }).catch(e => {
            console.log(e)
        })
    }, [auth.user.token, coupon, dispatch, paymentMethods.selectedPaymentMethod])
    const initialOptions = {
        "client-id": paypalClientSecret,
        currency: "USD",
        intent: "capture",
    };


    if (!(location.state && location.state.address)) {
        return <Navigate to="/checkout"/>;
    }

    return (
        <div className='container  min-vh-100'>
            <div className="row">
                <div className="col-md-8">
                    <div className="card mb-3">
                        <div className='card-header'>
                            <h5 className='card-title'>Complete your Purchase</h5>
                        </div>
                        <div className="card-body">
                            {
                                selectedPaymentMethod === 'Card' && stripeClientSecret && <Elements stripe={promise}>
                                    <StripeCheckout
                                        address={location.state.address}
                                        clientSecret={stripeClientSecret}
                                        payable={payable}
                                        convertedTotalAfterDiscount={convertedTotalAfterDiscount}
                                        convertedPayable={convertedPayable}
                                        convertedTotalCart={convertedTotalCart}
                                        cartTotal={cartTotal}/>
                                </Elements>
                            }

                            {
                                selectedPaymentMethod === 'Paypal' && paypalClientSecret &&
                                <PayPalScriptProvider options={initialOptions}>
                                    <Paypal
                                        address={location.state.address}
                                        convertedTotalCart={convertedTotalCart}
                                        payable={payable}
                                        convertedPayable={convertedPayable}
                                        convertedTotalAfterDiscount={convertedTotalAfterDiscount}/>

                                </PayPalScriptProvider>
                            }
                            {
                                selectedPaymentMethod === 'Mpesa' &&

                                <Mpesa address={location.state.address}/>

                            }
                        </div>
                    </div>
                    <div className="col-md-4">
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h4 className='card-title'>Payment information</h4>
                        </div>
                        <div className="card-body">
                            <p className='card-title'>Delivering to</p>
                            <span className='card-text'> {location.state.address.name}</span>
                            <h3 className='card-title'>Payment method</h3>
                            <span className='card-text'> {selectedPaymentMethod}</span>
                            {coupon && totalAfterDiscount !== undefined ?
                                <p className='card-text'>{`Total amount you will be charged ${selectedPaymentMethod === 'Mpesa' ?
                                    `Ksh${totalAfterDiscount.value} ` : `$${convertedTotalAfterDiscount / 100}`}`}</p> :
                                <p className='card-text text-secondary'>No Discount applied</p>}
                        </div>
                        <div className="card-footer">
                            <div className='d-flex justify-content-between align-items-center'>
                                <p>Thank you for shopping with us</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;