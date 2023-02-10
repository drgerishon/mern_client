import React, {useState} from 'react';
import Header from "../components/nav/Header";
import Footer from "../components/footer/Footer";
import useToggle from "../hooks/useToggle";
import classes from "./GeneralPageLayout.module.css";
import {Outlet} from "react-router-dom";
import Aside from "../components/nav/aside/Aside";
import General from "../components/wrappers/General";

const GeneralPageLayout = () => {
    const [open, toggleClosed] = useToggle();
    const [scrolled, setScrolled] = useState(false);
    let attachedClasses = [classes.Main, classes.Close];
    if (open) {
        attachedClasses = [classes.Main];
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
            <Aside open={open} scrolled={scrolled} handleScroll={handleScroll} general={true}/>
            <main className={attachedClasses.join(' ')}>
                <section>
                    <Outlet context={{open}}/>
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default GeneralPageLayout;