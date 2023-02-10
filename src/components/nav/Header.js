import React, {useEffect, useCallback, useState} from 'react';
import Top from "./top/Top";
import './header.css'
import {Link} from "react-router-dom";
import {Icon} from '@iconify/react';
import Dropdown from "./dropdown/Dropdown";
import {} from "../../redux/slices/auth";
import {useDispatch, useSelector} from "react-redux";
import Search from "../../ui/forms/Search";


const Header = ({clicked, scrolled, handleScroll}) => {
    const {user: currentUser} = useSelector((state) => state.auth);
    const {cart} = useSelector((state) => ({...state}));
    const [searchToggle, setSearchToggle] = useState(false)

    let navbarClasses = [`header d-flex align-items-center `];
    if (scrolled) {
        navbarClasses.push('fixed-top')
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll])

    function searchBarToggle() {
        setSearchToggle((prevState => (!prevState)))
    }

    return (
        <>
            <Top/>
            <header className={navbarClasses.join(' ')}>
                <div className="d-flex align-items-center justify-content-between">
                    <Link to="/" className="logo d-flex align-items-center">
                        {/*<img src="assets/img/logo.png" alt=""/>*/}
                        <span className="d-none d-lg-block">MyFarm</span>
                    </Link>
                    <Icon icon="bi:list" className=" toggle-sidebar-btn" fontSize={20} onClick={clicked}/>
                </div>


                <div className={`search-bar ${searchToggle && 'search-bar-show'}`}>
                    <Search/>
                </div>

                <nav className="header-nav ">
                    <ul className="d-flex align-items-center">


                        <li className="nav-item">
                            <Link to='/' className="nav-link nav-icon" data-bs-toggle="dropdown">
                                <div className="d-flex align-items-center pe-0">
                                    <div className='ps-2 d-flex align-items-center'>
                                        <Icon icon="ant-design:appstore-outlined" fontSize={20}/>
                                    </div>
                                    <div className='label ps-2'>
                                        Home
                                    </div>

                                </div>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to='/market' className="nav-link nav-icon" data-bs-toggle="dropdown">
                                <div className="d-flex align-items-center pe-0">
                                    <div className='ps-2 d-flex align-items-center'>
                                        <Icon icon="healthicons:market-stall" fontSize={20}/>
                                    </div>
                                    <div className='label ps-2'>
                                        Market
                                    </div>

                                </div>
                            </Link>
                        </li>


                        <li className="nav-item">
                            <Link to='/cart' className="nav-link nav-icon" data-bs-toggle="dropdown">
                                <div className="d-flex align-items-centerS ">
                                    <div className=' badge-class d-flex align-items-center'>
                                        <Icon icon="material-symbols:shopping-cart-outline-sharp" fontSize={20}/>
                                        <span className="badge bg-primary badge-number">{cart.length}</span>
                                    </div>
                                    <div className='label ps-2'>
                                        Cart
                                    </div>
                                </div>
                            </Link>
                        </li>


                    </ul>
                </nav>
                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">
                        <li className="nav-item d-block d-lg-none">
                            <div className="nav-link nav-icon" onClick={searchBarToggle}>
                                <Icon icon="bi:search" />
                            </div>
                        </li>

                        <li className="nav-item">
                            <Link to='/help' className="nav-link nav-icon" data-bs-toggle="dropdown">
                                <div className="d-flex align-items-center pe-0">
                                    <div className='ps-2 d-flex align-items-center'>
                                        <Icon icon="bx:help-circle" fontSize={20}/>
                                    </div>
                                    <div className='label ps-2'>
                                        Help
                                    </div>

                                </div>
                            </Link>
                        </li>

                        {!currentUser ? <>
                            <li className="nav-item">
                                <Link to='/auth/login' className="nav-link nav-icon" data-bs-toggle="dropdown">
                                    <div className="d-flex align-items-center pe-0">
                                        <div className='ps-2 d-flex align-items-center'>
                                            <Icon icon="ant-design:appstore-outlined" fontSize={20}/>
                                        </div>
                                        <div className='label ps-2'>
                                            Login
                                        </div>

                                    </div>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to='/auth/register' className="nav-link nav-icon" data-bs-toggle="dropdown">
                                    <div className="d-flex align-items-center pe-0">
                                        <div className='ps-2 d-flex align-items-center'>
                                            <Icon icon="ant-design:appstore-outlined" fontSize={20}/>
                                        </div>
                                        <div className='label ps-2'>
                                            Register
                                        </div>

                                    </div>
                                </Link>
                            </li>


                        </> : <Dropdown/>}


                    </ul>
                </nav>


            </header>


        </>
    );
};

export default Header;