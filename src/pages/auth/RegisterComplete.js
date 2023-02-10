import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams, Navigate, Link} from "react-router-dom";
import {jwtDecode} from "../../common/Decode";
import message, {clearMessage} from "../../redux/slices/message";
import {signup} from "../../redux/slices/auth";
import {MDBBtn, MDBSpinner} from "mdb-react-ui-kit";

const RegisterComplete = () => {

    const [values, setValues] = useState({
        name: '',
        token: '',
        error: '',
        loading: false,
        message: '',
        success: false,
        showButton: true
    });
    const {name, token, error, loading} = values
    const dispatch = useDispatch();

    const params = useParams();

    useEffect(() => {
        let token = params.slug
        if (token) {
            const {name} = jwtDecode(token)
            setValues(state => ({...state, name, token}));
        }
        dispatch(clearMessage());
    }, [params.slug, dispatch])


    let navigate = useNavigate();


    const {message, auth} = useSelector((state) => ({...state}));
    const {isLoggedIn} = auth


    function handleSubmit(e) {

        e.preventDefault()
        setValues({...values, loading: true, error: ''})
        dispatch(signup({token}))
            .unwrap()
            .then(() => {
                navigate("/auth/login");
            })
            .catch(() => {
                setValues({...values, loading: false})
            });


    }


    const completeForm = () => {
        return <form onSubmit={handleSubmit} className='row g-3'>
            <div className="mb-3">
            </div>


            {
                !message.message && <div className='col-12'>
                    <MDBBtn
                        type='submit'
                        className='btn btn-primary  w-100'
                        disabled={loading}>
                        {loading ? <>
                            <MDBSpinner size='sm' role='status' tag='span' className='me-2'/>
                            Loading...
                        </> : 'Activate your account'}
                    </MDBBtn>
                </div>
            }

            {message.message && <>
                <div className='col-12  '>
                    <p className=' py-2 text-danger'>{message.message}</p>
                </div>

                <div className='col-12'>
                    <Link to="/auth/register">
                        <MDBBtn className='btn btn-secondary  w-100'>
                            Back to Registration
                        </MDBBtn>
                    </Link>
                </div>
            </>

            }

        </form>
    };
    if (isLoggedIn) {
        return <Navigate replace to="/user/history"/>
    } else {

        return (
            <>
                <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4"> Register Complete</h5>
                    <p className="text-center ">
                        Hello {name},Click on the link below to activate your account
                    </p>
                </div>

                {completeForm()}
            </>
        );
    }
}

export default RegisterComplete;