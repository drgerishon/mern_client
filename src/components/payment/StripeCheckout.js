import React, {useEffect, lazy, Suspense, useState} from 'react';
import {useStripe, CardElement, useElements} from "@stripe/react-stripe-js";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import defaultImage from '../../images/default.jpg'
import {Icon} from '@iconify/react';
import {useNavigate} from "react-router-dom";

import {createStripeOrderForUser, emptyUserCart} from "../../redux/services/user.service";
import {addToCart} from "../../redux/slices/cart";
import {couponApplied} from "../../redux/slices/coupon";
import {selectPaymentMethod} from "../../redux/slices/paymentMethods";
import {setTotalAfterDiscount} from "../../redux/slices/totalAfterDiscount";
import {withSwal} from "react-sweetalert2";
import {clearMessage} from "../../redux/slices/message";
import PayCard from "./Card";


const StripeCheckout = ({
                            address,
                            swal,
                            convertedTotalAfterDiscount,
                            convertedTotalCart,
                            convertedPayable,
                            clientSecret
                        }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [showForm, setShowForm] = useState(true)
    const stripe = useStripe()
    const elements = useElements()
    const {auth, paymentMethods} = useSelector(state => ({...state}))

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch])

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
            selectedPaymentMethod: paymentMethods.selectedPaymentMethod,
            shippingAddress: address,
        }


        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`)
            setProcessing(false)

        } else {
            createStripeOrderForUser(auth.user.token, data).then(r => {
                if (r.data.ok) {
                    swal.fire({
                        text: 'Your transaction has been successfully processed',
                        icon: 'success',
                        didOpen: () => {
                            setShowForm(false)
                        },
                        didClose: () => {
                            dispatch(clearMessage())
                            setProcessing(false)
                            setSucceeded(true)
                            setError(null)

                        }
                    }).then(result => {
                        dispatch(clearMessage())
                        dispatch(selectPaymentMethod('Mpesa'))
                        navigate('/user/history')
                        if (typeof window !== 'undefined') {
                            localStorage.removeItem("cart")
                        }
                        dispatch(addToCart([]))
                        dispatch(couponApplied(false))
                        dispatch(setTotalAfterDiscount(0))
                        emptyUserCart(auth.user.token).then(r => {
                            console.log('CART EMPTY', r.data)
                        })

                    }).catch(error => {
                        setProcessing(false)
                        setSucceeded(true)
                    });

                }
            })


        }


    };


    const handleChange = (e) => {
        setDisabled(e.empty)
        setError(e.error ? e.error.message : "")

    };


    return (


        <>
            {showForm &&
            <>
                <PayCard
                    succeeded={succeeded}
                    convertedTotalAfterDiscount={convertedTotalAfterDiscount}
                    convertedTotalCart={convertedTotalCart}
                    convertedPayable={convertedPayable}/>
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
                </form>
            </>
            }

        </>

    );
};

export default withSwal(StripeCheckout);