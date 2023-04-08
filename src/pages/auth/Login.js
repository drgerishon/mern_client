import React, {useEffect, useState} from 'react';
import {clearMessage} from "../../redux/slices/message";
import {useDispatch, useSelector} from "react-redux";
import {Link, useLocation, Navigate, useNavigate} from "react-router-dom";
import {MDBBtn, MDBSpinner} from "mdb-react-ui-kit";
import {login} from "../../redux/slices/auth";
import {withSwal} from "react-sweetalert2";
import {loginFormInitialValues} from "../../common/initialValues/loginForm";
import useForm from "../../hooks/useForm";
import Form from "../../components/Form";

const Login = ({swal}) => {
    const [loading, setLoading] = useState(false);
    const {isLoggedIn, user} = useSelector((state) => state.auth);
    const location = useLocation();
    const [success, setSuccess] = useState(false)
    const [errored, setErrored] = useState(false)
    const [showForm, setShowForm] = useState(true)

    const [formIsValid, setFormIsValid] = useState(false);
    const [form, setForm] = useState(loginFormInitialValues.loginForm);
    const handleChange = useForm(setForm, setFormIsValid);

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
            if (user && user.token && user.role && user.role.code) {
                if (user.role.code === 1000) {
                    navigate('/admin/dashboard');
                } else if (user.role.code === 2000) {
                    navigate('/user/dashboard');
                } else if (user.role.code === 3000) {
                    navigate('/farmer/dashboard');
                } else if (user.role.code === 4000) {
                    navigate('/carrier/dashboard');
                } else if (user.role.code === 5000) {
                    navigate('/institute/dashboard');
                } else {
                    navigate('/market');
                }
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

        }).then(result => {
            let intended = location.state
            if (intended) {
                navigate(intended.from);
            } else {
                if (user.role.code === 1000) {
                    navigate('/admin/dashboard');
                } else if (user.role.code === 2000) {
                    navigate('/user/dashboard');
                } else if (user.role.code === 3000) {
                    navigate('/farmer/dashboard');
                } else if (user.role.code === 4000) {
                    navigate('/carrier/dashboard');
                } else if (user.role.code === 5000) {
                    navigate('/institute/dashboard');
                } else {
                    navigate('/market');
                }
            }

            dispatch(clearMessage())
        }).catch(error => {
            dispatch(clearMessage())
        });
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            setSuccess(false);
            setErrored(false);
            const formData = {};
            for (let formElementIdentifier in form) {
                formData[formElementIdentifier] = form[formElementIdentifier].value;

            }

            const res = await dispatch(login(formData)).unwrap();
            if (res.error) {
                await swal.fire({
                    text: res.error,
                    icon: "error",
                });
                setLoading(false);
                setShowForm(true);
            } else {
                setErrored(false);
                roleBasedRedirect(res.user);
            }
        } catch (error) {
            console.error(error);
            setErrored(true);
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };


    const signupForm = () => {
        return (

            <form className='row g-3' onSubmit={handleSubmit}>
                <Form
                    form={form}
                    handleChange={handleChange}
                >
                    <div className='col-12'>
                        <MDBBtn
                            type='submit'
                            className='btn btn-primary  w-100'
                            disabled={loading || !formIsValid}>
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

                </Form>

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