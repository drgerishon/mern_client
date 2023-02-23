import React, {lazy, Suspense, useCallback, useEffect, useState} from 'react';
import {MDBBtn, MDBInput, MDBSpinner} from "mdb-react-ui-kit";
import {useSelector, useDispatch} from "react-redux";
import {Icon} from "@iconify/react";
import defaultImage from "../../images/default.jpg";
import Input from "../../ui/input/Input";
import {checkValidity, updateObject} from "../../common/Utility";
import {createStripeOrderForUser, emptyUserCart, initiateMPESAOderForUser} from "../../redux/services/user.service";
import {clearMessage, setMessage} from "../../redux/slices/message";
import {withSwal} from "react-sweetalert2";
import {io} from 'socket.io-client';

const Card = lazy(() => import("antd").then(module => ({default: module.Card})));

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

const Mpesa = ({address, payable, swal, cartTotal, discountAmount}) => {
        const {auth, coupon, totalAfterDiscount, message, paymentMethods} = useSelector(state => ({...state}));
        const [loading, setLoading] = useState(false);
        const [succeeded, setSucceed] = useState(false);
        const [processing, setProcessing] = useState(false);
        const [paymentError, setPaymentError] = useState(false);
        const [initiating, setInitiating] = useState(false);
        const [initiatingError, setInitiatingError] = useState(false);
        const [socket, setSocket] = useState(null);
        const dispatch = useDispatch();
        const [values, setValues] = useState(initialValues);

        useEffect(() => {
            dispatch(clearMessage());
        }, [dispatch]);

        const handlePaymentSuccess = useCallback((data) => {
            setSucceed(true);
            dispatch(setMessage(data.paymentResponseMpesa.ResultDesc))
            setProcessing(false)
            setLoading(false)
        }, [dispatch]);

        const handlePaymentError = useCallback((error) => {
                setPaymentError(error);
                dispatch(setMessage(error.ResultDesc))
                setSucceed(false)
                setProcessing(false)
                setLoading(false)


            },
            [dispatch]);

        useEffect(() => {
            const socket = io(process.env.REACT_APP_API_DEVELOPMENT_SOCKET);
            socket.on("mpesaPaymentFailed", handlePaymentError);
            socket.on("mpesaPaymentSuccess", handlePaymentSuccess);
            return () => {
                socket.off("mpesaPaymentFailed", handlePaymentError);
                socket.off("mpesaPaymentSuccess", handlePaymentSuccess);
            };
        }, [handlePaymentError, handlePaymentSuccess]);

        useEffect(() => {
            const socket = io(process.env.REACT_APP_API_DEVELOPMENT_SOCKET);
            setSocket(socket);
            return () => {
                socket.disconnect();
            };
        }, []);


        const initiatePayment = async (e) => {
            e.preventDefault();
            setLoading(true);
            setInitiating(true)
            dispatch(setMessage('Initiating the transaction'))
            const value = values.mpesaPhone.phone.value;
            let mobile = value.replace(/ /g, '');

            if (value.charAt(0) === '0') {
                mobile = mobile.substring(1);
            }

            try {
                const res = await initiateMPESAOderForUser(auth.user.token, {
                    phoneNumber: mobile,
                    selectedPaymentMethod: paymentMethods.selectedPaymentMethod,
                    shippingAddress: address,
                }, coupon);

                if (res.data.ok) {
                    setInitiating(false)
                    setProcessing(true)
                    setInitiatingError('')
                    dispatch(setMessage('Please check your phone to authorize the transaction'))
                }
            } catch (error) {
                setInitiating(false)
                setInitiatingError(error.response.data.error.errorMessage)
                dispatch(setMessage(error.response.data.error.errorMessage))
                setLoading(false)
            }
        };
        const formElementsArray = Object.entries(values.mpesaPhone).map(([id, config]) => {
            return {
                id,
                config,
            };
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

            let formIsValid = true;

            for (let inputIdentifier in updatedLoginForm) {
                formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
            }

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
                    {formElementsArray.map(({config, id}) => (
                        <Input
                            key={id}
                            id={id}
                            className='col-12'
                            elementType={config.elementType}
                            elementConfig={config.elementConfig}
                            value={config.value}
                            message={config.validationMessage}
                            invalid={!config.valid}
                            shouldValidate={config.validation}
                            touched={config.touched}
                            changed={(event) => handleChange(event, id)}
                        />
                    ))}

                    <div className='col-12'>
                        <MDBBtn
                            type='submit'
                            className='btn btn-primary  w-100'
                            disabled={loading || !values.formIsValid}
                        >
                            {loading ? (
                                <>
                                    <MDBSpinner size='sm' role='status' tag='span' className='me-2'/>
                                    Loading...
                                </>) : ('Pay now')}
                        </MDBBtn>
                    </div>
                    {!succeeded && !loading && (
                        <div className='col-12'>
                            <p className='text-danger'>{message.message}</p>
                        </div>
                    )}

                    {loading && (
                        <div className='col-12'>
                            <p className='text-info'>{message.message}</p>
                        </div>
                    )}

                    {succeeded && !loading && (
                        <div className='col-12'>
                            <p className='text-success'>{message.message}</p>
                        </div>
                    )}
                </form>
            </div>
        );
    }
;

export default withSwal(Mpesa);

