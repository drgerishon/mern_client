import React, {useCallback} from 'react';
import {Icon} from "@iconify/react";
import './dropdown.css'
import useToggle from "../../../hooks/useToggle";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../redux/slices/auth";
import {Link, useNavigate} from "react-router-dom";

const Dropdown = () => {
    const [open, toggleClosed] = useToggle();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const logOut = useCallback(() => {
        dispatch(logout());
        navigate('/')

    }, [dispatch, navigate]);


    const {user: currentUser} = useSelector((state) => state.auth);



    return (
        <li className="nav-item dropdown pe-3" onClick={toggleClosed}>
            <div className="nav-link nav-profile d-flex align-items-center pe-0">
                <Icon icon="material-symbols:settings-account-box-outline" fontSize={20}/>
                <span className="d-none d-md-block dropdown-toggle ps-2">Hi,{' '}{currentUser.firstName}</span>
            </div>

            <ul className={`dropdown-menu dropdown-menu-end dropdown-menu-arrow profile ${open ? 'dropdown-active' : ''}`}
            >

                <li>
                    {currentUser && currentUser.role === 'subscriber' &&
                    <Link className="dropdown-item d-flex align-items-center"
                          to="/user/history">
                        <Icon icon="material-symbols:manage-accounts-outline-rounded" className='icon'/>
                        <span>My Account</span>
                    </Link>
                    }
                    {currentUser && currentUser.role === 'admin' &&
                    <Link className="dropdown-item d-flex align-items-center"
                          to="/admin/dashboard">
                        <Icon icon="fluent-mdl2:account-management" className='icon'/>
                        <span>My Account</span>
                    </Link>
                    }


                </li>
                <li>
                    <hr className="dropdown-divider"/>
                </li>

                <li>
                    <Link className="dropdown-item d-flex align-items-center"
                          to="/orders">
                        <Icon icon="icon-park-outline:buy" className='icon'/>
                        <span>Orders</span>
                    </Link>
                </li>

                <li>
                    <hr className="dropdown-divider"/>
                </li>

                <li>
                    <Link className="dropdown-item d-flex align-items-center" to="/inbox">
                        <Icon icon="material-symbols:forward-to-inbox-outline" className='icon'/>
                        <span>Inbox</span>
                    </Link>
                </li>
                <li>
                    <hr className="dropdown-divider"/>
                </li>
                <li>
                    <Link className="dropdown-item d-flex align-items-center" to="/wishlist">
                        <Icon icon="mdi:cards-heart-outline" className='icon'/>
                        <span>Saved items</span>
                    </Link>
                </li>
                <li>
                    <hr className="dropdown-divider"/>
                </li>
                <li>
                    <div className="dropdown-item d-flex align-items-center" onClick={logOut}>
                        <Icon icon="material-symbols:logout" className='icon'/>
                        <span>Sign out</span>
                    </div>
                </li>

            </ul>
        </li>


    );
};

export default Dropdown;