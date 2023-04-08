import React, {useEffect, useCallback, useState} from 'react';
import Top from './top/Top';
import './header.css';
import {Link, useNavigate} from 'react-router-dom';
import {Icon} from '@iconify/react';
import Dropdown from './dropdown';
import {useDispatch, useSelector} from 'react-redux';
import Search from '../../ui/forms/Search';
import {accountMenuItems as originalAccountMenuItems} from './dropdown/Account/Account';
import {logout} from '../../redux/slices/auth';
import NavItem from './NavItem/NavItem';
import {helpMenuItems} from "./dropdown/Help/Help";
import Banner from "./top/banner/Banner";

const Header = ({clicked, scrolled, handleScroll}) => {
    const {user: currentUser} = useSelector((state) => state.auth);
    const {cart} = useSelector((state) => ({...state}));
    const [searchToggle, setSearchToggle] = useState(false);

    let navbarClasses = ['header  '];
    if (scrolled) {
        navbarClasses.push('fixed-top');
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logOut = useCallback(() => {
        dispatch(logout());
        navigate('/');
    }, [dispatch, navigate]);

    const accountMenuItems = originalAccountMenuItems.map((item) => {
        if (item.action === 'LOGOUT_PLACEHOLDER') {
            return {...item, action: logOut};
        }
        return item;
    });

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    function searchBarToggle() {
        setSearchToggle((prevState) => !prevState);
    }

    const navItems = [
        {
            iconName: 'bi:search',
            isSearchBarToggle: true,
            onClick: searchBarToggle,
        },
        {to: '/market', iconName: 'fluent-mdl2:shop', label: 'Market'},
        {
            to: '/cart',
            iconName: 'fluent:cart-16-regular',
            label: 'Cart',
            hasBadge: true,
            cartLength: cart.length,
        },

    ];

    return (
        <>
            {/*<Top/>*/}
            <header className={navbarClasses.join(' ')}>
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                        <Link to="/" className="logo d-flex align-items-center">
                            <img src="assets/img/logo.png" alt=""/>
                            <span className="d-none d-lg-block">MyFarm</span>
                        </Link>
                        <Icon
                            icon="bi:list"
                            className="toggle-sidebar-btn"
                            fontSize={20}
                            onClick={clicked}
                        />
                    </div>
                    <div className={`search-bar ${searchToggle && 'search-bar-show'}`}>
                        <Search/>
                    </div>

                    <nav className="header-nav ms-auto">
                        <ul className="d-flex align-items-center">
                            {navItems.map((item, index) => (
                                <NavItem key={index} {...item} />
                            ))}
                            <Dropdown
                                menuItems={helpMenuItems}
                                icon="bx:help-circle"
                                title="Help"
                                logOut={logOut}
                            />
                            <Dropdown
                                menuItems={accountMenuItems}
                                icon="codicon:account"
                                title="Account"
                                logOut={logOut}
                            />
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
