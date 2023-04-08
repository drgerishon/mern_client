import React, {useState} from 'react';
import Header from "../components/nav/Header";
import Footer from "../components/footer/Footer";
import Aside from "../components/nav/aside/Aside";
import useToggle from "../hooks/useToggle";
import classes from './Layout.module.css'
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import useIdle from "../hooks/useIdleTimer";
import {logout} from "../redux/slices/auth";
import {useDispatch, useSelector} from "react-redux";
import IdlerTimer from "./IdleTimer";


const Layout = () => {
    const {isIdle} = useIdle({idleTime: 0.5});
    const [open, toggleClosed] = useToggle();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const [scrolled, setScrolled] = useState(false);
    let attachedClasses = [classes.Main];
    if (open) {
        attachedClasses = [classes.Main, classes.Close];
    }

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 1) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    }

    return (
        <>
            <Header clicked={toggleClosed} scrolled={scrolled} handleScroll={handleScroll}/>
            <Aside open={open} scrolled={scrolled} handleScroll={handleScroll}/>
            <main className={attachedClasses.join(' ')}>
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
};

export default Layout;