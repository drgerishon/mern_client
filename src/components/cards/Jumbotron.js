import React from 'react';
import Typewriter from 'typewriter-effect';

const Jumbotron = ({text}) => {
    return (
        <div className="p-5 text-primary text-center h1 fw-bold" style={{background: '#f3f5fa'}}>
            <Typewriter
                options={{
                    strings: text,
                    autoStart: true,
                    loop: true,
                }}
            />
        </div>
    );
};

export default Jumbotron;