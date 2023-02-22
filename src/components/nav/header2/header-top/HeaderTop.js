import React from 'react';
import {Icon} from '@iconify/react';
import './HeaderTop.css'

const HeaderTop = () => {
    return (
        <div className="header-top">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <ul className="flat-support">
                            <li>
                                <a href="#" title="">Support</a>
                            </li>
                            <li>
                                <a href="#" title="">Store Locator</a>
                            </li>
                            <li>
                                <a href="#" title="">Track Your Order</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <ul className="flat-infomation">
                            <li className="phone">
                                Call Us: <a href="#" title="">(+91) 90129 83208</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <ul className="flat-unstyled">
                            <li className="account">
                                <a href="#" title="jjjj">
                                    My Account<Icon icon="fa6-solid:angle-down" className='Icon'/></a>
                                <ul className="unstyled">
                                    <li>
                                        <a href="#" title="">Login</a>
                                    </li>
                                    <li>
                                        <a href="#" title="">Wishlist</a>
                                    </li>
                                    <li>
                                        <a href="#" title="">My Cart</a>
                                    </li>
                                    <li>
                                        <a href="#" title="">My Account</a>
                                    </li>
                                    <li>
                                        <a href="#" title="">Checkout</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" title="">USD<Icon icon="fa6-solid:angle-down" className='Icon'/></a>
                                <ul className="unstyled">
                                    <li>
                                        <a href="#" title="">Euro</a>
                                    </li>
                                    <li>
                                        <a href="#" title="">Dolar</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" title="">English<Icon icon="fa6-solid:angle-down" className='Icon'/></a>
                                <ul className="unstyled">
                                    <li>
                                        <a href="#" title="">Turkish</a>
                                    </li>
                                    <li>
                                        <a href="#" title="">English</a>
                                    </li>
                                    <li>
                                        <a href="#" title="">اللغة العربية</a>
                                    </li>
                                    <li>
                                        <a href="#" title="">Español</a>
                                    </li>
                                    <li>
                                        <a href="#" title="">Italiano</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderTop;