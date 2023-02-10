import React, {useEffect, lazy, Suspense, useState} from 'react';
import {useStripe, CardElement, useElements} from "@stripe/react-stripe-js";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import defaultImage from '../../images/default.jpg'

import {Icon} from '@iconify/react';
import {createPaymentIntent} from "../../redux/services/payment.service";
import {createOrder, emptyUserCart} from "../../redux/services/user.service";
import {addToCart} from "../../redux/slices/cart";
import {couponApplied} from "../../redux/slices/coupon";
import {setTotalAfterDiscount} from "../../redux/slices/totalAfterDiscount";

const Card = lazy(() => import("antd").then(module => ({default: module.Card})));

const StripeCheckout = ({address}) => {
    const dispatch = useDispatch()
    const {auth, coupon, totalAfterDiscount, paymentMethods} = useSelector(state => ({...state}))
    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')
    const [payable, setPayable] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    // const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
    const [shippingCost, setShippingCost] = useState(200)
    const stripe = useStripe()
    const elements = useElements()

    const cartStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d",
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: e.target.name.value
                }
            }
        })

        const data = {
            paymentIntent: payload.paymentIntent,
            shippingCost,
            selectedPaymentMethod: paymentMethods.selectedPaymentMethod,
            shippingAddress: address,

        }
        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`)
            setProcessing(false)


        } else {
            createOrder(auth.user.token, data).then(r => {
                console.log(r.data)
                if (r.data.ok) {
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem("cart")
                    }
                    dispatch(addToCart([]))
                    dispatch(couponApplied(false))
                    dispatch(totalAfterDiscount(0))

                    emptyUserCart(auth.user.token).then(r => {
                        console.log(r)
                    })
                }
            })
            setError(null)
            setProcessing(false)
            setSucceeded(true)

        }

    };

    const handleChange = (e) => {
        setDisabled(e.empty)
        setError(e.error ? e.error.message : "")

    };

    return (
        <>
            {!succeeded && <div className='mt-3'>
                {coupon && totalAfterDiscount !== undefined ?
                    <p className='alert alert-success'>{`Total after discount Ksh ${totalAfterDiscount.value}`}</p> :
                    <p className='alert alert-danger'>No coupon applied</p>}
            < /div>}

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
                                Total payable: KES {(payable / 100).toFixed(2)}
                            </>
                        ]}
                        cover={<img src={defaultImage} alt='payment'
                                    style={{height: '200px', objectFit: 'cover', marginBottom: '-50px'}}/>}/>
                </Suspense>
            </div>
            <form id='payment-form' className='stripe-form' onSubmit={handleSubmit}>
                <CardElement id='card-element' options={cartStyle} onChange={handleChange}/>
                <button className='stripe-button' disabled={processing || disabled || succeeded}>
                    <span id='button-text'>
                {processing ? <div className='spinner' id='spinner'>
                </div> : 'Pay'}
                    </span>
                </button>
                <br/>
                {error && <div className='card-error' role='alert'>{error}</div>}
                <br/>
                <p className={succeeded ? 'result-message' : 'result-message hidden'}>
                    Payment successful. <Link to='/user/history'>
                    See it in your purchase history
                </Link>
                </p>
            </form>


        </>
    );
};

export default StripeCheckout;