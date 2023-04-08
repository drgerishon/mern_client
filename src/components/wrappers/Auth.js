// Auth.js
import React from 'react';

const Auth = ({ children }) => {
  return (
    <>
      <section className="section min-vh-100 flex-column align-items-center justify-content-center pt-0 pb-3">
        {children}
      </section>
    </>
  );
};

export default Auth;
