import React from 'react';
import {MDBCheckbox, MDBInput, MDBTextArea, MDBValidationItem} from "mdb-react-ui-kit";
import classes from './Input.module.css'
import {useSelector} from "react-redux";


const Input = ({
                   elementType,
                   elementConfig,
                   message,
                   id,
                   feedback,
                   value,
                   className,
                   changed,
                   invalid,
                   shouldValidate,
                   touched
               }) => {
    let inputElement = null;


    switch (elementType) {
        case ('input'):
            inputElement = <MDBInput
                className={`mb-3 `}
                required
                id={id}
                {...elementConfig}

                value={value}
                onChange={changed}/>;
            break;
        case ('checkbox'):
            inputElement =
                <MDBCheckbox
                    id={id}
                    className='mb-3'
                    {...elementConfig}

                    value={value}
                    onChange={changed}/>;


            break;
        case ('textarea'):
            inputElement = <MDBTextArea
                id={id}
                className='mb-3'
                {...elementConfig}

                value={value}
                onChange={changed}/>;
            break;
        case ('select'):
            inputElement = (
                <select
                    className='mb-3'
                    value={value}
                    id={id}
                    onChange={changed}>
                    {elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <MDBInput
                className='mb-3'
                id={id}

                {...elementConfig}
                value={value}
                onChange={changed}/>;
    }
    let msg = []


    if (invalid && touched && shouldValidate) {
        if (message) {
            msg = message
        }

    }



    return (

        <div className={className}>
            {inputElement}


            {msg && msg.length > 0 ? <>
                <div className='text-danger small mt-3'>{`${msg}`}</div>

            </> : ''}
            {feedback && <div className='text-danger small mt-3'>{feedback}</div>}

        </div>


    );
};

export default Input;

