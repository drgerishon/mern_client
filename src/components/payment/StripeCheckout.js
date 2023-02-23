import React, {useEffect, useState} from 'react';
import {useStripe, CardElement, useElements} from "@stripe/react-stripe-js";
import {useSelector, useDispatch} from "react-redux";
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
                            address: shippingAddress,
                            swal,
                            clientSecret,
                            payable,
                            discountAmount,
                            cartTotal
                        }) => {
        const dispatch = useDispatch()
        const navigate = useNavigate()
        const [succeeded, setSucceeded] = useState(false)
        const [error, setError] = useState(null)
        const [processing, setProcessing] = useState(false)
        const [disabled, setDisabled] = useState(true)

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

        const handleResponse = async (response) => {
            if (response.error) {
                throw new Error(response.error.message);
            }

            setError('');

            const data = {
                paymentIntent: response.paymentIntent,
                selectedPaymentMethod: paymentMethods.selectedPaymentMethod,
                shippingAddress,
            };

            const createOrderResponse = await createStripeOrderForUser(auth.user.token, data);

            if (createOrderResponse.status === 200) {
                return createOrderResponse.data;
            }

            return false;
        };


        const handleSubmit = async (e) => {
            e.preventDefault();
            setProcessing(true);
            swal.fire({
                allowOutsideClick: false,
                allowEscapeKey: false,
                title: 'Processing....',
                text: 'Please wait while we process your payment request',
                icon: 'info',
                html: '<div class="lds-hourglass"></div>',
                backdrop: 'rgba(0,0,0,0.9)',
                didOpen: async () => {
                    try {
                        const response = await stripe.confirmCardPayment(clientSecret, {
                            payment_method: {
                                card: elements.getElement(CardElement),
                                billing_details: {
                                    name: e.target.name.value,
                                },
                            },
                        });

                        const data = await handleResponse(response);

                        if (data) {
                            const transactionId = data.result.transactionId;
                            const transactionDate = data.result.transactionDate;
                            const name = data.result.name;
                            const email = data.result.email;
                            const transactionAmount = data.result.transactionAmount;
                            swal.update({
                                title: 'Transaction successful',
                                text: 'Your transaction has been successfully processed',
                                icon: 'success',
                                html: '',
                                showConfirmButton: true,
                                didClose: () => {
                                    navigate(`/user/success/${data.result.id}`, {
                                        state: {
                                            transactionDate,
                                            transactionId,
                                            saved: data.saved,
                                            name,
                                            email,
                                            transactionAmount,
                                        }
                                    });
                                }
                            })
                        }
                    } catch (error) {
                        setError(error.message);
                        setProcessing(false);
                        swal.update({
                            title: 'Error',
                            text: error.message,
                            icon: 'error',
                            html: ``,
                            showConfirmButton: true,
                        });
                    }
                },
            }).then(response => {
                if (response.isConfirmed) {
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('cart');
                    }
                    dispatch(addToCart([]));
                    dispatch(couponApplied(false));
                    dispatch(setTotalAfterDiscount(0));
                    emptyUserCart(auth.user.token).then(r => {
                        console.log('CART EMPTY', r.data);
                    });
                    dispatch(clearMessage());
                    dispatch(selectPaymentMethod('Mpesa'));
                }
            });

        };


        const handleChange = (e) => {
            setDisabled(e.empty)
            setError(e.error ? e.error.message : "")

        };
        return (


            <>

                <PayCard
                    succeeded={succeeded}
                    payable={payable}
                    discountAmount={discountAmount}
                    cartTotal={cartTotal}
                />

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

        );
    }
;

export default withSwal(StripeCheckout);

