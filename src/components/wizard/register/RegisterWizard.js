import React from 'react';
import Input from "../../../ui/input/Input";

const RegisterWizard = ({page, feedback, config, handleChange, id}) => {

    function displayPage() {
        if (page === 0) {
            return  <Input
            id='email'
            feedback={feedback}
            className='col-12 '
            elementType={config.elementType}
            elementConfig={config.elementConfig}
            value={config.value}
            message={config.validationMessage}
            invalid={!config.valid}
            shouldValidate={config.validation}
            touched={config.touched}
            changed={(event) => handleChange(event, id)}/>
        }
    }


    return (
        <>
            {displayPage()}
        </>
    );
};

export default RegisterWizard;