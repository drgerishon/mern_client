import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './Redirect.css'

const LoadingToRedirect = ({error}) => {
    const [count, setCount] = useState(3)
    let navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(seconds => --seconds);
        }, 1000);

        if (count === 0) {
            navigate('/auth/login')
        }

        return () => clearInterval(interval);
    }, [count, navigate]);


    return (
        <section className='section redirect min-vh-100 d-flex flex-column align-items-center justify-content-center '>
            <h1 className='text-danger'>{error ? error : 'Uh-oh, seems like you are lost!!'}</h1>
            <h2>Redirecting you in {count} seconds</h2>
            <img src="/error/stop.png" className="img-fluid py-5" alt="Access denied"/>
        </section>
    );
};

export default LoadingToRedirect;