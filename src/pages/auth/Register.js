import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Input from "../../ui/input/Input";
import {MDBBtn} from "mdb-react-ui-kit";
import {Link, Navigate} from "react-router-dom";
import {preSignup} from "../../redux/slices/auth";
import {clearMessage, setMessage} from "../../redux/slices/message";
import {checkValidity, updateObject} from "../../common/Utility";
import {withSwal} from "react-sweetalert2";
import Progress from "../../components/progress/progress";
import Success from "../../ui/success/Success";


const Register = ({swal}) => {
    const initialValues = {
        registrationForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    name: 'email',
                    required: true,
                    label: 'Email*'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                }, validationMessage: [],
                valid: false,
                touched: false
            },
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'firstName',
                    required: true,
                    label: 'First name*'
                },
                value: '',
                validation: {
                    required: true
                },
                validationMessage: [],
                valid: false,
                touched: false
            },
            middleName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'middleName',
                    label: 'Other names'
                },
                value: '',
                validation: {
                    required: false
                },
                validationMessage: [],
                valid: true,
                touched: false
            },
            surname: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    name: 'surname',
                    required: true,
                    label: 'Surname*'
                },
                value: '',
                validation: {
                    required: true
                },
                validationMessage: [],
                valid: false,
                touched: false
            },
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
                    label: 'Choose password*'
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
                    label: 'Confirm password*'
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
            gender: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'def', display: 'Select your gender'},
                        {value: 'male', display: 'Male'},
                        {value: 'female', display: 'Female'},
                        {value: 'intersex', display: 'Intersex'},
                        {value: 'undisclosed', display: 'Prefer not to say'},
                    ]
                },
                value: 'def',
                validation: {
                    required: true
                },
                validationMessage: [],
                valid: false,
                touched: false
            },
            // dob: {
            //     elementType: 'date',
            //     elementConfig: {
            //         name: 'dob',
            //         dateFormat: "MM/dd/yyyy",
            //         required: true,
            //     },
            //     value: new Date(),
            //     validation: {
            //         isDate: true
            //     },
            //     validationMessage: [],
            //     valid: false,
            //     touched: false
            // },
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
                    // required: true,
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
    const [page, setPage] = useState(0);
    const [sliceStart, setSliceStart] = useState(0)
    // const [sliceStart, setSliceStart] = useState(8)
    const [sliceNumber, setSliceNumber] = useState(1)
    // const [sliceNumber, setSliceNumber] = useState(9)
    const [errored, setErrored] = useState(false)
    const [showForm, setShowForm] = useState(true)


    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);


    const toggleActive = () => {
        console.log('')

    };

    const handleChange = (event, inputIdentifier, config) => {
        dispatch(setMessage(null))
        let value
        if (inputIdentifier === 'dob') {
            value =event
        } else if (inputIdentifier === 'terms') {
            value = event.target.checked
        } else {
            value = event.target.value
        }

        const updatedFormElement = updateObject(values.registrationForm[inputIdentifier], {
            value,
            valid: checkValidity(value, values.registrationForm[inputIdentifier], values.registrationForm.password.value),
            touched: true
        });


        const updatedRegistrationForm = updateObject(values.registrationForm, {
            [inputIdentifier]: updatedFormElement
        });


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
        setErrored(false)
        const formData = {};
        for (let formElementIdentifier in values.registrationForm) {
            formData[formElementIdentifier] = values.registrationForm[formElementIdentifier].value;
        }

        dispatch(preSignup(formData))
            .unwrap()
            .then(() => {
                setSuccessful(true);
                setErrored(false)
            })
            .catch(() => {
                setSuccessful(false);
                setValues({...values, formIsValid: false})
                setErrored(true)
            });

    };
    if (errored && message) {
        console.log(values.registrationForm.terms.value)
        swal.fire({
            text: message,
            icon: 'error',
            didOpen: () => {
                setLoading(false);
                setShowForm(false)

            },
            didClose: () => {
                setShowForm(true)

                dispatch(clearMessage())
            }
        }).then(result => {
            setErrored(false)
            dispatch(clearMessage())


        }).catch(error => {
            dispatch(clearMessage())
            setSuccessful(false)
            setShowForm(false)
            setLoading(false);

        });
    }

    if (successful && message) {
        swal.fire({
            text: message,
            icon: 'success',
            didOpen: () => {
                setLoading(false);
                setShowForm(false)

            },
            didClose: () => {
                setShowForm(true)
                setErrored(false)
                dispatch(clearMessage())

            }
        }).then(result => {
            dispatch(clearMessage())


        }).catch(error => {
            dispatch(clearMessage())
            setSuccessful(false)
            setShowForm(false)
            setLoading(false);
        });
    }

    const formElementsArray = [];

    for (let key in values.registrationForm) {
        formElementsArray.push({
            id: key,
            config: values.registrationForm[key]
        });
    }


    function disabledCheck() {
        let disabled = false
        if (page === 3 && !values.formIsValid) {
            disabled = true
        }
        if ((page === 1) && (
            !values.registrationForm.firstName.value ||
            !values.registrationForm.surname.value ||
            !values.registrationForm.phone.value)) {
            disabled = true
        }
        if ((page === 2) && (
            (!values.registrationForm.password.value || !values.registrationForm.password1.value) ||
            (values.registrationForm.password1.value.trim() !== values.registrationForm.password.value.trim())
        )) {
            disabled = true
        }
        if (page === 3 && (!values.formIsValid)) {
            disabled = true
        }
        if (errored) {
            disabled = true
        }


        return disabled
    }


    const signupForm = () => {
        return (
            <form className='row g-3' onSubmit={handleSubmit}>
                <div className='col-12 '>
                    <Progress page={page}/>
                </div>
                <div className='col-12 mb-3'>
                    {successful && <Success/>}
                </div>
                {
                    !successful && (
                        <>
                            {
                                formElementsArray.slice(sliceStart, sliceNumber).map(({config, id}) => {
                                    let feedback = ''
                                    message && Array.isArray(message) && message.map(m => {
                                        if (m.param === id) {
                                            return feedback = m.msg
                                        } else {
                                            return feedback = m.msg
                                        }

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


                            <div className='col-12 mb-3'>
                                {page === 0 && <MDBBtn
                                    type='button'
                                    onClick={() => {
                                        if (page === 0) {
                                            setPage((currPage) => currPage + 1);
                                            setSliceStart((currNumber) => currNumber + 1);
                                            setSliceNumber((currNumber) => currNumber + 4);
                                            toggleActive()
                                        }
                                    }}
                                    className='btn btn-primary w-100'
                                    disabled={!values.registrationForm.email || !values.registrationForm.email.valid}>
                                    Next
                                </MDBBtn>}

                                {page > 0 && <div className="row">
                                    <div className="col-6">
                                        <MDBBtn
                                            type='button'
                                            onClick={() => {
                                                if (page === 1) {
                                                    setPage((currPage) => currPage - 1);
                                                    setSliceStart((currNumber) => currNumber - 1);
                                                    setSliceNumber((currNumber) => currNumber - 4);
                                                    toggleActive()
                                                } else if (page === 2) {
                                                    setPage((currPage) => currPage - 1);
                                                    setSliceStart((currNumber) => currNumber - 4);
                                                    setSliceNumber((currNumber) => currNumber - 2);

                                                } else if (page === 3) {
                                                    setPage((currPage) => currPage - 1);
                                                    setSliceStart((currNumber) => currNumber - 2);
                                                    setSliceNumber((currNumber) => currNumber - 3);
                                                }
                                            }}
                                            className='btn btn-primary w-100'
                                            disabled={page === 0 || !values.registrationForm.email || !values.registrationForm.email.valid}>
                                            Previous
                                        </MDBBtn>
                                    </div>
                                    <div className="col-6">
                                        <MDBBtn
                                            type={page === 3 ? "submit" : "button"}
                                            onClick={(event) => {
                                                if (page === 1) {
                                                    setPage((currPage) => currPage + 1);
                                                    setSliceStart((currNumber) => currNumber + 4);
                                                    setSliceNumber((currNumber) => currNumber + 2);
                                                    toggleActive()
                                                } else if (page === 2) {
                                                    setPage((currPage) => currPage + 1);
                                                    setSliceStart((currNumber) => currNumber + 2);
                                                    setSliceNumber((currNumber) => currNumber + 3);

                                                } else {
                                                    handleSubmit(event)
                                                }


                                            }}
                                            className={'btn btn-primary w-100'}
                                            disabled={disabledCheck()}>
                                            {page === 3 ? `${loading ? 'Please wait' : 'Submit'}` : 'Next'}
                                        </MDBBtn>
                                    </div>


                                </div>}
                            </div>


                        </>
                    )
                }
                {
                    message && Array.isArray(message) ? message.map(m => {
                        return <div className="col-12  alert alert-danger py-2 mx-2" key={m.param} role="alert">
                            {m.msg}
                        </div>
                    }) : message && <div className={`col-12 alert alert-${successful ? 'success' : 'danger'} py-2`}
                                         role='alert'>

                        {message}

                    </div>
                }

            </form>
        );
    };
    if (isLoggedIn) {
        return <Navigate replace to="/user/history"/>
    } else {

        return (
            <>
                {showForm && (
                    <>
                        <div className="pt-4 pb-2">
                            <h5 className="card-title text-center pb-0 fs-4">{successful ? 'Almost done!' : 'Account opening'}</h5>

                            <p className="text-center ">
                                {successful ?
                                    'Check your email and follow the instructions to complete registration process'
                                    :
                                    'Provide your details to open an account'
                                }
                            </p>

                        </div>
                        {signupForm()}
                    </>
                )}

                <div className='card-footer'>
                    <p className="small mb-3">Already have an account?
                        <Link to="/auth/login"> {' '} Log in</Link>
                    </p>


                    <p className="mb-0 text-muted" style={{fontSize: '10px'}}>For further support, you may
                        visit the Help Center
                        or contact our customer service
                        team.
                    </p>


                </div>
            </>

        );
    }
}

export default withSwal(Register);