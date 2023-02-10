import React from 'react';
import {MDBCheckbox, MDBInput, MDBTextArea} from "mdb-react-ui-kit";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


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
                    checked={value === true}
                    value={value}
                    onChange={changed}/>;
            break;
        case ('date'):
            inputElement =
                <DatePicker
                    id={id}
                    dropDownMode="select"
                    className='mb-3 form-control'
                    {...elementConfig}
                    selected={value}
                    onChange={changed}/>
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
                    className='mb-3 form-control'
                    value={value}
                    id={id}
                    onChange={changed}>
                    {elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.display}
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

