import React from 'react';
import Header from "../components/nav/Header";
import Footer from "../components/footer/Footer";
import classes from './Layout.module.css'
import { Outlet } from "react-router-dom";

const ErrorLayout = ({children}) => {


    return (
        <>
            <Header/>
            <main className={classes.Close}>
              <Outlet/>
            </main>
            <Footer/>
        </>
    );
};

export default ErrorLayout;