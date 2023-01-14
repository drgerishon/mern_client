import React from 'react';

const Auth = ({children}) => {
    return (
        <>
            {/*<div className="pageTitle">*/}
            {/*    <h1>Dashboard</h1>*/}
            {/*    <nav>*/}
            {/*        <ol className="breadcrumb">*/}
            {/*            <li className="breadcrumb-item"><a href="index.html">Home</a></li>*/}
            {/*            <li className="breadcrumb-item active">Dashboard</li>*/}
            {/*        </ol>*/}
            {/*    </nav>*/}
            {/*</div>*/}
            <section className="section min-vh-100 flex-column align-items-center justify-content-center pt-0 pb-3  ">
                {children}
            </section>
        </>
    );
};

export default Auth;