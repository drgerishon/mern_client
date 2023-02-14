import React, {lazy, useState} from 'react';

import {useDispatch, useSelector} from "react-redux";
import {PayPalButtons, usePayPalScriptReducer,} from "@paypal/react-paypal-js";
import {useNavigate} from "react-router-dom";
import {
    capturePaypalPaymentAndSavePaypalOrder,
    emptyUserCart,
    initPaypalOrder
} from "../../redux/services/user.service";
import PayCard from "./Card";
import {withSwal} from "react-sweetalert2";
import {clearMessage} from "../../redux/slices/message";
import {selectPaymentMethod} from "../../redux/slices/paymentMethods";
import {addToCart} from "../../redux/slices/cart";
import {couponApplied} from "../../redux/slices/coupon";
import {setTotalAfterDiscount} from "../../redux/slices/totalAfterDiscount";


const Paypal = ({
                    address: shippingAddress,
                    swal,
                    payable,
                    discountAmount,
                    cartTotal
                }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [succeeded, setSucceeded] = useState(false)
    const [error, setError] = useState('')
    const [processing, setProcessing] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [{isPending}] = usePayPalScriptReducer();
    const {auth, coupon, totalAfterDiscount, paymentMethods} = useSelector(state => ({...state}))


    const handleSubmit = () => {
        const data = {
            shippingAddress,
            couponApplied: coupon
        }
        return initPaypalOrder(auth.user.token, data)
            .then(res => {
                return res.data.id;
            }).catch(e => {
                console.log(e.response.data.error)
            })
    };

    async function handleApprove(orderId) {
        setProcessing(true);
        setError('');
        setDisabled(true);

        try {
            swal.fire({
                title: 'Saving',
                allowOutsideClick: false,
                allowEscapeKey: false,
                text: 'Payment processed successfully. Please wait while we save the information',
                icon: 'info',
                html: '<div class="lds-hourglass"></div>',
                showConfirmButton: false
            });

            const response = await capturePaypalPaymentAndSavePaypalOrder(auth.user.token, {
                orderId,
                selectedPaymentMethod: paymentMethods.selectedPaymentMethod,
                shippingAddress
            });

            const {result} = response.data;
            const {saved} = response.data;
            const {id, payer, purchase_units} = result;
            const transactionId = purchase_units[0].payments.captures[0].id;
            const transactionDate = purchase_units[0].payments.captures[0].create_time;
            const name = payer.name.given_name + payer.name.surname;
            const email = payer.email_address;
            const address = payer.address.country_code;
            const transactionAmount = purchase_units[0].payments.captures[0].amount.value;

            swal.close();
            swal.fire({
                title: 'Transaction successful',
                allowOutsideClick: false,
                allowEscapeKey: false,
                text: 'Your transaction has been successfully processed',
                icon: 'success',
                didClose: () => {
                    dispatch(clearMessage());
                    dispatch(selectPaymentMethod('Mpesa'));
                },
                didDestroy: () => {
                    // do something when the modal is destroyed
                },
                didRender: (popup) => {
                    // do something when the modal is rendered
                },
                didOpen: () => {
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('cart');
                    }
                    dispatch(addToCart([]));
                    dispatch(couponApplied(false));
                    dispatch(setTotalAfterDiscount(0));
                    emptyUserCart(auth.user.token).then(r => {
                        console.log('CART EMPTY', r.data);
                    });

                }
            }).then((response) => {
                if (response.isConfirmed) {
                    navigate(`/user/success/${purchase_units[0].payments.captures[0].id}`, {
                        state: {
                            transactionDate,
                            transactionId,
                            saved,
                            name,
                            email,
                            address,
                            transactionAmount,
                        }
                    });
                }
            });
        } catch (e) {
            setProcessing(false);
            setError('Payment not successful. You can also pay with Mpesa or Cards');
            setDisabled(false);
            return navigate('/user/error');
        }
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
                {/*<PayPalButtons*/}
                {/*    createOrder={handleSubmit}*/}
                {/*    onApprove={(data) => handleApprove(data)}*/}
                {/*/>*/}

                <PayPalButtons
                    createOrder={handleSubmit}
                    onApprove={(data, actions) => {
                        handleApprove(data.orderID)
                        // return actions.order.capture()
                    }}
                />
            </>

        </>

    )

}

export default withSwal(Paypal);