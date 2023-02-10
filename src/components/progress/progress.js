import React, {useState} from 'react';
import './progress.css'
import {Icon} from '@iconify/react';

const Progress = ({page}) => {

    let buttons = [
        {btn: '1', active: false},
        {btn: '2', active: false},
        {btn: '3', active: false},
        {btn: '4', active: false},
    ]

    let myArr = []
    if (page === 0) {
        myArr.push('1');
    }
    if (page === 1) {
        myArr.push('1', '2');

    }
    if (page === 2) {
        myArr.push('1', '2', '3');

    }
    if (page === 3) {
        myArr.push('1', '2', '3', '4');

    }




    return (

        <>
            <div className="form-wizard-header ">
                <ul className="list-unstyled form-wizard-steps clearfix">
                    {buttons.map(b => (
                        <li
                            className={myArr.includes(b.btn) ? 'active' : ''}
                            key={b.btn}>
                            <span>{b.btn}</span>
                        </li>
                    ))}
                </ul>
            </div>



            <div className="progress ">
                <div
                    className="progress-bar progress-bar-striped progress-bar-animated m-0"
                    role="progressbar"
                    style={{width: page === 0 ? "25%" : page === 1 ? "50%" : page === 2 ? "75%" : "100%"}}
                    aria-valuemin="0" aria-valuemax="100"/>
            </div>
        </>
    );
};

export default Progress;