import React, {lazy, Suspense, useEffect, useState} from 'react';
import {MDBBtn, MDBInput, MDBSpinner} from "mdb-react-ui-kit";
import {createPaymentIntent} from "../../redux/services/payment.service";
import {setTotalAfterDiscount} from "../../redux/slices/totalAfterDiscount";
import {useSelector, useDispatch} from "react-redux";
import {Icon} from "@iconify/react";
import defaultImage from "../../images/default.jpg";
import Input from "../../ui/input/Input";
import {Link} from "react-router-dom";
import {checkValidity, updateObject} from "../../common/Utility";
import {createMPESAOderForUser} from "../../redux/services/user.service";
import {clearMessage, setMessage} from "../../redux/slices/message";

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
const Mpesa = () => {
    const {auth, coupon, totalAfterDiscount, message, paymentMethods} = useSelector(state => ({...state}))
    const [phoneNumber, setPhoneNumber] = useState('');
    const [validatedPhoneNumber, setValidatedPhoneNumber] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const [payable, setPayable] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)
    const [succeeded, setSucceed] = useState(false)
    const [success, setSuccess] = useState(false)

    const dispatch = useDispatch()
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    useEffect(() => {
        createPaymentIntent(auth.user.token, {
            couponApplied: coupon,
            selectedPaymentMethod: paymentMethods.selectedPaymentMethod
        }).then(res => {
            setCartTotal(res.data.cartTotal)
            setPayable(res.data.payable)
            dispatch(setTotalAfterDiscount(res.data.totalAfterDiscount))
        }).catch(e => {
            console.log(e)
        })
    }, [auth.user.token, coupon, dispatch, paymentMethods.selectedPaymentMethod])


    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        let value = values.mpesaPhone.phone.value;
        let mobile = value.replace(/ /g, '');
        if (value.slice(0, 1) === '+') {
            mobile = mobile.substring(4)
        }
        if (value.charAt(0) === '0') {
            mobile = mobile.substr(1);
        }
        dispatch(setMessage('Please check your phone and enter your MPESA pin to authorize the transaction'))
        createMPESAOderForUser(auth.user.token, mobile, coupon).then(res => {
            setLoading(false)
            if (res.data.success) {
                console.log(res.data.data.CustomerMessage)
                dispatch(setMessage(res.data.data.CustomerMessage))
                setSuccess(true)
            } else {
                setSuccess(false)
                dispatch(setMessage(res.data.error))
            }
        }).catch((e) => {
            setLoading(false)
            console.log(e)
            setSuccess(false)
        })


    }

    const formElementsArray = [];

    for (let key in values.mpesaPhone) {
        formElementsArray.push({
            id: key,
            config: values.mpesaPhone[key]
        });
    }


    function handleChange(event, inputIdentifier) {
        let value = event.target.value
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
            {!succeeded && <div className=''>
                {coupon && totalAfterDiscount !== undefined ?
                    <p className='alert alert-success'>{`Total after discount Ksh ${totalAfterDiscount.value}`}</p> :
                    <p className='alert alert-danger'>No coupon applied</p>}
            < /div>
            }
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
            <form className='row g-3' onSubmit={handleSubmit}>

                <>
                    {

                        formElementsArray.map(({config, id}) => {
                            return <Input
                                key={id}
                                id={id}
                                className='col-12 '
                                elementType={config.elementType}
                                elementConfig={config.elementConfig}
                                value={config.value}
                                message={config.validationMessage}
                                invalid={!config.valid}
                                shouldValidate={config.validation}
                                touched={config.touched}
                                changed={(event) => handleChange(event, id)}/>
                        })
                    }


                    <div className='col-12'>
                        <MDBBtn
                            type='submit'
                            className='btn btn-primary  w-100'
                            disabled={loading || !values.formIsValid}>
                            {loading ? <>
                                <MDBSpinner size='sm' role='status' tag='span' className='me-2'/>
                                Loading...
                            </> : 'Login'}
                        </MDBBtn>
                    </div>
                </>
                {loading || setSuccess ? <div className="col-12 ">
                    <div
                        className={"text-info"}
                        role="alert"
                    >
                        {message.message}
                    </div>
                </div> : <div className="col-12 ">
                    <div
                        className={"text-danger"}
                        role="alert"
                    >
                        {message.message}
                    </div>
                </div>
                }
            </form>
        </div>

    );
};

export default Mpesa;




