import React from 'react';
import './top.css'
import {Icon} from '@iconify/react';
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Top = () => {
    const {user} = useSelector((state) => state.auth);
    const navigate = useNavigate()


    function toSeller() {
        if (user && user.token) {
            navigate('/user/product')
        } else {
            navigate('/auth/login', {state: {from: `/user/product`}});
        }

    }

    return (
        <section className="d-flex align-items-center topbar">
            <div className="container-fluid d-flex justify-content-center justify-content-md-between">
                <div className="contact-info d-flex align-items-center ">
                    <span className=" d-flex align-items-center" onClick={toSeller}>
                        <Icon icon="ic:round-sell" fontSize={16}/>
                       Seller center
                    </span>
                    <span className='mx-2'>|</span>
                    <span className="d-flex align-items-center ">
                        <Icon icon="ic:file-download" fontSize={16}/>
                        <Link to='/' className='text-white pointer'>Download App</Link>
                    </span>

                </div>
                <div className="contact-info d-none d-md-flex align-items-center">
                    <span>Track order</span>
                    <span>Help Center</span>
                </div>
            </div>
        </section>
    )
        ;
};

export default Top;