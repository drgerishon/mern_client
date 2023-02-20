import React, {useEffect, useState} from 'react';
import {clearMessage} from "../../redux/slices/message";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, Navigate, useNavigate} from "react-router-dom";
import Input from "../../ui/input/Input";
import {MDBBtn, MDBSpinner} from "mdb-react-ui-kit";
import {checkValidity, updateObject} from "../../common/Utility";
import {login} from "../../redux/slices/auth";
import {withSwal} from "react-sweetalert2";

const Login = ({swal}) => {


    const initialValues = {
        loginForm: {
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
                }, validationMessage: [],
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
                },
                validationMessage: [],
                valid: false,
                touched: false
            },
            remember: {
                elementType: 'checkbox',
                elementConfig: {
                    type: 'checkbox',
                    name: 'remember',
                    label: 'Remember me'
                },
                value: false,
                validation: {
                    required: false
                },
                validationMessage: [],
                valid: true,
                touched: true
            },
        },
        formIsValid: false
    }

    const [values, setValues] = useState(initialValues);

    const [loading, setLoading] = useState(false);
    const {message} = useSelector((state) => state.message);
    const {isLoggedIn, user} = useSelector((state) => state.auth);
    const location = useLocation();
    const [success, setSuccess] = useState(false)
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


    const roleBasedRedirect = (res) => {


        swal.fire({
            text: 'Operation completed successfully',
            icon: 'success',
            didOpen: () => {
                setSuccess(true)
            },
            // didClose() {
            //     window.location.reload();
            // }

        }).then(result => {
            let intended = location.state
            if (intended) {
                navigate(intended.from);
            } else {
                if (res.user.role === 'admin') {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/user/history");
                }
            }

            dispatch(clearMessage())
        }).catch(error => {
            dispatch(clearMessage())


        });


    }
    if (errored && message) {
        swal.fire({
            text: message,
            icon: 'error',
            didOpen: () => {
                setShowForm(false)
            },
            didClose: () => {
                setShowForm(true)
                setErrored(false)
            }
        }).then(result => {
            dispatch(clearMessage())

        }).catch(error => {
            dispatch(clearMessage())
            setSuccess(false)
            setShowForm(false)
            setLoading(false);

        });
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        setSuccess(false)
        setErrored(false)
        const formData = {};
        for (let formElementIdentifier in values.loginForm) {
            formData[formElementIdentifier] = values.loginForm[formElementIdentifier].value;
        }

        dispatch(login(formData))
            .unwrap()
            .then((res) => {

                console.log('KUFU')
                setLoading(false)
                setErrored(false)
                roleBasedRedirect(res.user)

            })
            .catch((e) => {
                console.log(e)

                setErrored(true)
                setSuccess(false)
                setLoading(false)
            });


    }


    function handleChange(event, inputIdentifier) {

        let value = event.target.value
        if (inputIdentifier === 'remember') {
            value = event.target.checked
        }

        const updatedFormElement = updateObject(values.loginForm[inputIdentifier], {
            value,
            valid: checkValidity(value, values.loginForm[inputIdentifier], values.loginForm.password.value),
            touched: true
        });

        const updatedLoginForm = updateObject(values.loginForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;

        for (let inputIdentifier in updatedLoginForm) {
            formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
        }


        setValues({loginForm: updatedLoginForm, formIsValid: formIsValid});

    }


    const formElementsArray = [];

    for (let key in values.loginForm) {
        formElementsArray.push({
            id: key,
            config: values.loginForm[key]
        });
    }


    const signupForm = () => {
        return (

            <form className='row g-3' onSubmit={handleSubmit}>

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
                            disabled={loading || !values.formIsValid}>
                            {loading ? <>
                                <MDBSpinner size='sm' role='status' tag='span' className='me-2'/>
                                Loading...
                            </> : 'Login'}
                        </MDBBtn>
                    </div>
                    <div className="col-12">
                        <p className="small mb-0">Don't have account?
                            <Link to="/auth/register"> {' '} Create an account </Link>
                        </p>
                    </div>
                    <div className="col-12">
                        <p className="small mb-0">Forgot password?
                            <Link to="/auth/password/forgot"> {' '} Reset it here </Link>
                        </p>
                    </div>

                </>

                {
                    message && Array.isArray(message) ? message.map(m => {
                        return <div className="col-12 " key={m.param}>
                            <div
                                className={"text-danger "}
                                role="alert"
                            >
                                {m.msg}
                            </div>
                        </div>
                    }) : <div className="col-12 ">
                        <div
                            className={"text-danger "}
                            role="alert"
                        >
                            {message}
                        </div>
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
                {showForm && <>
                    <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                        <p className="text-center ">Enter your email & password to login</p>
                    </div>
                    {signupForm()}
                </>}
            </>
        );
    }

}
export default withSwal(Login);