import React, {useEffect, useState} from 'react';
import {useStripe, CardElement, useElements} from "@stripe/react-stripe-js";
import {useSelector, useDispatch} from "react-redux";
import {createPaymentIntent} from "../functions/stripe";
import {Link} from "react-router-dom";
import {Card} from "antd";
import {DollarOutlined, CheckOutlined} from "@ant-design/icons";
import defaultImage from '../images/default.jpg'
import {createOrder, emptyUserCart} from "../functions/user";
import {addToCart} from "../redux/slices/cart";
import {toast} from "react-toastify";
import {couponApplied} from "../redux/slices/coupon";

const StripeCheckout = () => {
    const dispatch = useDispatch()
    const {auth, coupon} = useSelector(state => ({...state}))

    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState(null)
    const [processing, setProcessing] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')
    const [payable, setPayable] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
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
        createPaymentIntent(auth.user.token, coupon).then(res => {
            setClientSecret(res.data.clientSecret)
            setCartTotal(res.data.cartTotal)
            setPayable(res.data.payable)
            setTotalAfterDiscount(res.data.totalAfterDiscount)

        }).catch(e => {
            console.log(e)
        })
    }, [])

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
        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`)
            setProcessing(false)
        } else {
            createOrder(auth.user.token, payload).then(r => {
                if (r.data.ok) {
                    console.log('ORDER NUMBER.................',r.data.orderNumber)

                    if (typeof window !== 'undefined') {
                        localStorage.removeItem("cart")
                    }
                    dispatch(addToCart([]))
                    couponApplied(false)
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
            {!succeeded && <div>
                {coupon && totalAfterDiscount !== undefined ?
                    <p className='alert alert-success'>{`Total after discount ${totalAfterDiscount}`}</p> :

                    <p className='alert alert-danger'>No coupon applied</p>}

            < /div>}

            <div className="text-center mb-5">
                <Card
                    actions={[
                        <>
                            <DollarOutlined className='text-info'/>
                            <br/>
                            Total: KES {cartTotal}
                        </>,
                        <>
                            <CheckOutlined className='text-info'/>
                            <br/>
                            Total payable: KES {(payable / 100).toFixed(2)}
                        </>
                    ]}
                    cover={<img src={defaultImage} alt='payment'
                                style={{height: '200px', objectFit: 'cover', marginBottom: '-50px'}}/>}/>
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