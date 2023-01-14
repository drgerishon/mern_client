import React, {useEffect, useState} from 'react';
import {clearMessage} from "../../redux/slices/message";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import Input from "../../ui/input/Input";
import {MDBBtn, MDBSpinner} from "mdb-react-ui-kit";
import {checkValidity, updateObject} from "../../common/Utility";
import {withSwal} from "react-sweetalert2";
import {preSignup, resetPassword} from "../../redux/slices/auth";
import {toast} from "react-toastify";

const PasswordResetForm = ({swal}) => {

    let {token} = useParams();


    const initialValues = {
        passwordResetForm: {
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    required: true,
                    name: 'password',
                    label: 'New Password'
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
                    label: 'Re-enter New Password'
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

        },
        formIsValid: false
    }

    const [values, setValues] = useState(initialValues);

    const [loading, setLoading] = useState(false);
    const {message} = useSelector((state) => state.message);
    const {isLoggedIn, user} = useSelector((state) => state.auth);
    const location = useLocation();
    const [successful, setSuccessful] = useState(false);
    const [errored, setErrored] = useState(false)
    const [showForm, setShowForm] = useState(true)


    const dispatch = useDispatch();
    let navigate = useNavigate();


    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);


    useEffect(() => {
        let intended = location.state
        if (intended) {
            return
        } else {
            if (user && user.token) {
                navigate("/user/history");
            }
        }

    }, [user, location, navigate])


    if (errored && message) {
        swal.fire({
            text: message,
            icon: 'error',
            didOpen: () => {
                setLoading(false);
                setShowForm(false)

            },
            didClose: () => {
                navigate('/auth/password/forgot')
                setShowForm(true)
                setErrored(false)
                dispatch(clearMessage())
            }
        }).then(result => {
            dispatch(clearMessage())

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
                navigate('/auth/login')
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
    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        setSuccessful(false)
        setErrored(false)
        const formData = {};
        formData['resetPasswordLink'] = token;

        for (let formElementIdentifier in values.passwordResetForm) {
            formData[formElementIdentifier] = values.passwordResetForm[formElementIdentifier].value;
        }

        dispatch(resetPassword(formData))
            .unwrap()
            .then(() => {
                setSuccessful(true);
                setErrored(false)

            })
            .catch(() => {
                setSuccessful(false);
                setErrored(true)

            });


    }


    function handleChange(event, inputIdentifier) {

        const updatedFormElement = updateObject(values.passwordResetForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, values.passwordResetForm[inputIdentifier], values.passwordResetForm.password.value),
            touched: true
        });


        const updatedLoginForm = updateObject(values.passwordResetForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;

        for (let inputIdentifier in updatedLoginForm) {
            formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
        }


        setValues({passwordResetForm: updatedLoginForm, formIsValid: formIsValid});

    }


    const formElementsArray = [];

    for (let key in values.passwordResetForm) {
        formElementsArray.push({
            id: key,
            config: values.passwordResetForm[key]
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
                                    </> : 'Change'}
                                </MDBBtn>
                            </div>
                            <div className="col-12 mt-5">
                                <p className="small mb-0 text-muted">
                                    For further support, you may visit the Help Center or contact our customer service
                                    team.
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
                        <Link to="/auth/login">
                            <MDBBtn className='btn btn-secondary  w-100'>
                                Back to login
                            </MDBBtn>
                        </Link>
                    </div>

                </>}

            </form>


        );
    };
    if (isLoggedIn) {
        // return <Navigate replace to="/user/history"/>
    } else {

        return (
            <>
                {showForm && <>
                    <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Password change form</h5>
                        <p className="text-center ">Choose a new password and confirm it below</p>
                    </div>
                    {signupForm()}
                </>}
            </>
        );
    }

}
export default withSwal(PasswordResetForm);