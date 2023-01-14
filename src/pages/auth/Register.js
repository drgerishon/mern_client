import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Input from "../../ui/input/Input";
import {MDBBtn, MDBCheckbox, MDBSpinner} from "mdb-react-ui-kit";
import {Link, Navigate} from "react-router-dom";
import {preSignup} from "../../redux/slices/auth";
import {clearMessage} from "../../redux/slices/message";
import {checkValidity, updateObject} from "../../common/Utility";
import {toast} from "react-toastify";

const Register = () => {
    const initialValues = {
        registrationForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'name',
                    required: true,
                    label: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                validationMessage: [],
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    name: 'email',
                    required: true,
                    label: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                }, validationMessage: [],
                valid: false,
                touched: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'tel',
                    name: 'phone',
                    required: true,
                    label: 'Your phone number'
                },
                value: '',
                validation: {
                    required: true,
                },
                validationMessage: [],
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    required: true,
                    name: 'password',
                    label: 'Your password'
                },
                value: '',
                validation: {
                    required: true,
                    isPassword: true,
                    minLength: 8,
                    maxLength: 32
                },
                validationMessage: [],
                valid: false,
                touched: false
            },
            password1: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    name: 'password1',
                    required: true,
                    label: 'Confirm password'
                },
                value: '',
                validation: {
                    required: true,
                    isEqual: 'password'
                },
                validationMessage: [],
                valid: false,
                touched: false
            },
            terms: {
                elementType: 'checkbox',
                elementConfig: {
                    type: 'checkbox',
                    name: 'terms',
                    required: true,
                    label: 'Agree to terms and conditions'
                },
                value: false,
                validation: {
                    isTerms: true,

                },
                validationMessage: [],
                valid: false,
                touched: false
            },
        },
        formIsValid: false
    }

    const [values, setValues] = useState(initialValues);
    const [successful, setSuccessful] = useState(false);
    const [loading, setLoading] = useState(false)
    const {isLoggedIn} = useSelector((state) => state.auth);
    const {message} = useSelector((state) => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);


    const handleChange = (event, inputIdentifier, config) => {


        let value = event.target.value
        if (inputIdentifier === 'terms') {
            value = event.target.checked
        }

        const updatedFormElement = updateObject(values.registrationForm[inputIdentifier], {
            value,
            valid: checkValidity(value, values.registrationForm[inputIdentifier], values.registrationForm.password.value),
            touched: true
        });
        console.log('mene',updatedFormElement)

        const updatedRegistrationForm = updateObject(values.registrationForm, {
            [inputIdentifier]: updatedFormElement
        });

         // console.log(' registration', updatedRegistrationForm )

        let formIsValid = true;

        for (let inputIdentifier in updatedRegistrationForm) {
            formIsValid = updatedRegistrationForm[inputIdentifier].valid && formIsValid;
        }

        setValues({registrationForm: updatedRegistrationForm, formIsValid: formIsValid});


    };


    const handleSubmit = (event) => {
        event.preventDefault()
        setSuccessful(false);
        setLoading(true)
        const formData = {};
        for (let formElementIdentifier in values.registrationForm) {
            formData[formElementIdentifier] = values.registrationForm[formElementIdentifier].value;
        }


        dispatch(preSignup(formData))
            .unwrap()
            .then(() => {
                setSuccessful(true);
                toast.success('Signup email sent')
                setLoading(false)
                // setValues({registrationForm: updatedRegistrationForm, formIsValid: false});
            })
            .catch(() => {
                setSuccessful(false);
                toast.error('Try again')
                setLoading(false)
                // setValues({registrationForm: updatedRegistrationForm, formIsValid: false});
            });

    };

    const formElementsArray = [];

    for (let key in values.registrationForm) {
        formElementsArray.push({
            id: key,
            config: values.registrationForm[key]
        });
    }


    const signupForm = () => {
        return (
            <form className='row g-3' onSubmit={handleSubmit}>

                {
                    !successful && (
                        <>
                            {

                                formElementsArray.map(({config, id}) => {
                                    let feedback = ''
                                    Array.isArray(message) && message && message.map(m => {
                                        if (m.param === id) return feedback = m.msg
                                        return feedback = ''
                                    })

                                    return <Input
                                        key={id}
                                        id={id}
                                        feedback={feedback}
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
                                    disabled={!values.formIsValid || loading}>
                                    {loading ? <>
                                        <MDBSpinner size='sm' role='status' tag='span' className='me-2'/>
                                        Loading...
                                    </> : 'Submit form'}
                                </MDBBtn>
                            </div>
                            <div className="col-12">
                                <p className="small mb-0">Already have an account?
                                    <Link to="/auth/login"> {' '} Log in</Link>
                                </p>
                            </div>

                        </>
                    )
                }
                {message && <>
                    <div className="col-12 mb-3">
                        <div
                            className={successful ? "text-success" : "text-danger "}
                            role="alert"
                        >
                            {message}
                        </div>
                    </div>

                    <div className='col-12'>
                        <Link to="/">
                            <MDBBtn className='btn btn-secondary  w-100'>
                                Back to Home
                            </MDBBtn>
                        </Link>
                    </div>

                </>}


            </form>
        );
    };
    if (isLoggedIn) {
        return <Navigate replace to="/user/history"/>
    } else {

        return (
            <>
                <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">{message ? 'Check your email address' : 'Account opening '}</h5>
                    <p className="text-center ">
                        {message ? 'Activation link send to the email provided' : 'Fill the form to provide your details'}
                    </p>
                </div>
                {signupForm()}
            </>

        );
    }
}

export default Register;