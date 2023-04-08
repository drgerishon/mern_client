import React, {lazy, Suspense, useCallback, useEffect, useState} from 'react';
import {MDBBtn, MDBInput, MDBSpinner} from "mdb-react-ui-kit";
import {useSelector, useDispatch} from "react-redux";
import {Icon} from "@iconify/react";
import defaultImage from "../../images/default.jpg";
import Input from "../../ui/input/Input";
import {checkValidity, updateObject} from "../../common/Utility";
import {createStripeOrderForUser, emptyUserCart, initiateMPESAOderForUser} from "../../services/user.service";
import {clearMessage, setMessage} from "../../redux/slices/message";
import {withSwal} from "react-sweetalert2";
import {io} from 'socket.io-client';
import {toast} from "react-toastify";
import {addToCart} from "../../redux/slices/cart";
import {setTotalAfterDiscount} from "../../redux/slices/totalAfterDiscount";
import {selectPaymentMethod} from "../../redux/slices/paymentMethods";
import {useNavigate} from "react-router-dom";

const Card = lazy(() => import("antd").then(module => ({default: module.Card})));


const Mpesa = ({address, payable, swal, cartTotal, coupon: couponApplied, discountAmount}) => {
        const initialValues = {
            mpesaPhone: {
                phone: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'tel',
                        name: 'phone',
                        required: true,
                        label: 'Phone number*'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isPhoneNumber: true
                    },
                    validationMessage: [],
                    valid: false,
                    touched: false
                },
            },
            formIsValid: false
        }
        const {auth, coupon, totalAfterDiscount, message, paymentMethods} = useSelector(state => ({...state}));
        const [socket, setSocket] = useState(null);
        const dispatch = useDispatch();
        const [values, setValues] = useState(initialValues);
        const navigate = useNavigate()

        const [paymentStatus, setPaymentStatus] = useState({
            loading: false,
            succeeded: false,
            processing: false,
            error: false
        });

        const {succeeded, loading, error, processing} = paymentStatus
        useEffect(() => {
            return () => {
                dispatch(clearMessage());
            };
        }, [dispatch]);

        const handlePayment = useCallback((success, data) => {

            if (success) {
                const transactionId = data.result.transactionId;
                const transactionDate = data.result.transactionDate;
                const name = data.result.name;
                const email = data.result.email;
                const transactionAmount = data.result.transactionAmount;
                swal.fire({
                    title: 'Transaction successful',
                    text: 'Your transaction has been successfully processed',
                    icon: 'success',
                    html: '',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    backdrop: 'rgba(0,0,0,0.9)',
                    showConfirmButton: true,
                    didOpen: () => {
                        dispatch(setMessage(data.result.ResultDesc))
                        setPaymentStatus({...paymentStatus, succeeded: true, loading: false, processing: false});
                        toast.success(`Payment successful`, {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                        localStorage.removeItem('cart');
                        dispatch(addToCart([]));
                        dispatch(couponApplied(false));
                        dispatch(setTotalAfterDiscount(0));
                        emptyUserCart(auth.user.token).then(() => {
                            console.log('CART EMPTY');
                        });
                        dispatch(clearMessage());
                        dispatch(selectPaymentMethod('Mpesa'));
                    },
                    didClose() {
                        navigate(`/user/success/${data.result.transactionId}`, {
                            state: {
                                transactionDate,
                                transactionId,
                                saved: data.saved,
                                name,
                                mpesa: true,
                                email,
                                transactionAmount,
                            }
                        });
                    }
                }).then(() => {
                    swal.close()
                });
            } else {
                dispatch(setMessage(data.ResultDesc))
                setPaymentStatus({...paymentStatus, processing: false, succeeded: false, loading: false, error: true});
                toast.error(`Payment failed `, {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        }, [auth.user.token, couponApplied, dispatch, navigate, paymentStatus, swal]);

        useEffect(() => {
            const socket = io(process.env.REACT_APP_API_DEVELOPMENT_SOCKET);
            socket.on("mpesaPaymentFailed", (error) => handlePayment(false, error));
            socket.on("mpesaPaymentSuccess", (data) => handlePayment(true, data));
            setSocket(socket);
            return () => {
                socket.disconnect();
            };
        }, [handlePayment]);

        const initiatePayment = async (e) => {
            e.preventDefault();
            setPaymentStatus({...paymentStatus, loading: true, processing: false, error: false});
            dispatch(clearMessage());
            const value = values.mpesaPhone.phone.value;
            let mobile = value.replace(/\s/g, '');
            if (value.charAt(0) === '0') {
                mobile = mobile.substring(1);
            }
            try {
                const res = await initiateMPESAOderForUser(auth.user.token, {
                    phoneNumber: mobile,
                    couponApplied,
                    selectedPaymentMethod: paymentMethods.selectedPaymentMethod,
                    shippingAddress: address,
                }, coupon);
                if (res.data.ok) {
                    setPaymentStatus({...paymentStatus, processing: true, error: false});
                    dispatch(setMessage('Please check your phone to authorize the transaction'))
                }
            } catch (error) {
                setPaymentStatus({...paymentStatus, loading: false, error: true});
                dispatch(setMessage(error.response.data.error.errorMessage))
            }
        };


        const formElementsArray = Object.values(values.mpesaPhone).map(config => {
            return (
                <Input
                    key={config.elementConfig.name}
                    elementType={config.elementType}
                    elementConfig={config.elementConfig}
                    value={config.value}
                    disabled={loading || succeeded || processing}
                    message={config.validationMessage}
                    invalid={!config.valid}
                    shouldValidate={config.validation}
                    touched={config.touched}
                    changed={(event) => handleChange(event, config.elementConfig.name)}
                />
            );
        });


        function handleChange(event, inputIdentifier) {
            const value = event.target.value;
            const updatedFormElement = updateObject(values.mpesaPhone[inputIdentifier], {
                value,
                valid: checkValidity(value, values.mpesaPhone[inputIdentifier], ''),
                touched: true
            });

            const updatedLoginForm = updateObject(values.mpesaPhone, {
                [inputIdentifier]: updatedFormElement
            });

            const formIsValid = Object.values(updatedLoginForm).every(input => input.valid);
            setValues({mpesaPhone: updatedLoginForm, formIsValid: formIsValid});

        }


        return (
            <div className='py-5'>
                {!succeeded && (
                    <div>
                        {coupon && totalAfterDiscount !== undefined ? (
                            <p className='alert alert-success'>{`Total after discount Ksh ${totalAfterDiscount.value}`}</p>
                        ) : (
                            <p className='alert alert-danger'>No coupon applied</p>
                        )}
                    </div>
                )}
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
                                    Total payable: KES {payable}
                                </>
                            ]}
                            cover={<img src={defaultImage} alt='payment'
                                        style={{height: '200px', objectFit: 'cover', marginBottom: '-50px'}}/>}
                        />
                    </Suspense>
                </div>

                <form className='row g-3' onSubmit={initiatePayment}>
                    {formElementsArray}
                    <div className='col-12'>

                        <p>
                            <strong className='fs-2'>Disclaimer</strong> <br/>
                            <em className='text-danger small'>To test this part, you have to use a real phone number.
                                If you authorize the transaction,the amount that will be deducted from your Mpesa
                                is <strong>Ksh 1</strong> regardless of cart total.The money will be send to safaricom
                                daraja API.
                                I dont know if its refundable.</em>
                        </p>
                    </div>
                    <div className='col-12'>
                        <MDBBtn
                            type='submit'
                            className='btn btn-primary w-100'
                            disabled={loading || !values.formIsValid || succeeded || processing}
                        >
                            {loading || processing ? (
                                <>
                                    <MDBSpinner size='sm' role='status' tag='span' className='me-2'/>
                                    Processing...
                                </>
                            ) : error ? (
                                'Try again'
                            ) : (
                                'Pay now'
                            )}
                        </MDBBtn>
                    </div>


                    {error && message.message && (
                        <div className="col-12">
                            <div className="alert alert-danger" role="alert">
                                <span><strong>{message.message}</strong></span>
                            </div>
                        </div>
                    )}
                    {!error && !succeeded && processing && message.message && (
                        <div className="col-12">
                            <div className="alert alert-info" role="alert">
                                <span><strong>{message.message}</strong></span>
                            </div>
                        </div>
                    )}

                    {succeeded && message.message && (
                        <div className="col-12">
                            <div className="alert alert-success" role="alert">
                                {message.message}
                            </div>
                        </div>
                    )}

                </form>
            </div>
        );
    }
;

export default withSwal(Mpesa);
