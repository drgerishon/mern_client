import React from 'react';
import './top.css'
import {Icon} from '@iconify/react';
import {Link} from "react-router-dom";

const Top = () => {
    return (
        <section className="d-flex align-items-center topbar">
            <div className="container-fluid d-flex justify-content-center justify-content-md-between">
                <div className="contact-info d-flex align-items-center ">
                    <span className=" d-flex align-items-center">
                        <Icon icon="ic:round-sell" fontSize={16}/>
                        <Link to='/' className='text-white pointer'>Seller center</Link>
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