import React, {useState} from 'react';
import Header from "../components/nav/Header";
import Footer from "../components/footer/Footer";
import Aside from "../components/nav/aside/Aside";
import useToggle from "../hooks/useToggle";
import classes from './Layout.module.css'
import {Outlet} from "react-router-dom";

const Layout = () => {
    const [open, toggleClosed] = useToggle();
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
            <Aside open={open} scrolled={scrolled} handleScroll={handleScroll} />
            <main className={attachedClasses.join(' ')}>
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
};

export default Layout;