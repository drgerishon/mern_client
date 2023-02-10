import React from 'react';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {useLocation} from "react-router-dom";
import '../stripe.css'
import StripeCheckout from "../components/payment/StripeCheckout";
import {Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import Paypal from "../components/payment/Paypal";
import Mpesa from "../components/payment/Mpesa";
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY)
const Payment = () => {
    const location = useLocation()
    const selectedPaymentMethod = useSelector((state) => state.paymentMethods.selectedPaymentMethod);
    if (!(location.state && location.state.address) || !selectedPaymentMethod) {
        return <Navigate to="/checkout"/>;
    }

    const initialOptions = {
        "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
        currency: "USD",
        intent: "capture",
    };
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-8">
                    <div className="card mb-3">
                        <div className='card-header'>
                            <h5 className='card-title'>Complete your Purchase</h5>
                        </div>
                        <div className="card-body">
                            {
                                selectedPaymentMethod === 'Card' && <Elements stripe={promise}>
                                    <StripeCheckout address={location.state.address}/>
                                </Elements>
                            }
                            {
                                selectedPaymentMethod === 'Paypal' &&
                                <PayPalScriptProvider options={initialOptions}>
                                    <Paypal address={location.state.address}/>
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
            </div>
        </div>
    );
};

export default Payment;